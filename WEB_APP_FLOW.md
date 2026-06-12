# WEB_APP_FLOW.md — VibeCoders User Flow Documentation

**Version:** 1.0  
**Status:** Implementation-Ready  
**Last Updated:** June 2026  
**Author:** UX Research & Product Design  

---

## Table of Contents

1. [Navigation Map](#navigation-map)
2. [New User Journey](#new-user-journey)
3. [Authentication Journey](#authentication-journey)
4. [Explore Projects Journey](#explore-projects-journey)
5. [Submit Project Journey](#submit-project-journey)
6. [Like/Dislike Journey](#likedislike-journey)
7. [Comment Journey](#comment-journey)
8. [Leaderboard Journey](#leaderboard-journey)
9. [User Profile Journey](#user-profile-journey)
10. [Returning User Journey](#returning-user-journey)
11. [Mobile User Journey](#mobile-user-journey)
12. [Edge Cases](#edge-cases)

---

## Navigation Map

### Global Site Structure

```
vibecoders.app
│
├── /                          ← Feed (Home) — ENTRY POINT
│   └── ?page=N                ← Pagination parameter
│
├── /projects/:id              ← Project Detail Page
│
├── /submit                    ← Submit Project (auth required)
│
├── /leaderboard               ← Leaderboard
│
├── /u/:username               ← User Profile (public)
│
├── /login                     ← Login
│
├── /signup                    ← Sign Up
│
├── /auth/callback             ← OAuth callback (internal)
│
├── /onboarding                ← Username setup (OAuth new users)
│
├── /404                       ← Not Found
│
├── /privacy                   ← Privacy Policy (static)
│
└── /terms                     ← Terms of Service (static)
```

### Persistent Navigation State Machine

```
UNAUTHENTICATED USER:
Header: [Logo] [Feed] [Leaderboard] ──────────── [Sign In] [Sign Up]

AUTHENTICATED USER:
Header: [Logo] [Feed] [Leaderboard] ──────── [+ Submit] [Avatar ▾]

Avatar Dropdown:
├── View Profile → /u/[username]
├── Settings → /settings (Phase 2)
├── ─────────────────────
└── Sign Out
```

---

## New User Journey

### Overview

The new user arrives with zero context. The journey must deliver value immediately and make the value proposition undeniable before asking for anything.

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ ARRIVAL (from Twitter/X, HN, Product Hunt, direct link)     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ FEED PAGE /                                                 │
│ • Sees: Hero headline + project feed immediately            │
│ • No gate, no modal, no cookie banner (minimal)             │
│ • 20 most recent projects visible                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
     SCROLL & BROWSE              CLICK PROJECT CARD
     (Feed exploration)           (Go to detail page)
              │                         │
              │                    ┌────▼────────────────┐
              │                    │ PROJECT DETAIL /id   │
              │                    │ • Full description   │
              │                    │ • See reactions      │
              │                    │ • Read comments      │
              │                    │ • Click external URL │
              │                    └────┬────────────────┘
              │                         │
              │              ┌──────────┴──────────────┐
              │              │                          │
              │         WANTS TO LIKE           WANTS TO COMMENT
              │              │                          │
              │              ▼                          ▼
              │    ┌──────────────────┐    ┌──────────────────────┐
              │    │ PROMPT: Sign in  │    │ PROMPT: Sign in      │
              │    │ to react         │    │ to comment           │
              │    └────────┬─────────┘    └──────────┬───────────┘
              │             │                          │
              │             └──────────┬───────────────┘
              │                        │
              ▼                        ▼
     ┌────────────────────────────────────────────────┐
     │ DECISION: Sign up or continue browsing?        │
     │                                                │
     │ [Sign Up — it's free]   [Keep Browsing]        │
     └────────────────────────────────────────────────┘
              │                        │
              ▼                        ▼
     [→ Auth Journey]          [Continue browsing]
```

### Key UX Notes

- The feed is the first impression. Project cards must be information-dense enough to create immediate curiosity.
- No interstitial popups or email capture overlays. Ever.
- The "auth prompt" appears inline (within the interaction flow), not as an interruption from outside.
- First visit impression must communicate: *this is for builders like me.*

---

## Authentication Journey

### Sign Up Flow (Email)

```
┌──────────────┐
│ /signup page │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│ SIGNUP FORM                                  │
│                                              │
│  Email:        [________________]            │
│  Password:     [________________]            │
│  (min 8 chars)                               │
│  Username:     [________________]            │
│  (3-30 chars, letters/numbers/_-)            │
│                                              │
│  [Create account]                            │
│                                              │
│  Already have an account? Sign in            │
│  ──────────────────────────────              │
│  [Continue with Google]                      │
└──────────────────────────────────────────────┘
       │
       ├── VALIDATION ERROR
       │   ↓
       │   Show inline error below failed field
       │   Focus cursor to first errored field
       │   [User corrects and resubmits]
       │
       ├── DUPLICATE EMAIL
       │   ↓
       │   "An account with this email already exists. Sign in?"
       │   [Sign in link]
       │
       ├── DUPLICATE USERNAME
       │   ↓
       │   "Username taken. Try something else."
       │
       └── SUCCESS
           ↓
           Supabase sends confirmation email
           ↓
    ┌────────────────────────────────────────┐
    │ "Check your email to confirm."         │
    │ (Inline page state, not a new page)    │
    │                                        │
    │ [Resend confirmation email]            │
    └────────────────────────────────────────┘
           │
           ▼ User clicks email link
    ┌────────────────────────────────────────┐
    │ CONFIRMATION REDIRECT                  │
    │ Supabase confirms → redirects to /     │
    │ Session established                    │
    │ Header now shows authenticated state   │
    └────────────────────────────────────────┘
```

### Sign In Flow (Email)

```
┌──────────────┐
│  /login page │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│ LOGIN FORM                                   │
│                                              │
│  Email:    [________________________]        │
│  Password: [________________________]        │
│                                              │
│  [Sign in]                                   │
│                                              │
│  Forgot password? [Reset]                    │
│  Don't have an account? Sign up              │
│  ──────────────────────────────              │
│  [Continue with Google]                      │
└──────────────────────────────────────────────┘
       │
       ├── WRONG CREDENTIALS
       │   ↓
       │   "Incorrect email or password."
       │   (Generic: don't confirm whether email exists)
       │
       └── SUCCESS
           ↓
           Check: was user trying to do something?
           │
           ├── YES (came from /submit, /projects/:id#comment, etc.)
           │   ↓
           │   Redirect to intended destination
           │   Toast: silent (redirect is the confirmation)
           │
           └── NO (direct /login visit)
               ↓
               Redirect to /
```

### Google OAuth Flow

```
┌─────────────────────────────────────┐
│ Click [Continue with Google]         │
└──────────────────┬──────────────────┘
                   │
                   ▼
        Google OAuth consent screen
                   │
                   ▼
        User authorizes VibeCoders
                   │
                   ▼
        Redirect to /auth/callback?code=...
                   │
                   ▼
        AuthCallback component:
        exchangeCodeForSession(code)
                   │
                   ├── NEW GOOGLE USER (first login)
                   │   ↓
                   │   Trigger: handle_new_user() fires
                   │   Auto-username: "user_[first8ofUUID]"
                   │   ↓
                   │   Redirect to /onboarding
                   │   "Choose a username to complete your profile"
                   │   [Username input] [Save and continue]
                   │   ↓
                   │   On success → redirect to /
                   │
                   └── RETURNING GOOGLE USER
                       ↓
                       Session established
                       Redirect to /
```

### Password Reset Flow

```
/login → "Forgot password?" link
       ↓
┌─────────────────────────────────────┐
│ RESET PASSWORD                      │
│                                     │
│ Email: [_________________________]  │
│                                     │
│ [Send reset link]                   │
└─────────────────────────────────────┘
       ↓
"If an account exists, you'll receive an email."
(Always show this message — don't confirm email existence)
       ↓
User receives Supabase magic reset link
       ↓
Clicks link → /auth/callback?type=recovery
       ↓
Show: "Set new password" form
[New password] [Confirm] [Update password]
       ↓
Success → Redirect to / with session
```

### Auth State Transitions

```
UNAUTHENTICATED
      │
      ├── signInWithEmail(email, password) ──────► AUTHENTICATED
      ├── signInWithOAuth({ provider: 'google' }) ► AUTHENTICATED
      ├── signUp(email, password, username) ───────► UNCONFIRMED
      │                                              (email sent)
      │
UNCONFIRMED
      │
      └── User confirms email ──────────────────── ► AUTHENTICATED
      
AUTHENTICATED
      │
      ├── Token expiry + silent refresh ───────────► AUTHENTICATED (seamless)
      ├── Token refresh fails ────────────────────── ► UNAUTHENTICATED
      │   (redirects to /login)
      └── signOut() ──────────────────────────────── ► UNAUTHENTICATED
```

---

## Explore Projects Journey

### Feed Browsing Flow

```
/ (Feed page)
│
├── INITIAL LOAD
│   ├── Show 5 skeleton cards immediately
│   ├── Fetch first 20 projects (newest first)
│   └── Replace skeletons with real cards
│
├── CARD SCAN PATTERN (Eye tracking flow):
│   Title (bold) → Description (2 lines) → Author + Date → Reactions
│
├── INTERACTIONS ON FEED:
│   │
│   ├── Click project title/card body → /projects/:id
│   │
│   ├── Click ↗ external link icon → Opens project URL in new tab
│   │   (Does NOT navigate away from VibeCoders)
│   │
│   └── Click author username → /u/:username
│
├── PAGINATION (Load More, not infinite scroll):
│   │
│   ├── "Load more projects" button at bottom of 20 cards
│   ├── Click → Append next 20 to feed (not replace)
│   └── When no more projects: "You've seen everything. Submit your own."
│
└── EMPTY FEED STATE:
    "Nothing here yet. Be the first to post a project."
    [Submit your project] → /submit
```

### Project Detail Flow

```
Click project card on feed
        │
        ▼
/projects/:id
        │
        ├── LOADING STATE
        │   Show skeleton for: title, description, reaction bar, comments
        │
        ├── LOADED STATE
        │   ┌─────────────────────────────────────────┐
        │   │ Project Title                  ↗ Open   │
        │   │ By @username · 2 hours ago              │
        │   │                                         │
        │   │ Full description text...                │
        │   │ (no truncation on detail page)          │
        │   │                                         │
        │   │ [👍 Like  24]    [👎  8]               │
        │   │                                         │
        │   │ ─────────────────────────────────────   │
        │   │ 3 comments                              │
        │   │                                         │
        │   │ @jamie: "Really clean implementation!"  │
        │   │ @priya: "What stack did you use for..." │
        │   │                                         │
        │   │ [Add a comment...]                      │
        │   └─────────────────────────────────────────┘
        │
        └── ERROR STATE (project not found / deleted)
            "This project no longer exists."
            [← Back to projects]
```

---

## Submit Project Journey

### Full Submission Flow

```
Entry points to /submit:
├── "Submit" button in header navigation
├── Empty feed CTA
└── Profile page "Submit a project" link
          │
          ▼
AUTHENTICATION CHECK:
          │
          ├── NOT SIGNED IN
          │   ↓
          │   Redirect to /login?redirect=/submit
          │   After login → returns to /submit with form intact
          │
          └── SIGNED IN
              ↓
┌─────────────────────────────────────────────────────────┐
│  SUBMIT PROJECT FORM                                    │
│                                                         │
│  Project name *                                         │
│  [__________________________________]  5/100 chars      │
│                                                         │
│  Project URL *                                          │
│  [__________________________________]                   │
│  e.g. https://yourproject.vercel.app                    │
│                                                         │
│  What does it do? *                                     │
│  [                                  ]                   │
│  [                                  ]  0/500 chars      │
│  [                                  ]                   │
│  Be specific. What problem does it solve?               │
│                                                         │
│  [Submit project]           [Cancel]                    │
└─────────────────────────────────────────────────────────┘
          │
          ├── CLIENT-SIDE VALIDATION (on blur + submit):
          │
          │   Title errors:
          │   ├── Empty → "Project name is required"
          │   ├── < 5 chars → "Must be at least 5 characters"
          │   └── > 100 chars → "Must be 100 characters or less"
          │
          │   URL errors:
          │   ├── Empty → "Project URL is required"
          │   ├── No protocol → "Must start with https:// or http://"
          │   └── Invalid format → "Enter a valid URL"
          │
          │   Description errors:
          │   ├── Empty → "Description is required"
          │   ├── < 20 chars → "Must be at least 20 characters"
          │   └── > 500 chars → "Must be 500 characters or less"
          │
          ├── SUBMIT CLICKED (all valid):
          │   ↓
          │   Button → loading state ("Submitting...")
          │   POST to Supabase projects table
          │
          ├── SERVER ERRORS:
          │   ├── Duplicate URL (same user) → "You've already submitted this project"
          │   ├── Network error → "Couldn't submit. Check your connection."
          │   └── Auth expired → Redirect to login
          │
          └── SUCCESS:
              ↓
              Toast: "Project live. Go see it."
              Redirect to /projects/:newProjectId
              User sees their new project in full detail view
              (TanStack Query cache for feed is invalidated → fresh on return)
```

### Form State Machine

```
IDLE
  │
  ├── User types → EDITING
  │
EDITING
  │
  ├── User blurs field → VALIDATING_FIELD
  │   ├── Valid → EDITING (field green border)
  │   └── Invalid → EDITING (field error state)
  │
  ├── User submits → SUBMITTING
  │   ├── Client validation fails → EDITING (errors shown)
  │   └── Client validation passes → REQUEST_PENDING
  │
REQUEST_PENDING
  │
  ├── Success → SUCCESS (redirect)
  └── Error → EDITING (server error displayed)
```

---

## Like/Dislike Journey

### Reaction Flow (Full Decision Tree)

```
User views /projects/:id
           │
           ▼
   Reaction bar visible: [👍 24] [👎 8]
           │
           ▼
   IS USER AUTHENTICATED?
           │
     ┌─────┴──────┐
    NO            YES
     │             │
     ▼             ▼
Show tooltip:   IS THIS USER'S OWN PROJECT?
"Sign in to        │
react"         ┌───┴────┐
     │        YES      NO
     │         │        │
     │       Buttons  WHAT'S USER'S CURRENT REACTION?
     │       disabled      │
     │       (tooltip:  ┌──┴──────────────────┐
     │       "Can't     │                     │
     │       react to  NONE              EXISTING REACTION
     │       own        │                     │
     │       project") ▼              ┌───────┴───────┐
     │              Click Like    LIKED           DISLIKED
     │                   │           │               │
     │                   ▼           ▼               ▼
     │              Insert      Click Like:    Click Like:
     │              reaction    → Delete like  → Delete dislike
     │              type=like   (toggle off)   → Insert like
     │              (optimistic  Count -1      Count changes
     │               update:              
     │               +1 to likes)
     │
     └──────────────────────────────────────────────────────────┘
```

### Optimistic Update Logic

```
LIKE button clicked
│
├── STEP 1 (immediate, < 16ms):
│   UI updates before server response:
│   ├── Like button → active state (accent color, filled)
│   ├── Like count → +1 (or previous count restored if dislike removed)
│   ├── If had dislike: dislike button → inactive, count -1
│   └── Loading spinner NOT shown (optimistic, assume success)
│
├── STEP 2 (background, ~100-300ms):
│   Supabase upsert/delete reaction
│
├── STEP 3a (SUCCESS):
│   Refetch reaction data from server
│   (Confirms count is accurate)
│
└── STEP 3b (FAILURE):
    Rollback to previous state
    Toast: "Couldn't save reaction. Try again."
```

### Reaction State Visual Guide

```
DEFAULT (no reaction):
[👍  24]  [👎  8]
 ↑ gray border, gray icon, gray count

LIKED (active like):
[👍  25]  [👎  8]
 ↑ accent border, accent icon+count, filled background

DISLIKED (active dislike):
[👍  24]  [👎  9]
            ↑ gray-dark border, gray-dark icon+count, muted background

OWN PROJECT (disabled):
[👍  24]  [👎  8]
Hover tooltip: "You can't react to your own project"
Both buttons: 50% opacity, not-allowed cursor
```

---

## Comment Journey

### Post Comment Flow

```
User on /projects/:id
           │
           ▼
Scrolls to comment section
           │
           ▼
    IS USER AUTHENTICATED?
           │
     ┌─────┴──────┐
    NO            YES
     │             │
     ▼             ▼
┌────────────┐   ┌─────────────────────────────────────┐
│ Locked     │   │ [Comment input — placeholder:        │
│ input area │   │  "What do you think? Be honest."]    │
│ with       │   │                                      │
│ "Sign in   │   │ Character count: 0/500               │
│ to comment"│   │                                      │
└────────────┘   │ [Post comment]                       │
     │           └─────────────────────────────────────┘
     ▼                         │
 [Sign in]              Typing...
  button                       │
     │                 ├── < 1 char: button disabled
     ▼                 ├── 1-500 chars: button enabled
 /login?redirect       ├── > 450 chars: counter turns warning color
 =/projects/:id        └── 500 chars: input stops accepting + "At limit"
 after login →                 │
 return to detail          [Post comment] clicked
                               │
                         SUBMIT CLICKED
                               │
                         STEP 1 (optimistic):
                         Comment appears in list immediately
                         With pending indicator (spinner near comment)
                               │
                         STEP 2 (background):
                         INSERT to Supabase comments
                               │
                         ┌─────┴──────┐
                       SUCCESS      FAILURE
                         │             │
                         ▼             ▼
                   Spinner         Remove optimistic comment
                   disappears       Toast: "Comment failed. Try again."
                   Comment shows
                   with real ID
                   Input cleared
```

### Delete Comment Flow

```
User views a comment they authored
           │
           ▼
Hover/tap on comment → Delete button (×) appears (top right)
           │
           ▼
     Click delete ×
           │
           ▼
┌─────────────────────────────────────────────────────┐
│ CONFIRM DIALOG (not a full modal — inline confirm):  │
│                                                     │
│ "Delete this comment?"                              │
│ [Delete]  [Cancel]                                  │
└─────────────────────────────────────────────────────┘
           │
     ┌─────┴──────┐
  CONFIRM       CANCEL
     │             │
     ▼             ▼
Comment       Dialog dismisses
removed       Comment unchanged
immediately
(optimistic)
     │
  Background DELETE
  to Supabase
     │
  ┌──┴──┐
SUCCESS FAIL
  │       │
Done   Restore comment
       Toast: "Couldn't delete. Try again."
```

### Comment Display Rules

```
Comment Thread Order: Chronological (oldest first)
Thread renders as:
─────────────────────────────────────────────
@username  ·  2 hours ago                 [×]  ← only if own comment
Comment text content here, up to 500 
characters, displayed in full.
─────────────────────────────────────────────
@username  ·  5 minutes ago
Another comment...
─────────────────────────────────────────────
```

---

## Leaderboard Journey

### Leaderboard Browsing Flow

```
/leaderboard (or click Leaderboard in nav)
           │
           ▼
LOADING STATE:
Show 10 skeleton rows with shimmer animation
           │
           ▼
LOADED STATE:
┌──────────────────────────────────────────────────┐
│  Builders this month                             │
│  Ranked by total community score                 │
│                                                  │
│  #   Builder          Score    Projects          │
│  ─────────────────────────────────────────       │
│  1   jamie            +142     23                │
│  2   alexchen          +98     17                │
│  3   priyabuilds        +76     12               │
│  ...                                             │
│  47  you (if logged in) +4      2     ← Highlight│
│  ...                                             │
└──────────────────────────────────────────────────┘
           │
    INTERACTIONS:
    │
    ├── Click @username → /u/:username (profile page)
    │
    ├── AUTHENTICATED USER:
    │   Own row is highlighted (subtle accent background)
    │   "Your rank: #47" shown above table if not in top 50
    │
    └── UNAUTHENTICATED USER:
        No highlight, no rank shown
        CTA at bottom: "Submit projects to climb the leaderboard"
        [Sign up] button
```

### Leaderboard State Transitions

```
INITIAL LOAD
      │
      ▼
LOADING (skeleton rows)
      │
      ├── Data arrives → LOADED
      │   ├── > 0 users → Show table
      │   └── 0 users → Empty state: "No builders yet."
      │
      ├── Error → ERROR STATE
      │   "Couldn't load leaderboard. Refresh to try again."
      │   [Refresh]
      │
      └── Cache hit (returning visit) → LOADED (instant)
```

---

## User Profile Journey

### Viewing Own Profile

```
Click avatar in header
        │
        ▼
Click "View Profile" in dropdown
        │
        ▼
/u/[your-username]
        │
        ▼
┌───────────────────────────────────────────────────┐
│                                                   │
│   ○ (avatar)  @username                           │
│   Display Name                                    │
│   Bio text here...                                │
│   Joined June 2026  ·  4 projects  ·  Score: +24  │
│                                                   │
│   [Edit profile]  ← Only visible to own user      │
│                                                   │
│   ─────────────────────────────────────────────   │
│   Projects                                        │
│                                                   │
│   ┌─────────────────────────────────────────┐    │
│   │ Project Card 1                          │    │
│   └─────────────────────────────────────────┘    │
│   ┌─────────────────────────────────────────┐    │
│   │ Project Card 2                          │    │
│   └─────────────────────────────────────────┘    │
│                                                   │
└───────────────────────────────────────────────────┘
```

### Edit Profile Flow

```
/u/[username] → [Edit profile] button
        │
        ▼
┌─────────────────────────────────────────┐
│ EDIT PROFILE (modal or inline)          │
│                                         │
│ Display name: [_____________________]   │
│               max 100 characters        │
│                                         │
│ Bio:          [_____________________]   │
│               [_____________________]   │
│               [_____________________]   │
│               0/300 characters          │
│                                         │
│ [Save changes]   [Cancel]               │
└─────────────────────────────────────────┘
        │
        ├── SAVE CLICKED (valid):
        │   ↓
        │   Optimistic update on profile display
        │   PATCH to Supabase users table
        │   Toast: "Profile saved."
        │
        ├── SAVE CLICKED (invalid):
        │   ↓
        │   Show field-specific errors
        │
        └── CANCEL:
            Close modal, no changes
```

### Viewing Someone Else's Profile

```
Click @username anywhere (feed, leaderboard, comment)
        │
        ▼
/u/[their-username]
        │
        ├── FOUND: Render profile (no edit button)
        │
        └── NOT FOUND (username deleted/invalid):
            "This profile doesn't exist."
            [← Back to projects]
```

---

## Returning User Journey

### Direct Visit (Session Active)

```
User visits vibecoders.app
        │
        ▼
Auth check: supabase.auth.getSession()
        │
        ├── SESSION VALID
        │   ↓
        │   Header renders authenticated state immediately
        │   Feed loads with full interaction capability
        │   TanStack Query checks cache → shows stale data instantly
        │   Background refetch updates to latest
        │
        └── SESSION EXPIRED
            ↓
            Silent token refresh attempt
            │
            ├── Refresh succeeds → Normal authenticated flow
            └── Refresh fails → Unauthenticated state
                                 (no redirect; user sees feed,
                                 prompted to login when they try to act)
```

### Daily Use Pattern (Power User)

```
MORNING ROUTINE (2-5 minutes):
        │
        ▼
/ → Scan new projects from last visit
        │
        ├── React to 2-3 interesting projects (one click each)
        ├── Leave a comment on one that's particularly interesting
        ├── Click through to 1-2 to see external project
        │
        └── Check /leaderboard → see own rank progress
                │
                ▼
        If shipped something new → /submit → post it → done
```

---

## Mobile User Journey

### Mobile-Specific Patterns

```
MOBILE ENTRY (phone browser, 375px viewport)
        │
        ▼
Feed loads:
┌─────────────────────────────────────┐
│ [≡] VibeCoders               [+][👤]│
│─────────────────────────────────────│
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Project Title               ↗  │ │
│ │ Description (2 lines clipped)  │ │
│ │                                │ │
│ │ @username · 2h    👍14  💬3   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Next project card...           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Load more projects]                │
└─────────────────────────────────────┘
```

### Mobile Navigation Flow

```
Tap [≡] (hamburger)
        │
        ▼
Slide-in drawer from RIGHT:
┌──────────────────────────────────────┐
│                              [✕ Close]│
│                                      │
│  Feed                                │
│  Leaderboard                         │
│                                      │
│  ─────────────────                   │
│                                      │
│  [+ Submit project]                  │
│                                      │
│  ─────────────────                   │
│                                      │
│  @username                           │
│  View Profile                        │
│  Sign Out                            │
└──────────────────────────────────────┘

Backdrop behind drawer → tap to close
Escape key → close
Swipe right-to-left → close
```

### Mobile Submit Form

```
/submit on mobile:
Full-width single column form
Keyboard management:
├── URL field: type=url (mobile shows URL keyboard)
├── Textarea: return key moves to next input (not submits)
└── Submit button: sticky at bottom when keyboard open?
    (Implementation note: test this on iOS — sticky bottom
    with keyboard open is complex; standard scroll is safer)
```

### Mobile Reaction Tapping

```
Project detail on mobile:
        │
        ▼
Reaction bar is touch-optimized:
[  👍  Like  ·  24  ] [  👎  8  ]
    ↑ min-height: 44px   ↑ min-height: 44px

Tap zone is larger than visual button
No hover state on mobile (touch-only)
Tap feedback: immediate button state change + count update
```

### Mobile Comment Flow

```
/projects/:id on mobile:
Scroll down to comments section
        │
        ▼
Comment input:
- Tapping input opens keyboard
- Input scrolls into view above keyboard
- iOS: viewport-fit=cover + scrollIntoView on focus
- [Post] button in bottom-right of input area
- Tap [Post] → comment appears, keyboard dismisses
```

---

## Edge Cases

### Authentication Edge Cases

```
EDGE CASE: User tries to access /submit without being logged in
Resolution: Redirect to /login?redirect=/submit
After login: restore to /submit with empty form

EDGE CASE: User's session expires mid-form
Resolution: Submit button calls auth check first
If expired → save form data to sessionStorage
           → redirect to login
           → after login → restore form data from sessionStorage
           → user sees their form intact

EDGE CASE: OAuth account conflicts (same email, different provider)
Resolution: Supabase handles by linking accounts if same email
If conflict error: show "An account with this email exists. Sign in with email."

EDGE CASE: Username taken during OAuth onboarding
Resolution: Show inline error on /onboarding form
Suggest: "Try [name]2 or [name]dev"
```

### Reaction Edge Cases

```
EDGE CASE: User clicks like rapidly (double-tap)
Resolution: Debounce reaction clicks (300ms)
Only first click in debounce window fires

EDGE CASE: Reaction fails after optimistic update
Resolution: 
1. Rollback count to previous state
2. Rollback button to previous visual state
3. Toast: "Couldn't save. Try again."

EDGE CASE: User tries to react to deleted project
Resolution: Project detail shows "Project no longer available"
Reaction bar not rendered

EDGE CASE: Very large like count (10,000+)
Resolution: Format as "10.2k" not "10,241"
Use Intl.NumberFormat for consistent formatting
```

### Comment Edge Cases

```
EDGE CASE: Comment on project that gets deleted
Resolution: ON DELETE CASCADE — comments deleted with project
User's comment count on profile automatically decremented

EDGE CASE: Very long comment (approaching 500 chars)
Resolution: Character counter turns amber at 450
Turns red at 490
Input stops at 500 (enforced at input level)
Error if somehow exceeds: "Comment too long"

EDGE CASE: Multiple rapid comments submitted
Resolution: Submit button disabled after first click
Re-enabled after server response (success or error)
Prevents duplicate comments

EDGE CASE: Comment posted while another user is viewing
Resolution: Comments do NOT auto-update in real-time at MVP
User sees comment count update on refresh
(Realtime subscriptions are Phase 2)
```

### Project Submission Edge Cases

```
EDGE CASE: Same URL submitted by same user twice
Resolution: Database UNIQUE(user_id, url) constraint
Client shows: "You've already submitted this project."
[View your project] link

EDGE CASE: URL with very long query strings or fragments
Resolution: DB column max: 2048 chars (covers all reasonable URLs)
Client validation: > 2048 chars → "URL is too long"

EDGE CASE: User submits project, then immediately navigates away
Resolution: If submit was in flight: complete in background
Return to feed → new project appears at top

EDGE CASE: Project URL becomes a dead link post-submission
Resolution: No automatic checking (Phase 2)
Community can comment "link is broken"
Owner can edit URL

EDGE CASE: User navigates to /submit on a fresh browser session
The form is empty and ready. No auto-fill from previous sessions.
(Don't persist form data across sessions — privacy consideration)
```

### Leaderboard Edge Cases

```
EDGE CASE: Tie on leaderboard (same score)
Resolution: Tiebreaker = more projects submitted (secondary sort)
If still tied: earlier signup date (first to achieve the score)

EDGE CASE: Negative net score
Resolution: Scores CAN be negative (more dislikes than likes)
Show as "-4" with gray color (not red — not punitive)
Negative scores DO appear on leaderboard

EDGE CASE: New user with 0 projects
Resolution: Not shown on leaderboard (requires ≥ 1 project)

EDGE CASE: User deletes all their projects
Resolution: Removed from leaderboard immediately
Their reactions from others are deleted (CASCADE)
Their score drops to 0 / removed from table
```

### Profile Edge Cases

```
EDGE CASE: User changes username (Phase 2 feature)
Resolution: At MVP, usernames are immutable after creation
If implemented: redirect /u/old-username to /u/new-username (301)

EDGE CASE: Profile visited while user is deleting account (Phase 2)
Resolution: Show: "This profile is no longer available."

EDGE CASE: Very long bio text
Resolution: DB max 300 chars enforced
Display: full text (no truncation on profile page)

EDGE CASE: Username contains special characters
Resolution: Regex CHECK constraint on DB: ^[a-zA-Z0-9_-]{3,30}$
Client shows: "Username can only contain letters, numbers, - and _"
```

### Network & Performance Edge Cases

```
EDGE CASE: User on very slow connection
Resolution: 
- Skeletons prevent layout shift during loading
- Optimistic UI means reactions/comments feel instant
- Form submission button shows spinner (no timeout message < 10s)
- After 10s: "This is taking a while. Check your connection."

EDGE CASE: Supabase free tier temporarily unavailable
Resolution:
- Retry logic in TanStack Query (2 retries, exponential backoff)
- Error boundary catches render errors
- Page-level error state: "Having trouble connecting. Try again."
- Data in cache still shown (stale but visible)

EDGE CASE: User goes offline mid-session
Resolution:
- navigator.onLine listener in app
- Offline banner: "You're offline. Reconnect to see new content."
- Cached data still viewable
- Form data preserved in state (not lost)
- On reconnect: banner disappears, data refetches automatically

EDGE CASE: Concurrent edit (user edits project from two tabs)
Resolution: Last write wins (Supabase default)
Second save overwrites first (no conflict detection at MVP)
```

### State Transition Summary Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                    GLOBAL APP STATES                             │
│                                                                  │
│  ┌─────────────────┐                                            │
│  │  UNAUTHENTICATED│                                            │
│  │  • Browsing OK  │                                            │
│  │  • No reactions │◄──── signOut() ────────────────────────┐  │
│  │  • No comments  │                                         │  │
│  │  • No submit    │                                         │  │
│  └────────┬────────┘                                         │  │
│           │                                                  │  │
│    signIn/signUp/OAuth                                       │  │
│           │                                                  │  │
│           ▼                                                  │  │
│  ┌─────────────────┐                                         │  │
│  │  AUTHENTICATED  │                                         │  │
│  │  • Full access  ├─────────────────────────────────────────┘  │
│  │  • React        │                                            │
│  │  • Comment      │                                            │
│  │  • Submit       │                                            │
│  │  • Edit own     │                                            │
│  └─────────────────┘                                            │
│                                                                  │
│  ASYNC STATES (overlay on both auth states):                    │
│  • LOADING — data being fetched                                  │
│  • ERROR — fetch/mutation failed                                 │
│  • EMPTY — fetch succeeded, no data                             │
│  • OFFLINE — no network connection                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow Implementation Notes

### Route Protection Pattern

```jsx
// ProtectedRoute.jsx
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageSkeleton />;
  
  if (!user) {
    return <Navigate 
      to="/login" 
      state={{ redirect: location.pathname }} 
      replace 
    />;
  }
  
  return children;
}

// Usage in App.jsx
<Route path="/submit" element={
  <ProtectedRoute><Submit /></ProtectedRoute>
} />
```

### Redirect After Auth

```jsx
// Login.jsx — handle redirect after successful auth
const location = useLocation();
const navigate = useNavigate();
const redirectTo = location.state?.redirect || '/';

// After successful login:
navigate(redirectTo, { replace: true });
```

### Auth-Triggered Interactions

```jsx
// When unauthenticated user clicks Like:
function handleReactionClick(type) {
  if (!user) {
    // Show inline prompt (not a full modal)
    setShowAuthPrompt(true);
    return;
  }
  toggleReaction(type);
}

// AuthPrompt component:
// "Sign in to react to projects"
// [Sign in]  [Create account]
// (inline, below reaction bar, dismissable)
```
