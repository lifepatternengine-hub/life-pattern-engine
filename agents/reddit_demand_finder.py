#!/usr/bin/env python3
"""
LPE Reddit Demand Finder
Searches Reddit for LPE archetype signals and logs to Notion.
"""

import anthropic
import json
import os
import requests
import time
from datetime import date, timedelta

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
NOTION_TOKEN = os.environ["NOTION_TOKEN"]
NOTION_VERSION = "2022-06-28"
REDDIT_LOG_DB = "18c11f99-b5b3-4d23-82f8-69609e5fad12"
MANAGER_NOTES_PAGE = "340a21b2a01b8114b572cd9d198bc6ba"
TODAY = date.today().isoformat()
WEEKLY_THRESHOLD = 10  # Skip run if this many threads already logged this week

SYSTEM_PROMPT = """You are the Reddit Demand Finder agent for Life Pattern Engine — a diagnostic tool identifying 15 mid-career patterns in people aged 35-55.

Search Reddit for posts from the last 7 days across: r/midlife, r/findapath, r/careerguidance, r/career, r/antiwork, r/30s, r/40s

Target signals — posts describing:
- Burned out after years of high performance
- Successful but feels empty or meaningless
- Suppressed creative drive resurfacing
- Left corporate, lost identity
- Stuck, not advancing, no clear next step
- Relocated, rebuilding from zero
- Achieved the goal and feels nothing
- Too specialized, no way forward
- Ambition deferred, now resurfacing

The 15 archetypes: BOA, SBM, LCA, CE, CP, RE, VR, RO, GD, DA, SC, PSV, LRP, PCT, ISG

Find 5-10 posts. For each post, reply angle written as Zdnk — personal, human, no product mention, ends with open question.

IMPORTANT: Return your findings as a JSON array at the end of your response, formatted exactly like this:
```json
[
  {
    "title": "Thread title here",
    "subreddit": "r/midlife",
    "url": "https://reddit.com/...",
    "engagement": 42,
    "archetype": "BOA",
    "core_pain": "One sentence describing their pain",
    "reply": "2-3 sentence draft reply as Zdnk ending with open question"
  }
]
```"""


def get_manager_notes():
    """Read Manager Notes from Notion."""
    try:
        r = requests.get(
            f"https://api.notion.com/v1/blocks/{MANAGER_NOTES_PAGE}/children",
            headers={"Authorization": f"Bearer {NOTION_TOKEN}", "Notion-Version": NOTION_VERSION}
        )
        if r.status_code == 200:
            blocks = r.json().get("results", [])
            text = []
            for block in blocks:
                bt = block.get("type")
                if bt in ["paragraph", "bulleted_list_item", "numbered_list_item", "heading_2", "heading_3"]:
                    rich_text = block.get(bt, {}).get("rich_text", [])
                    for rt in rich_text:
                        text.append(rt.get("plain_text", ""))
            return "\n".join(text)
    except Exception as e:
        print(f"Warning: Could not read Manager Notes: {e}")
    return ""


def count_weekly_threads():
    """Count threads already logged since Monday of this week."""
    monday = (date.today() - timedelta(days=date.today().weekday())).isoformat()
    try:
        r = requests.post(
            f"https://api.notion.com/v1/databases/{REDDIT_LOG_DB}/query",
            headers={
                "Authorization": f"Bearer {NOTION_TOKEN}",
                "Notion-Version": NOTION_VERSION,
                "Content-Type": "application/json"
            },
            json={
                "filter": {
                    "timestamp": "created_time",
                    "created_time": {"on_or_after": monday}
                },
                "page_size": 100
            }
        )
        if r.status_code == 200:
            return len(r.json().get("results", []))
    except Exception as e:
        print(f"Warning: Could not count weekly threads: {e}")
    return 0


