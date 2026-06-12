# PRD.md — VibeCoders Product Requirements Document

**Version:** 1.0  
**Status:** Ready for Development  
**Last Updated:** June 2026  
**Owner:** Product Team  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Problem Statement](#problem-statement)
4. [Product Goals](#product-goals)
5. [Non-Goals](#non-goals)
6. [Target Audience](#target-audience)
7. [User Personas](#user-personas)
8. [User Pain Points](#user-pain-points)
9. [User Stories](#user-stories)
10. [Functional Requirements](#functional-requirements)
11. [Non-Functional Requirements](#non-functional-requirements)
12. [MVP Scope](#mvp-scope)
13. [Future Scope](#future-scope)
14. [Acceptance Criteria](#acceptance-criteria)
15. [Success Metrics](#success-metrics)
16. [KPIs](#kpis)
17. [Risks](#risks)
18. [Assumptions](#assumptions)
19. [Launch Readiness Checklist](#launch-readiness-checklist)

---

## Executive Summary

VibeCoders is a lightweight community platform purpose-built for the generation of builders who ship fast, learn in public, and iterate through feedback. It gives solo founders, indie hackers, AI builders, students, and vibe coders a single place to post projects, receive honest reactions, and build a reputation through what they ship — not what they claim.

The platform deliberately avoids feature bloat. It does one thing extremely well: surface interesting work, let the community react to it, and reward consistent builders with a transparent reputation system. Think Product Hunt stripped to first principles — no media assets, no investor signaling, no noise.

VibeCoders runs entirely on the free tier of Supabase and Vercel. Zero infrastructure cost at launch. The architecture is designed to grow without re-engineering.

**Core loop:** Build something → Post it → Get reactions → Improve → Repeat.

---

## Product Vision

> **"The fastest path from building alone to building with an audience."**

VibeCoders exists to collapse the distance between making something and getting real feedback from people who understand what you're building. The platform is not for polished products seeking press — it's for works-in-progress seeking community.

The long-term vision is to become the default home page for the global community of AI-era builders: the place you check every morning to see what's been shipped overnight, whose reputation is rising, and what ideas are worth stealing.

### Vision Pillars

| Pillar | Description |
|--------|-------------|
| **Discovery** | Surface interesting projects from people you've never heard of |
| **Feedback** | Give and receive honest, signal-rich reactions fast |
| **Reputation** | Build a track record through consistent shipping |
| **Community** | Create belonging for people who build with AI tools |

---

## Problem Statement

### The Core Problem

Indie builders, AI coders, students, and solo founders share a universal frustration: they ship projects into a void. GitHub repos get no stars. Twitter posts get no engagement. Discord links disappear. Product Hunt is too slow, too formal, and too focused on polished launches.

There is no lightweight, permanent home for the work-in-progress builder who ships constantly and wants ongoing feedback rather than a one-day launch event.

### Secondary Problems

- **Discovery is broken** — Great projects from unknown builders never find an audience because there's no curated feed of the indie builder community
- **Feedback is low-signal** — "Nice!" comments add no value; there's no fast mechanism for genuine reactions
- **Reputation is invisible** — Someone who ships 20 projects in a year has no proof of that consistency anywhere
- **Community is fragmented** — Builders live in Discord, Twitter, GitHub, Notion, Reddit — there's no single identity layer for this community

### The Opportunity

The AI coding movement has created a massive new cohort of builders who ship 5x faster than before. They need infrastructure for their community that matches the pace they ship at.

---

## Product Goals

### Primary Goals (MVP)

| # | Goal | Measurement |
|---|------|-------------|
| G1 | Enable builders to post projects in under 2 minutes | Median submission time < 2 min |
| G2 | Create a high-signal discovery feed of community projects | DAU returns to browse feed daily |
| G3 | Enable fast, honest reactions through likes/dislikes | Reaction rate > 30% of project views |
| G4 | Provide transparent reputation through leaderboard | Leaderboard drives profile visits |
| G5 | Launch with zero infrastructure cost | $0/month on Supabase + Vercel free tier |

### Secondary Goals (Post-MVP)

- Build a platform that retains builders month over month
- Create network effects where more users = better discovery for everyone
- Establish VibeCoders as the default reputation layer for the indie builder community

---

## Non-Goals

These are explicitly out of scope to prevent scope creep and maintain the product's intentional simplicity.

| Non-Goal | Reason |
|----------|--------|
| **Paid features or subscriptions** | Complexity without validation |
| **DMs or private messaging** | Not a social network |
| **Upvote-based launch events** | That's Product Hunt; not our model |
| **Project media uploads (images/videos)** | Supabase storage budget + unnecessary friction |
| **Teams or organizations** | Individual reputation model only |
| **Project categories or tags at launch** | Simple first; filter later |
| **Email notifications** | Phase 2 |
| **API for third-party integrations** | Phase 2 |
| **Monetization** | Never before PMF |
| **Project versioning or updates** | One submission, edit in place |
| **Follower/following social graph** | Phase 2 |

---

## Target Audience

### Primary Audience

Builders aged 16–35 who use AI tools (Claude, ChatGPT, Cursor, Replit, v0, Lovable, Bolt) to build software faster than traditional developers. They are:

- Not necessarily professional developers
- Ship frequently (multiple projects per month)
- Active on Twitter/X, Discord, Reddit r/SideProject
- Motivated by community recognition more than money
- Prefer minimal, fast tools over feature-rich platforms

### Secondary Audience

- CS students building portfolio projects
- Traditional indie hackers looking for a new home
- Experienced developers exploring AI-assisted coding
- Founders validating ideas before building

### Audience Size Estimate

The AI vibe coding community is growing rapidly. Conservative estimates put the addressable community at 500K+ active builders globally in 2025–2026, with the core demographic concentrated on Twitter/X, YouTube, and Discord.

---

## User Personas

### Persona 1 — "The Daily Shipper" (Primary)

**Name:** Alex, 22  
**Occupation:** CS student / freelance developer  
**Location:** Remote / Tier-2 city  
**Tools:** Cursor, Claude, Replit  
**Builds:** 3–5 projects per month  

**Goals:**
- Get feedback on projects before adding them to portfolio
- Build a public track record of shipping
- Discover what other builders are making

**Frustrations:**
- Posts to Twitter but gets no engagement from fellow builders
- Product Hunt is too formal and time-consuming
- No persistent record of all the things they've shipped

**Behavior:**
- Checks community sites daily for 5–10 minutes
- Prefers text over video; quick scan-reading
- Leaves short, honest comments when something impresses them

---

### Persona 2 — "The Indie Hacker" (Primary)

**Name:** Priya, 29  
**Occupation:** Product Manager by day, builder by night  
**Location:** Remote  
**Tools:** ChatGPT, v0, Vercel  
**Builds:** 1–2 projects per month  

**Goals:**
- Validate ideas early with real community reaction
- Build reputation as a solo founder
- Find collaborators or early users for her projects

**Frustrations:**
- No community specifically understands AI-built products
- Feedback on existing platforms is shallow or nonexistent
- Hard to stand out without a big following

**Behavior:**
- Visits 3–5 times per week
- Carefully reads project descriptions and comments
- Uses leaderboard to identify influential builders to follow

---

### Persona 3 — "The Lurker-Learner" (Secondary)

**Name:** Marcus, 17  
**Occupation:** High school student learning to code  
**Location:** Suburban US  
**Tools:** Replit, ChatGPT  
**Builds:** 1 project per month (mostly learning projects)  

**Goals:**
- See what other builders are shipping for inspiration
- Post his first real project and get honest reactions
- Understand what "good" projects look like

**Frustrations:**
- Feels intimidated by experienced developers
- Doesn't know where to share learning projects
- Social pressure on Twitter/Instagram prevents sharing imperfect work

**Behavior:**
- Browses daily without logging in initially
- Creates account when he's ready to post
- Responds positively to community encouragement

---

### Persona 4 — "The AI Power Builder" (Primary)

**Name:** Jamie, 31  
**Occupation:** Startup founder, ex-FAANG engineer  
**Location:** San Francisco / Remote  
**Tools:** Claude, Cursor, custom MCP setups  
**Builds:** 5–10 micro-products per month to test ideas  

**Goals:**
- Public record of shipping velocity
- Community reactions as lightweight market research
- Network with other serious builders

**Frustrations:**
- No platform captures the cadence of rapid AI-assisted building
- GitHub alone doesn't communicate what a project does to non-devs
- Product Hunt launch preparation takes too long

**Behavior:**
- Heavy commenter; gives detailed feedback
- Uses leaderboard to benchmark himself
- Submits projects immediately upon shipping

---

## User Pain Points

| Pain Point | Persona | Severity | How VibeCoders Addresses It |
|------------|---------|----------|----------------------------|
| No community for AI builders specifically | All | Critical | Purpose-built positioning and community |
| Too much friction to share a project | Alex, Jamie | High | 3-field submission (title, link, description) |
| Feedback is generic or absent | Priya, Jamie | High | Like/dislike + comments creates honest signal |
| No persistent reputation for shipping | All | High | Leaderboard + profile page |
| Discovery of interesting projects is hard | Marcus, Priya | Medium | Real-time feed + trending |
| Platform feels too "official" for WIPs | Alex, Marcus | Medium | Tone, design, and positioning signals this is for WIPs |
| Submissions expire or get buried | Alex, Priya | Medium | Projects are permanent; leaderboard surfaces the best |

---

## User Stories

### Authentication

| ID | Story | Priority |
|----|-------|----------|
| US-01 | As a visitor, I can browse all projects without signing in | P0 |
| US-02 | As a visitor, I can sign up with email and password | P0 |
| US-03 | As a visitor, I can sign in with Google OAuth | P0 |
| US-04 | As a user, I can sign out from any page | P0 |
| US-05 | As a user, I can view my own profile page | P1 |
| US-06 | As a user, I can edit my display name and bio | P1 |

### Project Submission

| ID | Story | Priority |
|----|-------|----------|
| US-07 | As a signed-in user, I can submit a project with a title, URL, and description | P0 |
| US-08 | As a user, I see immediate confirmation that my project was submitted | P0 |
| US-09 | As a user, I can edit my own project after submission | P1 |
| US-10 | As a user, I can delete my own project | P1 |
| US-11 | As a user, I cannot submit the same URL twice | P1 |

### Discovery / Browsing

| ID | Story | Priority |
|----|-------|----------|
| US-12 | As a visitor, I can browse all submitted projects in reverse chronological order | P0 |
| US-13 | As a visitor, I can click a project card to view its full detail page | P0 |
| US-14 | As a visitor, I can see the project's vote count and comment count on the card | P0 |
| US-15 | As a user, I can see who submitted each project | P0 |
| US-16 | As a visitor, I can visit a user's public profile and see their projects | P1 |

### Reactions

| ID | Story | Priority |
|----|-------|----------|
| US-17 | As a signed-in user, I can like a project | P0 |
| US-18 | As a signed-in user, I can dislike a project | P0 |
| US-19 | As a user, I can remove my like or dislike | P0 |
| US-20 | As a user, I cannot like and dislike the same project simultaneously | P0 |
| US-21 | As a user, I cannot react to my own project | P1 |
| US-22 | As a visitor, I can see reaction counts but must sign in to react | P0 |

### Comments

| ID | Story | Priority |
|----|-------|----------|
| US-23 | As a signed-in user, I can add a comment to any project | P0 |
| US-24 | As a user, I can delete my own comment | P1 |
| US-25 | As a user, I can see all comments on a project's detail page | P0 |
| US-26 | As a visitor, I can read comments without signing in | P0 |

### Leaderboard

| ID | Story | Priority |
|----|-------|----------|
| US-27 | As a visitor, I can view the leaderboard of top builders | P0 |
| US-28 | As a visitor, I can see builders ranked by total likes received | P0 |
| US-29 | As a user, I can see my own rank on the leaderboard | P1 |

---

## Functional Requirements

### FR-01: Authentication System

- Email/password registration with email confirmation
- Google OAuth login
- Session persistence across browser refreshes
- Secure sign-out that clears all session data
- Redirect to intended page after login

### FR-02: Project Submission

- Title field: required, 5–100 characters
- Project URL: required, must be valid URL format, max 2048 characters
- Description: required, 20–500 characters
- Submission requires authentication
- Submission timestamp recorded automatically
- Duplicate URL detection per user

### FR-03: Project Feed

- Display all projects in reverse chronological order (newest first)
- Each project card shows: title, description excerpt, submitter username, submission date, like count, dislike count, comment count
- Project link opens in new tab
- Paginate or infinite scroll (20 projects per page)

### FR-04: Project Detail Page

- Full project title, description, URL (external link)
- Submitter name (links to profile)
- Submission timestamp
- Reaction counts (likes, dislikes)
- Reaction buttons (like/dislike) for authenticated users
- Comment section with all comments in chronological order
- Comment input for authenticated users

### FR-05: Reactions

- One reaction per user per project (like OR dislike, not both)
- Toggle: clicking the active reaction removes it
- Real-time count update in UI (optimistic update)
- Reaction requires authentication; unauthenticated users see a prompt
- Users cannot react to their own projects

### FR-06: Comments

- Text only, 1–500 characters
- Posted comments display immediately (optimistic update)
- Each comment shows author username and relative timestamp
- Comment author can delete their own comment
- No threading (flat comment structure at MVP)
- Comment submission requires authentication

### FR-07: Leaderboard

- Rank builders by total net score (likes minus dislikes across all their projects)
- Show top 50 builders
- Each entry shows: rank, username, total score, project count
- Username links to user profile
- Updated in real time (or near real time via Supabase RLS)

### FR-08: User Profile

- Public profile page accessible at `/u/[username]`
- Displays: username, bio (if set), join date, project count, total net score
- Lists all projects submitted by the user
- Authenticated user can edit their own profile (display name, bio)

### FR-09: Navigation

- Top navigation: Logo, Feed, Leaderboard, Submit (CTA), Sign In / User avatar
- Responsive: hamburger menu on mobile
- Active state shown for current page
- Sticky header on scroll

---

## Non-Functional Requirements

### Performance

| Requirement | Target |
|-------------|--------|
| Initial page load (TTI) | < 2 seconds on 4G |
| Feed render (above fold) | < 1 second |
| Reaction update feedback | < 200ms (optimistic UI) |
| Comment post feedback | < 300ms (optimistic UI) |
| Lighthouse Performance score | ≥ 85 |

### Reliability

- 99.5% uptime target (aligned with Supabase free tier SLA)
- Graceful degradation when Supabase is unavailable
- No data loss on network interruption during form submission

### Security

- All API calls authenticated via Supabase JWT tokens
- Row Level Security (RLS) enforced on all Supabase tables
- XSS protection via React's default escaping
- CSRF protection via Supabase's cookie handling
- No sensitive data stored in localStorage (auth handled by Supabase session)
- Input sanitization server-side before writes

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader compatible (semantic HTML + ARIA labels)
- Color contrast ratios ≥ 4.5:1 for normal text
- Focus indicators visible and clearly styled

### SEO

- Project detail pages server-side renderable (or SSG-friendly via Vite)
- Meaningful `<title>` and `<meta description>` on all pages
- Open Graph tags for project pages (for social sharing)
- Clean URL structure: `/projects/[id]`, `/u/[username]`, `/leaderboard`

### Browser Support

- Chrome, Firefox, Safari, Edge (last 2 major versions)
- iOS Safari 15+
- Android Chrome 100+

---

## MVP Scope

The MVP is the smallest version of VibeCoders that delivers value to all four personas and validates the core loop.

### In MVP

| Feature | Status |
|---------|--------|
| Email + Google OAuth auth | ✅ In |
| Project submission (title, URL, description) | ✅ In |
| Project feed (reverse chronological) | ✅ In |
| Project detail page | ✅ In |
| Like / Dislike reactions | ✅ In |
| Comments (flat, text only) | ✅ In |
| Leaderboard (top 50 by net score) | ✅ In |
| User profile page (public) | ✅ In |
| Edit / delete own projects | ✅ In |
| Responsive mobile design | ✅ In |

### Explicitly Not in MVP

| Feature | Reason |
|---------|--------|
| Email notifications | Requires email provider setup |
| Project search | Phase 2 |
| Project categories/tags | Phase 2 |
| Follow/followers | Phase 2 |
| Profile image upload | Storage quota management |
| Comment replies (threading) | Phase 2 |
| Trending algorithm | Phase 2; default is recency |
| Report/flag content | Phase 2 |
| Admin dashboard | Phase 2 |

---

## Future Scope

### Phase 2 (1–3 Months Post-Launch)

- **Search** — Full-text search on project titles and descriptions
- **Tags / Categories** — User-defined tags (max 3 per project)
- **Email Notifications** — "Your project got a reaction" via Resend (free tier)
- **Trending Feed** — Algorithm combining recency + reaction velocity
- **Comment Replies** — One level of threading
- **Profile Images** — Avatar upload via Supabase Storage

### Phase 3 (3–6 Months Post-Launch)

- **Follow System** — Follow builders; see their projects in a "Following" feed
- **Collections** — Save projects to private collections
- **Weekly Digest** — Email roundup of top projects
- **Project Updates** — Builder can post update posts linked to a project

### Phase 4 (6–12 Months)

- **Maker Streaks** — Gamification: submit at least one project per week
- **Showcase Mode** — Featured projects curated by the community
- **API** — Public API for third-party integrations
- **Embeds** — Embed project card on external websites

---

## Acceptance Criteria

### Auth

- **AC-01:** A visitor who provides valid credentials is redirected to the feed after login
- **AC-02:** A visitor who provides invalid credentials sees a specific error message (not a generic one)
- **AC-03:** A signed-in user who clicks "Sign Out" is redirected to the home page and cannot access authenticated routes

### Project Submission

- **AC-04:** A form submission with all valid fields creates a project and displays it at the top of the feed within 5 seconds
- **AC-05:** A form submission with a missing required field shows an inline error for that specific field
- **AC-06:** A form submission with an invalid URL (no https, no TLD) is rejected with a descriptive error

### Reactions

- **AC-07:** A user who clicks "Like" on a project sees the like count increment immediately (optimistic update) and the like button changes to an active state
- **AC-08:** A user who clicks "Like" on an already-liked project sees the like count decrement and the button returns to inactive
- **AC-09:** A user who clicks "Dislike" after having liked a project sees the like count decrement and the dislike count increment
- **AC-10:** A user cannot see reaction buttons on their own projects (buttons hidden or disabled with tooltip)

### Comments

- **AC-11:** A submitted comment appears in the comment thread immediately after posting
- **AC-12:** A user can delete their own comment; it disappears immediately from the UI
- **AC-13:** A visitor who tries to comment sees a prompt to sign in

### Leaderboard

- **AC-14:** The leaderboard page loads and displays at least the top 10 users with their scores
- **AC-15:** After submitting a project that receives a reaction, the builder's score updates on the leaderboard within 60 seconds

---

## Success Metrics

### Launch Week (Days 1–7)

| Metric | Target |
|--------|--------|
| Total signups | 100+ |
| Projects submitted | 50+ |
| Total reactions given | 200+ |
| Comments posted | 50+ |
| Day-2 retention | > 30% of Day-1 users return |

### Month 1

| Metric | Target |
|--------|--------|
| Total registered users | 500+ |
| Total projects | 250+ |
| Weekly Active Users (WAU) | 150+ |
| Average projects per active user | 1.5+ |
| Average reactions per project | 3+ |

### Month 3

| Metric | Target |
|--------|--------|
| Monthly Active Users (MAU) | 1,000+ |
| D7 retention | > 20% |
| D30 retention | > 10% |
| Organic traffic (SEO/referral) | > 40% of new users |
| Projects with 5+ reactions | > 30% |

---

## KPIs

### North Star Metric

**Weekly Active Builders** — The number of unique users who either submit a project, react to a project, or comment in a given week. This single metric captures both content creation and community engagement.

### Supporting KPIs

| KPI | Definition | Target (Month 3) |
|-----|-----------|-----------------|
| Submission Rate | % of registered users who submit ≥1 project | > 40% |
| Reaction Rate | Reactions per project view | > 25% |
| Comment Rate | Comments per project view | > 5% |
| Return Rate | % of users who return within 7 days | > 20% |
| Leaderboard Engagement | % of sessions that include leaderboard visit | > 15% |
| Feed Scroll Depth | % of sessions that scroll past 5 projects | > 60% |

---

## Risks

### Product Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Cold start — no content at launch | High | High | Seed with 20–30 hand-curated projects from founders before public launch |
| Low quality submissions spam | Medium | High | Community dislike signal; manual moderation in early days |
| Toxic comments poison community | Medium | High | User-level comment deletion; prepare ban tooling for Phase 2 |
| Positioning unclear to newcomers | Medium | Medium | Landing page and onboarding copy explicitly state the community norms |
| Low engagement — lurker-heavy | Medium | Medium | Friction-free reactions (one click) encourages passive users to participate |

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Supabase free tier row limits hit | Low (early) | High | Monitor usage weekly; free tier is generous for early stage |
| Supabase free tier paused after inactivity | Low | High | Ensure at least weekly pings; document upgrade path |
| Vercel cold starts on serverless functions | Low | Low | Minimal serverless usage; mostly client-side with Supabase direct |
| Auth token expiry causing bad UX | Medium | Medium | Implement silent token refresh; handle 401s gracefully |

### External Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Competitive product launches simultaneously | Medium | Medium | Speed to market; community-first positioning is defensible |
| AI coding trend cools | Low | High | Platform is useful for any indie builder, not only AI coders |

---

## Assumptions

| # | Assumption | Validation Method |
|---|-----------|------------------|
| A-01 | Target users are willing to sign up for yet another platform | Landing page conversion test |
| A-02 | Builders want public dislike reactions (not just likes) | Post-launch survey; monitor dislike usage rate |
| A-03 | Leaderboard motivates submission behavior | Cohort analysis: leaderboard visitors vs. submission rate |
| A-04 | Free-tier infrastructure is sufficient for months 1–3 | Monitor Supabase usage dashboard weekly |
| A-05 | Project URL + description is sufficient metadata for MVP | User interviews post-launch |
| A-06 | Community will self-moderate via reactions | Monitor comment quality; adjust moderation plan if needed |
| A-07 | Google OAuth covers the majority of target users' preferred login | Track OAuth vs. email signup split |

---

## Launch Readiness Checklist

### Product

- [ ] All P0 user stories implemented and tested
- [ ] All acceptance criteria pass
- [ ] 20+ seed projects submitted before soft launch
- [ ] Community guidelines page live (even if minimal)
- [ ] 404 and error pages designed and implemented

### Technical

- [ ] Supabase project set to non-pausing (or production plan when budget allows)
- [ ] Row Level Security enabled and tested on all tables
- [ ] All environment variables documented in `.env.example`
- [ ] Vercel deployment configured with production domain
- [ ] Database migrations committed and documented
- [ ] Error boundary components implemented in React
- [ ] Lighthouse score ≥ 85 on all key pages

### Design

- [ ] Dark mode implemented and tested
- [ ] Mobile layout tested on iOS Safari and Android Chrome
- [ ] All empty states designed (no data, no comments, no projects)
- [ ] Loading states implemented for all async operations
- [ ] Form validation errors all have visible, readable messages

### Security

- [ ] RLS policies audited: users can only edit their own data
- [ ] No API keys or secrets in frontend code
- [ ] OAuth callback URL whitelisted in Supabase
- [ ] Input length limits enforced both client-side and database-level

### Legal / Operations

- [ ] Privacy Policy page live
- [ ] Terms of Service page live
- [ ] Founder(s) have a plan for manual moderation in week 1
- [ ] Analytics (Plausible or Umami — privacy-first) configured

### Distribution

- [ ] Product Hunt submission drafted (for Day 1 launch)
- [ ] Twitter/X announcement thread drafted
- [ ] Hacker News "Show HN" post drafted
- [ ] 5+ beta testers have used the product and confirmed it works
