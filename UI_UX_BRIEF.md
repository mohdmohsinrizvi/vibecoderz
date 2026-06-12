# UI_UX_BRIEF.md — VibeCoders Design Brief

**Version:** 1.0  
**Status:** Implementation-Ready  
**Last Updated:** June 2026  
**Author:** Product Design & UX Research  

---

## Table of Contents

1. [Brand Personality](#brand-personality)
2. [Design Philosophy](#design-philosophy)
3. [Design Principles](#design-principles)
4. [User Experience Strategy](#user-experience-strategy)
5. [User Psychology](#user-psychology)
6. [Community Psychology](#community-psychology)
7. [Color System](#color-system)
8. [Typography System](#typography-system)
9. [Layout System](#layout-system)
10. [Grid System](#grid-system)
11. [Spacing System](#spacing-system)
12. [Component Design System](#component-design-system)
13. [Mobile Design Strategy](#mobile-design-strategy)
14. [Tablet Design Strategy](#tablet-design-strategy)
15. [Desktop Design Strategy](#desktop-design-strategy)
16. [Accessibility Guidelines](#accessibility-guidelines)
17. [Empty States](#empty-states)
18. [Loading States](#loading-states)
19. [Error States](#error-states)
20. [Success States](#success-states)
21. [Motion Design System](#motion-design-system)
22. [Animation Guidelines](#animation-guidelines)
23. [Design QA Checklist](#design-qa-checklist)

---

## Brand Personality

VibeCoders is not trying to look like a startup. It *is* a startup — and it should feel like one made by builders who care deeply about craft, not one assembled from a UI kit.

### Brand Adjectives

| Primary | Secondary |
|---------|-----------|
| **Focused** | Confident |
| **Honest** | Warm |
| **Fast** | Precise |
| **Understated** | Modern |
| **Builder-native** | Slightly irreverent |

### Brand Voice

- Short sentences. Active voice.
- Never corporate. Never hype.
- Speak like a senior developer who respects your time.
- Examples:
  - ✅ "Ship it. See what they think."
  - ✅ "Your project is live."
  - ❌ "Welcome to the VibeCoders community! We're excited to help you showcase your amazing projects!"
  - ❌ "Please fill out the form below to submit your project."

### Brand Differentiation

VibeCoders sits in a visual and tonal space between:
- **GitHub** (technical credibility, no-nonsense)  
- **Linear** (premium quality, calm confidence)  
- **Raycast** (dark-mode-first, developer aesthetic)  

It is NOT:
- Product Hunt (busy, promotional)
- Reddit (chaotic, vote-obsessed)
- Dribbble (visual showcase)
- AngelList (professional posturing)

---

## Design Philosophy

### One Sentence

> Design should get out of the way and let the work speak.

### The Constraint as Feature

VibeCoders is intentionally minimal. This is a product decision backed by a design decision: every element on screen that isn't essential reduces focus on what matters — the projects and the people who built them.

The design must feel like it was made by one designer with an opinionated point of view, not assembled by committee. The signature choice: **monochromatic-primary with a single, precise accent.** No gradients. No illustration. No background textures. The projects are the content — the UI is the frame.

### Aesthetic Direction

The visual identity is built on three layers:

1. **Structure** — Tight grid, precise spacing, clean alignment
2. **Typography** — Type does the heavy lifting; it IS the design
3. **Restraint** — One accent color, used sparingly for action

This is not a "dark mode startup template." It is a specific visual language designed to signal: *this is where serious builders come.*

---

## Design Principles

### P1 — Respect Attention

Every interaction should feel instant or give immediate feedback. Users are builders — they have high standards for software. Latency, jank, and confusion erode trust faster in this audience than any other.

### P2 — Content is the Interface

Cards, profiles, and project listings are the product. The chrome (nav, buttons, headers) should feel invisible. If someone screenshots a project page, the brand shouldn't be shouting at them.

### P3 — One Thing Per Screen

Each page has one primary action. Submit page: submit. Feed: browse. Project detail: react and comment. Never compete with the user's intent.

### P4 — Earned Delight

Micro-animations and interactions exist to confirm actions, not to entertain. A like button should feel satisfying to tap because it confirms something real happened — not because it bounces.

### P5 — Mobile Without Compromise

The mobile layout is not a simplified version of desktop. It's the primary canvas. Every component is designed mobile-first and then *expanded* for larger screens.

### P6 — Honest About State

Empty, loading, and error states are first-class experiences. A well-designed empty state is a marketing moment. A well-designed error state is a trust-building moment.

---

## User Experience Strategy

### The 5-Second Test

A new visitor landing on VibeCoders should be able to answer these in 5 seconds:
1. What is this? *(A place where builders share projects)*
2. Who is it for? *(People who build with AI and code)*
3. What can I do? *(Browse, react, submit my own)*

The landing page / feed achieves this through: one-line headline, immediate project content, and a clear CTA.

### Interaction Principles

| Principle | Implementation |
|-----------|---------------|
| **Zero-friction browsing** | Full feed visible without login |
| **Low-friction reactions** | One tap; no confirmation dialog |
| **Progressive auth** | Show UI → prompt for auth only when action requires it |
| **Persistent state** | Never lose form data on navigation or auth redirect |
| **Fast feedback** | Every tap/click gives < 100ms visual response |

### Information Hierarchy (Per Page)

**Feed Page:**
1. Projects (primary)
2. Reaction counts (secondary)
3. Author + date (tertiary)
4. Nav (persistent, low-weight)

**Project Detail:**
1. Title + URL (primary)
2. Description (secondary)
3. Reaction bar (primary action)
4. Comments (secondary interaction)
5. Author attribution (tertiary)

**Leaderboard:**
1. Rank + username (primary)
2. Score (primary)
3. Project count (secondary)

---

## User Psychology

### Motivation Framework

The three core motivations for builders using VibeCoders:

**1. Validation** — "Someone noticed."  
Design response: Show reaction counts prominently. Make the first like feel like an event.

**2. Progress** — "I'm improving."  
Design response: Show total score on profile. Make the leaderboard feel aspirational, not intimidating.

**3. Discovery** — "I never would have found this otherwise."  
Design response: Feed design rewards scrolling. Every card should create enough curiosity to click.

### The Submission Moment

Submitting a project is a vulnerable act for many builders. The form must feel:
- Safe (not overwhelming)
- Fast (3 fields, no more)
- Rewarding (immediate confirmation with personality)

Post-submission, show the project immediately in context — not just a generic "success" toast. Let them see their work in the feed.

### The Reaction Mechanic

Unlike pure upvote systems, allowing both likes AND dislikes creates a more honest signal. Design consideration: dislikes should be visible but not weaponized.

- Dislike button: present but visually secondary to like
- Dislike count: shown but not highlighted in red/negative color
- Net score (likes - dislikes) is the primary number displayed
- This design prevents pile-ons while preserving signal integrity

---

## Community Psychology

### Reputation Visibility

The leaderboard is a motivational tool, not a competitive ranking. Design it to:
- Show everyone their position, not just the top
- Frame scores as "total impact" not "points"
- Make small scores feel meaningful ("3 reactions on your first project")

### Comment Culture

Short, honest comment culture is the goal. Design nudges toward quality:
- Character limit visible as you type (approaching 500 characters)
- Comment input has a placeholder that signals expected tone: "What do you think? Be honest."
- Comment display is clean and readable — no visual weight differences between comments (no karma/votes on individual comments at MVP)

### New User Onboarding Psychology

First-time visitors should experience:
1. **Instant value** — See projects immediately (no account required)
2. **Social proof** — Visible reaction counts signal active community
3. **Low barrier** — "Submit your project" CTA feels achievable, not daunting

---

## Color System

### Design Decision: Monochromatic + Single Precision Accent

The color system is deliberately limited. Complexity in color is complexity in cognition. One neutral scale, one accent. The accent is reserved for: primary actions, active states, and key data points.

**Accent color rationale:** A precise indigo-blue (#4F6EF7) is chosen over common choices (green for "go," orange for "energy," purple for "premium"). This specific blue reads as:
- Technical and credible
- Calm but alive
- Distinct from GitHub blue (#0d6efd) and Vercel blue

---

### Light Theme

```css
:root {
  /* Backgrounds */
  --bg-base:        #FFFFFF;   /* Page background */
  --bg-subtle:      #F8F8F8;   /* Card backgrounds, input fills */
  --bg-muted:       #F0F0F0;   /* Hover states, secondary surfaces */
  --bg-overlay:     #E8E8E8;   /* Dividers, borders */

  /* Content */
  --text-primary:   #111111;   /* Headings, primary text */
  --text-secondary: #555555;   /* Descriptions, metadata */
  --text-tertiary:  #999999;   /* Timestamps, placeholder text */
  --text-disabled:  #CCCCCC;   /* Disabled UI elements */
  --text-inverse:   #FFFFFF;   /* Text on dark/accent backgrounds */

  /* Borders */
  --border-subtle:  #EBEBEB;   /* Card borders, input borders */
  --border-default: #DDDDDD;   /* Dividers, stronger borders */
  --border-strong:  #BBBBBB;   /* Focused states, emphasis */

  /* Accent — Precise Indigo Blue */
  --accent:         #4F6EF7;   /* Primary CTA, active states */
  --accent-hover:   #3D5CE6;   /* Hover on accent elements */
  --accent-subtle:  #EEF1FE;   /* Accent backgrounds, tags */
  --accent-muted:   #C5CEFC;   /* Accent borders, light highlights */

  /* Semantic */
  --success:        #22C55E;   /* Confirmation, positive actions */
  --success-subtle: #F0FDF4;   /* Success backgrounds */
  --error:          #EF4444;   /* Errors, destructive actions */
  --error-subtle:   #FEF2F2;   /* Error backgrounds */
  --warning:        #F59E0B;   /* Warnings (Phase 2) */

  /* Reactions */
  --like:           #4F6EF7;   /* Like button active */
  --dislike:        #777777;   /* Dislike button active — neutral, not aggressive */
}
```

### Dark Theme

```css
[data-theme="dark"] {
  /* Backgrounds */
  --bg-base:        #0C0C0C;   /* Page background — not pure black */
  --bg-subtle:      #141414;   /* Card backgrounds */
  --bg-muted:       #1C1C1C;   /* Hover states */
  --bg-overlay:     #242424;   /* Modals, dropdowns */

  /* Content */
  --text-primary:   #F0F0F0;   /* Headings */
  --text-secondary: #A0A0A0;   /* Descriptions */
  --text-tertiary:  #666666;   /* Timestamps */
  --text-disabled:  #444444;   /* Disabled */
  --text-inverse:   #111111;   /* Text on light backgrounds */

  /* Borders */
  --border-subtle:  #222222;   /* Subtle card borders */
  --border-default: #2E2E2E;   /* Default borders */
  --border-strong:  #444444;   /* Focused states */

  /* Accent — Same hue, adjusted for dark */
  --accent:         #6680F8;   /* Slightly lighter for dark bg legibility */
  --accent-hover:   #7A92F9;
  --accent-subtle:  #1A1F3C;   /* Dark accent background */
  --accent-muted:   #2D3A6E;

  /* Semantic */
  --success:        #4ADE80;
  --success-subtle: #0F2018;
  --error:          #F87171;
  --error-subtle:   #2A0F0F;

  /* Reactions */
  --like:           #6680F8;
  --dislike:        #888888;
}
```

### Color Psychology Notes

| Color | Usage | Psychological Effect |
|-------|-------|---------------------|
| #0C0C0C (dark bg) | Base background in dark mode | Depth without harshness; softer than pure black |
| #4F6EF7 (accent) | Actions, active states | Calm authority; technical, precise |
| #F0F0F0 (light primary text) | Headings in dark | High contrast without eye strain |
| #A0A0A0 (secondary text) | Metadata, descriptions | Readable without competing with primary content |
| #777777 (dislike) | Dislike button active | Neutral signal; doesn't feel aggressive or punishing |

---

## Typography System

### Font Recommendation

**Display / Headings:** `Inter` (Google Fonts, free)  
**Body:** `Inter` (same family — single font system, varies by weight)  
**Monospace:** `JetBrains Mono` or `ui-monospace` (for code snippets, URLs, usernames)

**Rationale for Inter:**  
Inter was designed specifically for screen readability at small sizes. It has wide language support, extremely readable numerals (important for scores and counts), and carries the exact tone of the reference brands (Linear uses Inter, Vercel uses Geist which is Inter-adjacent). It avoids the "template" feel because its quality is in its absence — it never draws attention to itself.

**Alternative if Inter feels too common:** `DM Sans` (similar range, slightly more personality in display sizes)

### Type Scale

```css
:root {
  /* Scale */
  --text-xs:   12px;   /* Labels, captions, meta */
  --text-sm:   13px;   /* Secondary UI text, timestamps */
  --text-base: 15px;   /* Body text, descriptions */
  --text-md:   17px;   /* Card titles, section headings */
  --text-lg:   20px;   /* Page section headers */
  --text-xl:   24px;   /* Page titles */
  --text-2xl:  30px;   /* Hero headings */
  --text-3xl:  36px;   /* Landing page H1 */

  /* Line Heights */
  --leading-tight:  1.25;   /* Headings */
  --leading-snug:   1.4;    /* Card titles */
  --leading-normal: 1.6;    /* Body text */
  --leading-relaxed:1.75;   /* Long-form descriptions */

  /* Font Weights */
  --font-regular:  400;
  --font-medium:   500;
  --font-semibold: 600;
  --font-bold:     700;

  /* Letter Spacing */
  --tracking-tight: -0.02em;   /* Large headings */
  --tracking-normal: 0;        /* Body */
  --tracking-wide:  0.04em;    /* Uppercase labels */
}
```

### Typography Usage Guide

| Element | Size | Weight | Line Height | Tracking |
|---------|------|--------|-------------|---------|
| Page H1 | 30–36px | 700 | 1.25 | -0.02em |
| Section H2 | 24px | 600 | 1.3 | -0.01em |
| Card title | 17px | 600 | 1.35 | -0.01em |
| Body / description | 15px | 400 | 1.6 | 0 |
| Secondary text | 13px | 400 | 1.5 | 0 |
| Timestamp / meta | 12px | 400 | 1.4 | 0 |
| Button label | 14px | 500 | 1 | 0 |
| Nav link | 14px | 500 | 1 | 0 |
| Username | 13px | 600 | 1 | 0 |
| Score / count | 15px | 600 | 1 | -0.01em |

### Typography Rules

1. **Never more than 2 visual type sizes on a single card**
2. **Headings always use negative tracking at large sizes** (≥ 24px)
3. **All caps only for labels**, never for headings or body
4. **Descriptions max-width: 60 characters per line** (optimal reading line length)
5. **Monospace font for:** URLs (project links), usernames, code

---

## Layout System

### Page Structure

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (sticky, 56px height)                           │
│  Logo        Nav Links         Submit CTA   Auth        │
└─────────────────────────────────────────────────────────┘
│                                                         │
│  CONTENT AREA                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Page Container (max-width: 720px, centered)    │   │
│  │                                                 │   │
│  │  Page content here                              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
│  FOOTER (minimal, 48px)                                 │
│  © VibeCoders   Privacy   Terms                         │
└─────────────────────────────────────────────────────────┘
```

### Content Width Strategy

```css
:root {
  --container-sm:  480px;   /* Auth pages, modals */
  --container-md:  720px;   /* Feed, project detail, leaderboard */
  --container-lg:  960px;   /* Wide leaderboard on desktop */
  --container-xl: 1200px;   /* Marketing/landing (Phase 2) */
}

.container {
  width: 100%;
  max-width: var(--container-md);
  margin: 0 auto;
  padding: 0 var(--space-4);  /* 16px side padding on mobile */
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); }  /* 24px */
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--space-8); }  /* 32px */
}
```

**Rationale for 720px max-width:**  
This is an intentional editorial constraint. 720px enforces readable line lengths and prevents the feed from becoming a sprawling grid at desktop. The platform is content-first, not layout-first. Linear's content area is ~680px. Stripe's documentation is ~700px. This choice signals quality content, not a feature dashboard.

---

## Grid System

### Feed Grid (Mobile-First)

```
Mobile (< 640px):     1 column, full width
Tablet (640–1024px):  1 column, max 600px centered
Desktop (> 1024px):   1 column, max 720px centered
```

**Why single column?** The feed is a reading experience, not a browsing gallery. Single column is faster to scan, better for mobile, and prevents the "card grid" generic SaaS look. This is a deliberate divergence from Product Hunt's grid.

### Leaderboard Grid

```
Mobile:   Full width table, horizontal scroll if needed
Desktop:  Max 720px, 4 columns: Rank | Name | Score | Projects
```

---

## Spacing System

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

### Spacing Usage Guide

| Usage | Value |
|-------|-------|
| Within a component (button padding) | 8–12px |
| Between related elements (label + input) | 8px |
| Between components in a card | 12–16px |
| Card internal padding | 20–24px |
| Between cards in feed | 16px |
| Section spacing | 40–48px |
| Page top padding | 48px |
| Page bottom padding | 96px |

### The Breathing Rule

Every section of every page should have more whitespace than you initially think it needs. The reference check: does this look like it came from Linear's website? If it feels "tight," add 8–16px more spacing.

---

## Component Design System

### Buttons

```css
/* Base button properties */
.btn {
  font-size: var(--text-sm);         /* 13px */
  font-weight: var(--font-medium);   /* 500 */
  line-height: 1;
  padding: 8px 14px;
  border-radius: 6px;
  transition: background 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

/* Primary: for the one key action per page */
.btn-primary {
  background: var(--accent);         /* #4F6EF7 */
  color: var(--text-inverse);
  border: none;
}
.btn-primary:hover { background: var(--accent-hover); }
.btn-primary:active { opacity: 0.85; }
.btn-primary:focus-visible { 
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Secondary: for supporting actions */
.btn-secondary {
  background: var(--bg-subtle);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}
.btn-secondary:hover { background: var(--bg-muted); }

/* Ghost: for tertiary / nav actions */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
}
.btn-ghost:hover { 
  background: var(--bg-subtle); 
  color: var(--text-primary);
}

/* Destructive: for delete actions */
.btn-destructive {
  background: transparent;
  color: var(--error);
  border: 1px solid transparent;
}
.btn-destructive:hover {
  background: var(--error-subtle);
  border-color: var(--error);
}

/* Sizes */
.btn-sm { padding: 6px 10px; font-size: 12px; border-radius: 5px; }
.btn-md { padding: 8px 14px; font-size: 13px; }  /* Default */
.btn-lg { padding: 10px 18px; font-size: 15px; border-radius: 8px; }
```

**Button Hierarchy Rule:** Never show two primary buttons on the same screen. If two actions are needed, one is primary and one is secondary.

---

### Inputs

```css
.input {
  width: 100%;
  padding: 10px 12px;
  font-size: var(--text-base);     /* 15px */
  font-weight: var(--font-regular);
  color: var(--text-primary);
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  line-height: 1.5;
}

.input::placeholder { color: var(--text-tertiary); }

.input:hover { border-color: var(--border-default); }

.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.input.error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px var(--error-subtle);
}

/* Textarea */
.textarea {
  /* Same as input */
  resize: vertical;
  min-height: 100px;
  line-height: var(--leading-normal); /* 1.6 */
}

/* Field wrapper with label and error */
.field { display: flex; flex-direction: column; gap: var(--space-2); }
.field-label { 
  font-size: var(--text-sm); 
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}
.field-hint { font-size: var(--text-xs); color: var(--text-tertiary); }
.field-error { font-size: var(--text-xs); color: var(--error); }

/* Character counter */
.char-counter { 
  font-size: var(--text-xs); 
  color: var(--text-tertiary);
  text-align: right;
}
.char-counter.near-limit { color: var(--warning); }
.char-counter.at-limit { color: var(--error); }
```

---

### Project Card

```
┌─────────────────────────────────────────────────────┐
│  Project Title (17px, semibold)         ↗ (ext link) │
│  Description line 1 (15px, regular, clamp 2 lines)  │
│  Description line 2...                              │
│                                                     │
│  ──────────────────────────────────────────────     │
│  👤 username   ·   2 hours ago         👍 14  💬 3  │
└─────────────────────────────────────────────────────┘
```

```css
.project-card {
  padding: var(--space-5);             /* 20px */
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.project-card:hover {
  border-color: var(--border-default);
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.project-card-title {
  font-size: var(--text-md);           /* 17px */
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-2);
}

.project-card-description {
  font-size: var(--text-base);         /* 15px */
  color: var(--text-secondary);
  line-height: var(--leading-normal);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--space-4);
}

.project-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-3);
  border-top: 1px solid var(--border-subtle);
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.project-card-reactions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

/* Feed spacing */
.project-feed > .project-card + .project-card {
  margin-top: var(--space-4);
}
```

**Card Design Notes:**
- External link icon (↗) is always visible to signal the URL opens elsewhere
- No image thumbnails — text-only cards are faster, more legible, and don't require scraped previews
- Reaction counts on card are read-only (for interaction, user goes to detail page)
- Card click navigates to detail page

---

### Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (height: 56px, sticky, backdrop-blur on scroll)         │
│                                                                 │
│  [V] VibeCoders      Feed    Leaderboard    [+ Submit]  [User▾] │
└─────────────────────────────────────────────────────────────────┘
```

```css
.header {
  height: 56px;
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-subtle);
}

/* On scroll: add subtle blur */
.header.scrolled {
  background: color-mix(in srgb, var(--bg-base) 90%, transparent);
  backdrop-filter: blur(12px);
}

.logo {
  font-size: 16px;
  font-weight: var(--font-bold);
  color: var(--text-primary);
  letter-spacing: -0.02em;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  padding: 6px 10px;
  border-radius: 6px;
  text-decoration: none;
  transition: color 120ms, background 120ms;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-subtle);
}

.nav-link.active {
  color: var(--text-primary);
  background: var(--bg-muted);
}

.nav-submit {
  /* Primary button — small size */
  background: var(--accent);
  color: white;
  font-size: 13px;
  font-weight: var(--font-medium);
  padding: 6px 12px;
  border-radius: 6px;
}
```

**Mobile Navigation:**
- Collapse nav links to hamburger menu (☰) at < 640px
- "Submit" remains visible as icon-only on mobile
- Slide-in drawer from right for mobile menu

---

### Reaction Bar (Project Detail)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   [👍 Like  ·  24]      [👎  8]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

```css
.reaction-bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) 0;
}

.reaction-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-subtle);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 150ms ease;
}

.reaction-btn:hover {
  border-color: var(--border-default);
  color: var(--text-primary);
}

/* Active like state */
.reaction-btn.like.active {
  background: var(--accent-subtle);
  border-color: var(--accent-muted);
  color: var(--accent);
}

/* Active dislike state */
.reaction-btn.dislike.active {
  background: var(--bg-muted);
  border-color: var(--border-default);
  color: var(--text-primary);
}

.reaction-count {
  font-weight: var(--font-semibold);
  font-variant-numeric: tabular-nums;
}
```

**Reaction Animation:**
On click, the count transitions with a subtle scale:  
`transform: scale(1.15)` → back to `scale(1)` over 200ms.

---

### Comment Component

```css
.comment-item {
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--border-subtle);
}

.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.comment-author {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.comment-time {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.comment-content {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

.comment-delete {
  /* Ghost button, only visible on hover of comment */
  opacity: 0;
  transition: opacity 120ms;
}
.comment-item:hover .comment-delete {
  opacity: 1;
}

/* Comment input */
.comment-input-area {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) 0;
}
```

---

### Leaderboard Table

```
┌──────────────────────────────────────────────────────┐
│  #    Builder            Score    Projects           │
│  ─────────────────────────────────────────────────  │
│  1    ⬡ jamie           +142     23                 │
│  2    ⬡ alexchen         +98     17                 │
│  3    ⬡ priyabuilds       +76     12                 │
│  ...                                                │
└──────────────────────────────────────────────────────┘
```

```css
.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-header {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-subtle);
}

.leaderboard-row {
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-subtle);
  display: grid;
  grid-template-columns: 40px 1fr 80px 80px;
  align-items: center;
}

.leaderboard-rank {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
}

/* Top 3 ranks get accent color */
.leaderboard-row:nth-child(-n+3) .leaderboard-rank {
  color: var(--accent);
}

.leaderboard-score {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}
```

---

### Modal

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: var(--space-4);
}

.modal-panel {
  background: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: var(--space-6);
  width: 100%;
  max-width: var(--container-sm);
  box-shadow: 0 24px 48px rgba(0,0,0,0.12);
  animation: modal-enter 200ms ease;
}

@keyframes modal-enter {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.modal-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-tight);
}
```

---

## Mobile Design Strategy

### Breakpoints

```css
/* Mobile first: base styles = mobile */
/* sm: ≥ 640px */
/* md: ≥ 768px */
/* lg: ≥ 1024px */
/* xl: ≥ 1280px */
```

### Mobile-Specific Decisions

| Element | Mobile Behavior |
|---------|----------------|
| Header | Logo + Submit icon + Hamburger |
| Nav links | Slide-in drawer from right |
| Project cards | Full width, 16px side padding |
| Reaction bar | Larger touch targets (min 44px height) |
| Comment input | Sticky to bottom of viewport |
| Leaderboard | Ranks + Name + Score (projects hidden) |
| Submit form | Full width, stacked fields |
| Modals | Bottom sheet on mobile (slides up) |

### Touch Targets

All interactive elements: minimum 44×44px tap target (Apple/WCAG standard).

```css
.reaction-btn { min-height: 44px; min-width: 80px; }
.nav-link { min-height: 44px; }
.btn { min-height: 38px; }
```

### Bottom Sheet Pattern (Mobile Modals)

```css
@media (max-width: 640px) {
  .modal-overlay { align-items: flex-end; }
  .modal-panel {
    border-radius: 16px 16px 0 0;
    max-width: 100%;
    padding-bottom: calc(var(--space-6) + env(safe-area-inset-bottom));
    animation: sheet-enter 250ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  @keyframes sheet-enter {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
}
```

---

## Tablet Design Strategy

Tablet (640px–1024px) is treated as a wide-mobile experience, not a narrow-desktop:

- Single column feed, wider cards (up to 600px)
- Full nav visible (no hamburger)
- Side padding increases to 24px
- Modal centers like desktop
- Leaderboard shows all 4 columns

---

## Desktop Design Strategy

At 1024px+, the layout settles into its final form:

- Content locked at max-width: 720px, centered
- Side padding: 32px
- Generous vertical spacing between sections
- Hover states fully visible (cards, buttons, comments)
- Full leaderboard table visible

**The "nothing above 720px" rule is intentional.** The page never goes full-width on desktop. This creates a premium, editorial feel. It's the same pattern used by Stripe Docs, Linear's blog, and Vercel's changelog.

---

## Accessibility Guidelines

### Standards

Target: **WCAG 2.1 Level AA**

### Color Contrast Requirements

| Element | Minimum Ratio | Target |
|---------|--------------|--------|
| Body text (15px) | 4.5:1 | ≥ 7:1 |
| Large text (≥ 24px) | 3:1 | ≥ 4.5:1 |
| UI components (buttons, inputs) | 3:1 | ≥ 4.5:1 |
| Placeholder text | 3:1 (advisory) | ≥ 4.5:1 preferred |

**Verified contrasts:**
- `#111111` on `#FFFFFF` = 19:1 ✅
- `#555555` on `#FFFFFF` = 7.4:1 ✅
- `#4F6EF7` on `#FFFFFF` = 4.7:1 ✅
- `#F0F0F0` on `#0C0C0C` = 15.7:1 ✅ (dark mode)

### Keyboard Navigation

```
Tab Order:
1. Skip to main content link (hidden, first focusable)
2. Logo link
3. Nav links
4. Main content area focusable elements
5. Footer links

Interactive elements must have:
- Visible :focus-visible styles (2px accent outline, 2px offset)
- Logical tab order (follows visual order)
- No focus traps except modals
- Escape key closes all modals/drawers
```

### Screen Reader Requirements

```html
<!-- Semantic HTML structure -->
<header role="banner">
<nav aria-label="Main navigation">
<main id="main-content">
<footer role="contentinfo">

<!-- ARIA for dynamic elements -->
<button aria-pressed="true" aria-label="Like this project">
<div aria-live="polite" aria-atomic="true">14 likes</div>

<!-- Status announcements -->
<div role="status" aria-live="polite" class="sr-only">
  Project submitted successfully
</div>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Empty States

### Feed — No Projects

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              ╭─────────────╮                        │
│              │  ╱╲   ╱╲   │                        │
│              │ ╱  ╲_╱  ╲  │  (subtle icon)         │
│              ╰─────────────╯                        │
│                                                     │
│           Nothing here yet.                         │
│      Be the first to post a project.                │
│                                                     │
│            [Submit your project]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Copy:** "Nothing here yet. Be the first to post a project."  
**Action:** Primary button → /submit

### Profile — No Projects

**Copy:** "[username] hasn't posted anything yet."  
**If own profile:** "You haven't posted anything yet. Share your first project."  
**Action:** Link to /submit

### Comments — No Comments

**Copy:** "No comments yet. Start the conversation."  
**Action:** Scroll to comment input (authenticated) or "Sign in to comment" (unauthenticated)

### Leaderboard — Loading / Error

**Loading:** Skeleton rows (see loading states)  
**Error:** "Leaderboard unavailable. Refresh to try again."

---

## Loading States

### Skeleton Screens (Preferred over Spinners)

**Project Card Skeleton:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-muted) 25%,
    var(--bg-overlay) 50%,
    var(--bg-muted) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Skeleton sizes match real content */
.skeleton-title  { height: 20px; width: 60%; }
.skeleton-body   { height: 14px; width: 100%; margin-top: 8px; }
.skeleton-meta   { height: 14px; width: 40%; margin-top: 16px; }
```

**Feed Loading:** Show 5 skeleton cards immediately, replace with real content when data arrives.

### Inline Loading (for Actions)

Button loading state:
```jsx
<button disabled={isLoading}>
  {isLoading ? <Spinner size={14} /> : 'Submit project'}
</button>
```

Spinner: 14px SVG circle, `border-top: 2px solid currentColor`, spins at 600ms.

---

## Error States

### Inline Form Errors

Appear below the relevant field, immediately on blur or submit.  
Red text, small icon:
```
⚠ Title must be at least 5 characters
```

### Page-Level Errors

For failed data loads (feed, detail, leaderboard):
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│     Something went wrong loading projects.          │
│     Check your connection and refresh.              │
│                                                     │
│              [Refresh page]                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 404 Page

Short and direct:
```
     404
     
This page doesn't exist.
     
[← Back to projects]
```

---

## Success States

### Toasts (Non-blocking notifications)

Position: Top-center, below header  
Duration: 3 seconds auto-dismiss  
Animation: Slide down from top, fade out

```css
.toast {
  position: fixed;
  top: 68px;           /* Below sticky header */
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 16px;
  border-radius: 8px;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  z-index: 300;
  animation: toast-enter 200ms ease, toast-exit 200ms ease 2800ms forwards;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.toast.success {
  background: var(--success-subtle);
  color: var(--success);
  border: 1px solid var(--success);
}

@keyframes toast-enter {
  from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
```

### Success Messages

| Action | Toast Message |
|--------|--------------|
| Project submitted | "Project live. Go see it." |
| Reaction added | (no toast — button state change is sufficient) |
| Comment posted | (no toast — comment appears instantly) |
| Profile updated | "Profile saved." |
| Project deleted | "Project removed." |
| Signed in | (redirect is the feedback) |

---

## Motion Design System

### Timing Functions

```css
:root {
  --ease-default:  cubic-bezier(0.4, 0, 0.2, 1);   /* Material standard */
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:   cubic-bezier(0.32, 0.72, 0, 1);  /* For modals, drawers */
}
```

### Duration Scale

```css
:root {
  --duration-instant:  80ms;    /* Hover color changes */
  --duration-fast:    120ms;    /* Button states */
  --duration-normal:  200ms;    /* Element appearances */
  --duration-slow:    300ms;    /* Page transitions */
  --duration-slower:  400ms;    /* Complex reveals */
}
```

### Motion Budget

Every page should have no more than 3 elements animating simultaneously. The goal is to feel alive, not chaotic.

---

## Animation Guidelines

### What Gets Animated

| Element | Animation | Reason |
|---------|-----------|--------|
| Button hover | `background` color 120ms | Confirms interactivity |
| Reaction toggle | `scale(1.15)` count → normal 200ms | Confirms action |
| Card hover | `border-color` + subtle `box-shadow` 150ms | Depth signal |
| Modal open | `translateY(8px)` → 0, `opacity` 200ms | Spatial origin |
| Toast | Slide in from top 200ms | Non-jarring notification |
| Mobile drawer | Slide right 250ms spring | Natural gesture |
| Skeleton shimmer | Continuous gradient sweep 1.5s | Loading indication |
| Page transition | `opacity` 0→1 150ms | Prevents jarring cuts |

### What Does NOT Get Animated

- Individual feed cards loading in (would cause layout shift)
- Navigation link hover (color change only, no motion)
- Form field focus (border/shadow change only)
- Any element the user is actively interacting with

### The Principle

> "Animation should explain what happened, not decorate what's happening."

If removing an animation makes the interface feel more direct and clear, remove it.

---

## Design QA Checklist

### Every Page

- [ ] All interactive elements have `:focus-visible` styles
- [ ] Tap targets are ≥ 44px on mobile
- [ ] Color contrast meets WCAG AA on all text
- [ ] Loading state is implemented (skeleton or spinner)
- [ ] Empty state is implemented
- [ ] Error state is implemented
- [ ] Page title (`<title>`) is descriptive and unique

### Dark Mode

- [ ] All `var()` color tokens switch correctly in dark theme
- [ ] No hardcoded hex colors in component styles
- [ ] No images or icons that only work in light mode
- [ ] Border colors visible against dark backgrounds
- [ ] Box shadows adjusted for dark mode legibility

### Typography

- [ ] No text below 12px
- [ ] Body text line length ≤ 65ch at max
- [ ] Heading hierarchy logical (H1 → H2 → H3, no skipping)
- [ ] Italic used intentionally (never for styling)
- [ ] Font weights consistent across same elements

### Spacing

- [ ] Uses spacing tokens (no arbitrary pixel values)
- [ ] Mobile spacing tighter than desktop (check both)
- [ ] Consistent internal padding within cards/sections
- [ ] No collapsing margins causing unexpected gaps

### Interactions

- [ ] All form validations give field-specific error messages
- [ ] All async actions show a loading state
- [ ] All mutations show a success confirmation
- [ ] Destructive actions require confirmation (project delete)
- [ ] Navigating away from an incomplete form shows warning

### Mobile

- [ ] Tested on iOS Safari (real device or Simulator)
- [ ] Tested on Android Chrome (real device or DevTools)
- [ ] Viewport meta tag present
- [ ] No horizontal scroll
- [ ] Safe area insets respected (iOS notch/home indicator)
- [ ] Touch targets ≥ 44px throughout
