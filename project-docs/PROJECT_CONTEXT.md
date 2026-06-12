# PROJECT_CONTEXT.md — VibeCoders

## Product Vision
"The fastest path from building alone to building with an audience."

VibeCoders is a lightweight community platform for builders who ship fast, learn in public, and iterate through feedback. Think Product Hunt stripped to first principles — no media assets, no investor signaling, no noise.

## Core Requirements
- Email + Google OAuth authentication
- Project submission (title, URL, description — 3 fields only)
- Project feed (reverse chronological, paginated)
- Like/Dislike reactions with optimistic UI
- Comments (flat, text-only)
- Leaderboard (top 50 by net score)
- User profile pages
- Mobile-first responsive design
- Dark mode support

## User Goals
1. **Discovery** — Surface interesting projects from unknown builders
2. **Feedback** — Give and receive honest, signal-rich reactions fast
3. **Reputation** — Build a track record through consistent shipping
4. **Community** — Create belonging for people who build with AI tools

## Business Goals
- Zero infrastructure cost at launch (Supabase + Vercel free tier)
- 100+ signups in launch week
- 50+ projects submitted in launch week
- Day-2 retention > 30%

## Non-Goals (Explicitly Out of Scope)
- Paid features or subscriptions
- DMs or private messaging
- Project media uploads (images/videos)
- Teams or organizations
- Project categories or tags at launch
- Email notifications
- API for third-party integrations
- Monetization
- Follower/following social graph

## Target Audience
Builders aged 16–35 who use AI tools (Claude, Cursor, Replit, v0, Lovable, Bolt) to build software. Not necessarily professional developers. Ship frequently. Motivated by community recognition.

## Core Loop
Build something → Post it → Get reactions → Improve → Repeat
