#!/usr/bin/env python3
"""
Trigger the LPE LinkedIn Post Agent via Managed Agents Sessions API.
Called by GitHub Actions on schedule (Mon + Thu) and on workflow_dispatch.
"""

import os
import anthropic
from datetime import date

BETAS = ["managed-agents-2026-04-01"]

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

TODAY = date.today().isoformat()

# Create a new session reusing the persisted agent (never re-creates it)
session = client.beta.sessions.create(
    agent=os.environ["AGENT_ID"],
    environment_id=os.environ["ENVIRONMENT_ID"],
    vault_ids=[os.environ["VAULT_ID"]],
    title=f"LinkedIn post run {TODAY}",
    betas=BETAS,
)
print(f"Session created: {session.id}")

# Send the trigger message
client.beta.sessions.events.send(
    session_id=session.id,
    events=[{
        "type": "user.message",
        "content": [{"type": "text", "text": f"Today is {TODAY}. Run your weekly LinkedIn post draft."}]
    }],
    betas=BETAS,
)

# Stream events until the agent finishes
print("Streaming session events...")
with client.beta.sessions.events.stream(session_id=session.id, betas=BETAS) as stream:
    for event in stream:
        if hasattr(event, "type"):
            if event.type == "agent.message":
                print(f"\n[AGENT]: {getattr(event, 'content', '')}")
            elif event.type == "session.status_idle":
                print("\n✅ Agent finished. Draft logged to Notion.")
                break
            elif event.type == "session.status_terminated":
                print("\n🔴 Session terminated.")
                break
            elif event.type == "session.error":
                print(f"\n❌ Error: {event}")
                raise SystemExit(1)

# Archive session to free resources
client.beta.sessions.archive(session.id, betas=BETAS)
print(f"Session archived: {session.id}")