def search_reddit(manager_notes):
    """Use Claude with web search to find Reddit threads."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    user_message = "Search Reddit now for LPE archetype signals."
    if manager_notes:
        user_message += f"\n\nManager Notes for this run:\n{manager_notes}"

    for attempt in range(3):
        try:
            response = client.beta.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=4096,
                system=SYSTEM_PROMPT,
                tools=[{
                    "type": "web_search_20250305",
                    "name": "web_search",
                    "max_uses": 6
                }],
                messages=[{"role": "user", "content": user_message}],
                betas=["web-search-2025-03-05"]
            )
            break
        except anthropic.RateLimitError:
            if attempt < 2:
                print(f"Rate limit hit, waiting 60s (attempt {attempt + 1}/3)...")
                time.sleep(60)
            else:
                raise

    # Extract text content from response
    full_text = ""
    for block in response.content:
        if hasattr(block, "text"):
            full_text += block.text

    return full_text


def parse_threads(response_text):
    """Extract JSON array from Claude's response."""
    try:
        start = response_text.rfind("```json")
        end = response_text.rfind("```", start + 1)
        if start != -1 and end != -1:
            json_str = response_text[start + 7:end].strip()
            return json.loads(json_str)
    except Exception as e:
        print(f"Warning: Could not parse JSON: {e}")
    return []


def _parse_engagement(value):
    if not value:
        return 0
    import re
    m = re.search(r'\d+', str(value))
    return int(m.group()) if m else 0


def log_to_notion(thread):
    """Create a page in the Reddit Log database."""
    payload = {
        "parent": {"database_id": REDDIT_LOG_DB},
        "properties": {
            "Thread Title": {"title": [{"text": {"content": thread.get("title", "")[:200]}}]},
            "Subreddit": {"select": {"name": thread.get("subreddit", "r/midlife")}},
            "Archetype": {"select": {"name": thread.get("archetype", "")}},
            "Core Pain": {"rich_text": [{"text": {"content": thread.get("core_pain", "")[:2000]}}]},
            "URL": {"url": thread.get("url", "")},
            "Engagement": {"number": _parse_engagement(thread.get("engagement"))},
            "Reply Sent": {"checkbox": False},
            "Response": {"select": {"name": "No reply yet"}},
            "Date": {"date": {"start": TODAY}},
            "Agent Run Date": {"date": {"start": TODAY}}
        }
    }

    r = requests.post(
        "https://api.notion.com/v1/pages",
        headers={
            "Authorization": f"Bearer {NOTION_TOKEN}",
            "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json"
        },
        json=payload
    )

    if r.status_code == 200:
        print(f"  ✓ Logged: {thread.get('title', '')[:60]}")
    else:
        print(f"  ✗ Failed ({r.status_code}): {r.text[:200]}")


def main():
    print("=== LPE Reddit Demand Finder ===")
    print(f"Date: {TODAY}\n")

    print("Checking weekly thread count...")
    weekly_count = count_weekly_threads()
    print(f"Threads logged this week: {weekly_count}/{WEEKLY_THRESHOLD}")
    if weekly_count >= WEEKLY_THRESHOLD:
        print(f"Already at threshold — skipping search. Next run tomorrow will check again.")
        return

    print("\nReading Manager Notes...")
    manager_notes = get_manager_notes()
    if manager_notes:
        print(f"Manager Notes loaded ({len(manager_notes)} chars)")
    else:
        print("No Manager Notes found — running with defaults")

    print("\nSearching Reddit...")
    response_text = search_reddit(manager_notes)
    print(f"Claude response received ({len(response_text)} chars)")

    print("\nParsing threads...")
    threads = parse_threads(response_text)
    print(f"Found {len(threads)} threads")
    if not threads:
        print("No JSON found in response — full output:")
        print(response_text)

    if threads:
        print("\nLogging to Notion Reddit Log...")
        for thread in threads:
            log_to_notion(thread)

    print(f"\n=== Done — {len(threads)} threads logged ===")
    print("\nFull agent output:")
    print(response_text)


if __name__ == "__main__":
    main()
