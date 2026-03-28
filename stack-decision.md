# Ha's Life OS — Tech Stack Decision

## What You're Building
A personal life OS with: habit gamification, self-knowledge journaling, life lessons vault, and an AI companion.

---

## The Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | **Next.js (React)** | React ecosystem, file routing, API routes built-in, deploys in 1 click |
| Styling | **Tailwind CSS + shadcn/ui** | Fast, beautiful, industry standard |
| Database | **Supabase (PostgreSQL)** | No backend server needed, teaches real SQL, great free tier |
| Auth | **Supabase Auth** | Comes free with Supabase |
| AI companion | **Anthropic Claude API** | Call from Next.js API routes, feed it your life context |
| Python layer | **Local scripts → Railway later** | Pattern analysis, weekly reflection summaries |
| Deployment | **Vercel (frontend) + Supabase (DB)** | Both free to start, one-click deploy |
| Mobile | **PWA first** → Expo later if needed | Don't block yourself on mobile early |

---

## CV-Worthy Skills This Teaches You

- **React / Next.js** — top demand in Vietnam and globally
- **PostgreSQL** — list this, not "Supabase"
- **REST API design** — via Next.js API routes
- **LLM API integration** — emerging, differentiated skill
- **Python scripting** — data processing, automation
- **Cloud deployment** — Vercel, basic DevOps intuition
- **System design basics** — data modeling, auth patterns

---

## Build Sequence (Paced for Motivation)

### Phase 1 — 2–3 weeks: Foundation
**Goal:** Something running that you actually use.
- Set up Next.js + Tailwind + shadcn
- Connect Supabase, design your first tables (habits, journal entries)
- Build a simple daily journal + habit check-in UI
- Deploy to Vercel

*Milestone: Open your phone, log your day.*

---

### Phase 2 — 3–4 weeks: Gamification
**Goal:** Make it feel rewarding.
- XP system, streaks, habit scoring
- Dashboard with your stats and progress
- Life "quests" — goals you set for yourself

*Milestone: Feel the dopamine of leveling up a real habit.*

---

### Phase 3 — 3–4 weeks: Life Lessons Vault
**Goal:** Something that knows you.
- Log experiences + tag them (relationships, work, growth, mistakes)
- Supabase full-text search across your entries
- Start writing Python scripts locally to find patterns in your data

*Milestone: Search your past self and find something surprising.*

---

### Phase 4 — Ongoing: AI Companion
**Goal:** Something that talks back meaningfully.
- Call Claude API from a Next.js API route
- Feed it your recent entries + life context as a system prompt
- Build a chat interface for reflection, consolation, and advice
- Eventually: weekly AI-generated insight report from your data

*Milestone: Have a conversation with your life.*

---

## Learning Resources

| Topic | Resource |
|---|---|
| React/Next.js | [nextjs.org/learn](https://nextjs.org/learn) — official, free, project-based |
| Supabase | [supabase.com/docs](https://supabase.com/docs) — start with "Quickstart: Next.js" |
| Tailwind + shadcn | [ui.shadcn.com](https://ui.shadcn.com) — copy-paste components |
| Claude API | [docs.anthropic.com](https://docs.anthropic.com) — simple to start |
| Python | Continue Coursera — apply it to *your own data* from Phase 3 onward |

---

## The Real Priority Order

1. Ship something small (Phase 1) — before you overthink the stack
2. Use it daily — the app only works if it's about your actual life
3. Learn when you hit a wall — not before

> The framework is just a vehicle. The self-knowledge is the destination.
