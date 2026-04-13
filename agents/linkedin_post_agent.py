#!/usr/bin/env python3"""
LPE LinkedIn Post Agent
Reads Reddit archetype signal from Notion, generates 2 post drafts, logs to Post Bank.
"""

import anthropic
import json
import os
import requests
from datetime import date
from collections import Counter

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
NOTION_TOKEN = os.environ["NOTION_TOKEN"]
NOTION_VERSION = "2022-06-28"
REDDIT_LOG_DB = "18c11f99-b5b3-4d23-82f8-69609e5fad12"
LINKEDIN_POST_BANK_DB = "30074f51-8fa5-4e4a-a1ac-82e412379393"
MANAGER_NOTES_PAGE = "340a21b2a01b8114b572cd9d198bc6ba"
TODAY = date.today().isoformat()

SYSTEM_PROMPT = """You are the LinkedIn Post Agent for Life Pattern Engine.
You write LinkedIn posts in the voice of Zdenek Borysek — founder, 18 years automotive interior design, based in Mainz relocating to UAE, building LPE independently.

Write 2 LinkedIn post drafts based on the archetype signal data provided.

Zdenek's voice:
- First person: "I noticed", "I kept seeing", "18 years taught me"
- Specific: automotive design, Mainz, UAE relocation, building independently
- Pattern-naming: describes the experience before labelling it
- Human, not coach — lived experience, not advice
- Never promotional — no LPE mention, no website, no assessment
- Short paragraphs (1-2 sentences max)
- Ends with a question that makes people recognise themselves
- 150-250 words each

Post structure:
Line 1 — Hook: one sentence that stops the scroll
Lines 2-6 — Body: 3-5 short paragraphs, personal observation
Final line — Question: invites recognition

IMPORTANT: Return your drafts as a JSON array at the end:
```json
[
  {
    "hook": "First line of the post",
    "draft": "Full post text here...",
    "archetype": "BOA"
  },
  {
    "hook": "First line of second post",
    "draft": "Full post text here...",
    "archetype": "SBM"
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


def get_archetype_signal():
    """Query Reddit Log for archetype frequency."""
    try:
        r = requests.post(
            f"https://api.notion.com/v1/databases/{REDDIT_LOG_DB}/query",
            headers={
                "Authorization": f"Bearer {NOTION_TOKEN}",
                "Notion-Version": NOTION_VERSION,
                "Content-Type": "application/json"
            },
            json={"page_size": 50}
        )
        if r.status_code == 200:
            results = r.json().get("results", [])
            archetypes = []
            for page in results:
                archetype = page.get("properties", {}).get("Archetype", {}).get("select")
                if archetype:
                    archetypes.append(archetype.get("name", ""))
            counts = Counter(archetypes)
            return counts.most_common(5)
    except Exception as e:
        print(f"Warning: Could not read Reddit Log: {e}")
    return []


def generate_posts(top_archetypes, manager_notes):
    """Use Claude to generate LinkedIn post drafts."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    archetype_summary = "\n".join([f"- {arch}: {count} threads" for arch, count in top_archetypes])
    top_two = [a[0] for a in top_archetypes[:2]] if top_archetypes else ["BOA", "SBM"]

    user_message = f"""Reddit archetype signal from this week:
{archetype_summary}

Write 2 posts — one for {top_two[0] if len(top_two) > 0 else 'BOA'}, one for {top_two[1] if len(top_two) > 1 else 'SBM'}.

Manager Notes:
{manager_notes if manager_notes else 'No specific instructions this week.'}"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}]
    )

    return response.content[0].text


def parse_posts(response_text):
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


def log_to_notion(post):
    """Create a page in the LinkedIn Post Bank database."""
    payload = {
        "parent": {"database_id": LINKEDIN_POST_BANK_DB},
        "properties": {
            "Hook": {"title": [{"text": {"content": post.get("hook", "")[:200]}}]},
            "Draft": {"rich_text": [{"text": {"content": post.get("draft", "")[:2000]}}]},
            "Archetype": {"select": {"name": post.get("archetype", "")}},
            "Status": {"select": {"name": "Draft"}},
            "date:Agent Run Date:start": {"date": {"start": TODAY}}
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
        print(f"  ✓ Logged: {post.get('hook', '')[:60]}")
    else:
        print(f"  ✗ Failed ({r.status_code}): {r.text[:200]}")


def main():
    print("=== LPE LinkedIn Post Agent ===")
    print(f"Date: {TODAY}\n")

    print("Reading Manager Notes...")
    manager_notes = get_manager_notes()

    print("Reading Reddit archetype signal...")
    top_archetypes = get_archetype_signal()
    if top_archetypes:
        print("Top archetypes this week:")
        for arch, count in top_archetypes[:5]:
            print(f"  {arch}: {count}")
    else:
        print("No Reddit signal found — using defaults (BOA, SBM)")

    print("\nGenerating LinkedIn post drafts...")
    response_text = generate_posts(top_archetypes, manager_notes)

    print("\nParsing posts...")
    posts = parse_posts(response_text)
    print(f"Generated {len(posts)} posts")

    if posts:
        print("\nLogging to Notion LinkedIn Post Bank...")
        for post in posts:
            log_to_notion(post)

    print(f"\n=== Done — {len(posts)} posts logged ===")
    print("\nFull agent output:")
    print(response_text)


if __name__ == "__main__":
    main()
