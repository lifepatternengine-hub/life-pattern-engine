# LPE Agents Memory — Last Known Good State

## Reddit Demand Finder

**Model:** claude-haiku-4-5-20251001
**Schedule:** Daily
**Trigger:** Manual or GitHub Actions cron

**Notion IDs:**
- Manager Notes: `340a21b2a01b8114b572cd9d198bc6ba`
- Reddit Log data source: `collection://1882e8c8-4ffb-4257-8399-0bba64e9d6b2`

**Flow:** Step 0 weekly cap check → Step 1 Manager Notes → Step 2 three batched searches (pick 2 posts per batch immediately, discard rest) → Step 3 classify + draft reply → Step 4 log to Notion → Step 5 archetype table + briefing

**Search batches:**
- A: r/midlife + r/findapath — burned out identity meaningless career
- B: r/careerguidance + r/career — stuck unfulfilled plateau 35 40 45
- C: r/antiwork + r/30s + r/40s — quit corporate lost who am I

**Notion logging properties:** Thread Title, Subreddit, Archetype, Core Pain, userDefined:URL, Engagement, Reply Sent (`__NO__`), Response (`No reply yet`), date:Date:start, date:Agent Run Date:start

**Last run:** 2026-04-13 — Notion MCP tools working, Reddit search working, hit rate limit before Step 4 (nothing logged)

---

## LinkedIn Post Agent

**Model:** claude-sonnet-4-6
**Schedule:** Monday + Thursday
**Trigger:** Manual or scheduled

**Notion IDs:**
- Manager Notes: `340a21b2a01b8114b572cd9d198bc6ba`
- Reddit Log data source: `collection://1882e8c8-4ffb-4257-8399-0bba64e9d6b2`
- LinkedIn Post Bank data source: `collection://d37774f7-0550-4420-bec5-23366da5ed7e`
- LinkedIn Post Bank database: `30074f518fa54e4aa1ac82e412379393`

**Flow:** Step 0 check today's draft exists → Step 1 Manager Notes → Step 2 Reddit signal (top archetypes last 7 days) → Step 3 pick archetype + angle → Step 4 draft post → Step 5 log to Notion → Step 6 output summary

**Post rules:** 150–250 words, no bullets, no CTA, no archetype code, no LPE mention, Zdnk voice (18 years automotive, direct, dry, observational, short paragraphs)

**Angles:** pattern observation / personal moment / reframe / contrast

**Notion logging properties:** Hook (title), Draft, Archetype, Status (`Draft`), date:Agent Run Date:start

**Last run:** 2026-04-14 — full pipeline completed, BOA post logged to Notion (id: `342a21b2a01b8111ad32ee76e1668d7e`)

---

## Shared Infrastructure

**MCP:** Notion connector via claude.ai/settings/connectors — works with `mcp_servers: []` in YAML
**Sandbox:** api.notion.com blocked — only MCP tools work, no curl/requests
**Manager Notes priority order:** BOA → SBM → CE → SC
