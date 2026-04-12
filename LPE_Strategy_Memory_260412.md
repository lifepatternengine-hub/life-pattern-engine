# LPE Strategy — Memory File
**Last updated: April 12, 2026**

---

## Context

Zdnk, 18 years automotive interior design, based Aschaffenburg relocating to UAE.
Quit job, ~3 month runway at time of writing.
Building Life Pattern Engine as primary independent product.
Full project knowledge file: Memo260412.md

---

## What We Were Doing

Exploring how to use Claude Managed Agents to grow Life Pattern Engine —
specifically for distribution, demand discovery, and audience building.

Inspired by: OpenClaw / Robby experiment (transcript reviewed) — key learning:
agent found the product by observing demand signals. Don't pick the product,
let the market signal it.

---

## Current State of LPE

- Automated pipeline: nearly 100% done — no agent needed here
- ~50-100 responses collected, 56% "too accurate" feedback
- €0 cost to date
- LinkedIn: a few posts, 1,407 impressions on best post
- Instagram: 6 weeks of daily content ready, not yet posting
- Reddit: strategy written, not yet executed
- Deep Report: designed, not yet automated (€39 price point)
- Payment layer (Lemon Squeezy): not yet integrated

**Primary bottleneck: volume. Need 500-1000 responses for real signal.**

---

## Agent Strategy Decided

### Agent 1 — Reddit Demand Finder
**Job:** Search Reddit daily for threads matching LPE archetypes.
**Subreddits:** r/midlife, r/findapath, r/careerguidance, r/career, r/antiwork, r/30s, r/40s
**Output:** Thread list with archetype match + suggested reply angle
**Who posts:** Zdnk manually — agent finds and drafts, human posts
**Why not fully automated:** Reddit bans automation fast. Human reply texture matters.

**Prompt location:** See section below.

### Agent 2 — Future: Distribution Engine
LinkedIn post angles from archetype data. Not built yet.

---

## Reddit Agent Prompt

```
You are a research agent for Life Pattern Engine,
a diagnostic tool that identifies 15 mid-career
patterns in people aged 35-55.

Search Reddit for posts from the last 7 days in these
subreddits: r/midlife, r/findapath, r/careerguidance,
r/career, r/antiwork, r/30s, r/40s

Find posts where people are describing these situations:
- Burned out after years of high performance
- Successful but feels empty or meaningless
- Suppressed creative drive resurfacing
- Left corporate, lost identity
- Stuck, not advancing, no clear next step
- Knows what they want but won't act
- Relocated, rebuilding from zero

For each post return:
- Subreddit
- Post title
- Core pain in one sentence
- Which archetype it maps to (BOA, SBM, LCA, CE, CP, RE, VR, RO, GD)
- Suggested reply angle — human, not promotional
- Engagement level (comments count)
```

---

## Reddit Reply Templates by Archetype

**BOA — Burned-out Achiever**
> "This is really common after sustained high output — the identity was built around performance so when the fuel runs out there's nothing underneath it. Not laziness, not weakness. The engine just has nothing left to burn. What does a normal week actually look like for you right now?"

**SBM — Stable But Meaningless**
> "The absence of a real problem is its own problem. Nothing wrong, nothing right — that's actually harder to navigate than a crisis because there's no clear enemy. How long has it felt like this?"

**LCA — Late Creative Awakening**
> "Creative suppression over a long career leaves a residue. It doesn't go away, it just gets louder with age. What was the thing you set aside and when did you set it aside?"

**CE — Corporate Exit**
> "When the institution was the identity, leaving it creates a vacuum that's genuinely disorienting. The job title was doing more psychological work than most people realize until it's gone. How long ago did you leave?"

**CP — Career Plateau**
> "Competence without progression is its own trap — you're too good to quit, not positioned to advance. The structure is the problem, not you. Is it the company or the field that's the ceiling?"

**RE — Reluctant Entrepreneur**
> "The conditions will never be perfect. That's not pessimism, that's just the data from everyone who's done it. What's the actual minimum condition you'd need to move?"

**VR — Values Rupture**
> "External success and internal conflict running simultaneously is exhausting in a specific way — you can't explain it to people who don't have it. When did the gap between what you're doing and what you believe start to widen?"

**RO — Responsibility Overload**
> "Career plus kids plus aging parents is a compression that removes all discretionary bandwidth. There's nothing left for the self because the self is last in the queue. Which one of those is heaviest right now?"

**GD — Geographic Displacement**
> "Relocation resets everything — network, routine, identity anchors. People underestimate how much of the self was tied to place and context. How long have you been there and what's the hardest part so far?"

---

## Reddit Rules

- Post as Zdnk — personal account, not brand account
- Never drop the link first
- One reply per thread
- If they engage: "I've actually been mapping these patterns — built something around it. Happy to share if useful."
- Log every reply

---

## Reddit Log Template

| Date | Subreddit | Thread title | Archetype | Reply sent | Response Y/N |
|------|-----------|--------------|-----------|------------|--------------|
| | | | | | |

**Track archetype column** — after 4 weeks you'll know which archetypes are most vocal online.
That tells you which Deep Report to automate first.

---

## Notion Structure Proposed

```
/LPE Distribution Engine
  /Reddit
    - Agent prompt
    - Reply templates by archetype
    - Subreddit list + rules
    - Log: date / thread / archetype / reply sent / response Y/N

  /LinkedIn
    - Post bank
    - What worked (impressions + engagement log)
    - Angles that convert vs angles that just get likes

  /Instagram
    - 6-week content calendar
    - Figma pipeline notes

  /Agents
    - Active prompts
    - What each agent does
    - Output log
```

---

## Key Decisions Made

- Pipeline automation: done, no agent needed
- Reddit: manual posting, agent for finding + drafting only
- Instagram: run in parallel, not the lead channel
- LinkedIn: increase frequency, post archetype observations not promotion
- Reddit account: personal (Zdnk), not brand account
- Primary goal right now: volume — 500-1000 responses

---

## Open Questions / Next Steps

- [ ] Set up Reddit account and run agent prompt for first batch
- [ ] Build Notion distribution engine page
- [ ] Decide: automate Deep Report or sell manually first to test conversion
- [ ] Instagram — start posting the 6 weeks of content
- [ ] LinkedIn — increase to 2x per week minimum

---

## What We Have Not Decided Yet

- Whether to build a paid community (needs 100+ members first)
- Enterprise licensing angle (Year 2)
- Whether agents play a role in Instagram content push
- The €500 → €20k experiment framing — still open, LPE could be the vehicle
