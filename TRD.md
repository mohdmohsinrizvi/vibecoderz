# TRD.md — VibeCoders Technical Requirements Document

**Version:** 1.0  
**Status:** Ready for Development  
**Last Updated:** June 2026  
**Author:** Solutions Architecture & Engineering  

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Overview](#architecture-overview)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Database Architecture](#database-architecture)
6. [Authentication Design](#authentication-design)
7. [Authorization Rules](#authorization-rules)
8. [Database Schema](#database-schema)
9. [API Structure](#api-structure)
10. [Security Requirements](#security-requirements)
11. [Performance Requirements](#performance-requirements)
12. [Scalability Considerations](#scalability-considerations)
13. [Free Tier Considerations](#free-tier-considerations)
14. [Error Handling Strategy](#error-handling-strategy)
15. [Deployment Architecture](#deployment-architecture)
16. [Monitoring Strategy](#monitoring-strategy)
17. [Technical Risks](#technical-risks)
18. [Future Technical Roadmap](#future-technical-roadmap)

---

## System Overview

VibeCoders is a single-page application (SPA) with a React frontend communicating directly with Supabase (PostgreSQL + Auth + Storage). There is no custom backend server. All business logic either lives in the React client, PostgreSQL functions/triggers, or Supabase Row Level Security policies.

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| No custom server | Supabase direct | Eliminates server cost and maintenance on free tier |
| SPA over SSR | Vite + React | Fast dev experience; SEO acceptable for community platform |
| Auth provider | Supabase Auth | Built-in, free, supports OAuth + email; no separate service |
| Database | PostgreSQL via Supabase | Relational model fits community data; RLS is first-class |
| Hosting | Vercel | Free tier, CDN, instant deploys from Git |
| State management | React Context + TanStack Query | Minimal complexity; no Redux needed for this scope |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React SPA (Vite Build)                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │   │
│  │  │  Pages   │  │Components│  │  Hooks   │             │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘             │   │
│  │       │              │              │                   │   │
│  │  ┌────▼──────────────▼──────────────▼─────────────┐    │   │
│  │  │         Supabase JS Client (v2)                 │    │   │
│  │  └────────────────────┬────────────────────────────┘    │   │
│  └───────────────────────┼─────────────────────────────────┘   │
└──────────────────────────┼──────────────────────────────────────┘
                           │  HTTPS / WebSockets
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                       SUPABASE PLATFORM                         │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   Supabase Auth │  │  PostgREST API  │  │  Realtime WS   │  │
│  │  (JWT tokens)   │  │  (REST layer)   │  │  (live updates)│  │
│  └────────┬────────┘  └────────┬────────┘  └───────┬────────┘  │
│           │                   │                    │           │
│  ┌────────▼───────────────────▼────────────────────▼────────┐  │
│  │                   PostgreSQL Database                    │  │
│  │                                                          │  │
│  │   users │ projects │ reactions │ comments               │  │
│  │   + Row Level Security Policies                         │  │
│  │   + Database Functions & Triggers                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Supabase Storage (Phase 2)                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (HOSTING)                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Static Build Output (Vite dist/)               │  │
│  │           CDN Edge Network (100+ PoPs)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Summary

```
User Action → React Component → Supabase Client
           → Supabase Auth (JWT verification)
           → PostgREST (RLS policy check)
           → PostgreSQL (query execution)
           → Response → TanStack Query cache update
           → React re-render
```

---

## Frontend Architecture

### Directory Structure

```
vibecoders/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/                    # Primitive UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageContainer.jsx
│   │   ├── project/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectFeed.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   └── ReactionBar.jsx
│   │   ├── comment/
│   │   │   ├── CommentList.jsx
│   │   │   ├── CommentItem.jsx
│   │   │   └── CommentInput.jsx
│   │   └── leaderboard/
│   │       └── LeaderboardTable.jsx
│   ├── pages/
│   │   ├── Home.jsx               # Feed page
│   │   ├── ProjectDetail.jsx
│   │   ├── Submit.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   ├── useAuth.js             # Auth state + methods
│   │   ├── useProjects.js         # Project CRUD via TanStack Query
│   │   ├── useReactions.js        # Reaction mutations
│   │   ├── useComments.js         # Comment CRUD
│   │   └── useLeaderboard.js      # Leaderboard data
│   ├── lib/
│   │   ├── supabase.js            # Supabase client init
│   │   ├── utils.js               # Shared utilities (dates, URLs)
│   │   └── validators.js          # Form validation schemas
│   ├── context/
│   │   └── AuthContext.jsx        # Global auth state provider
│   ├── styles/
│   │   ├── globals.css            # CSS custom properties, reset
│   │   └── tokens.css             # Design tokens
│   ├── App.jsx                    # Router setup
│   └── main.jsx                   # Entry point
├── .env.example
├── .env.local                     # gitignored
├── vite.config.js
├── index.html
└── package.json
```

### Routing Structure

```
/                    → Home (Feed)
/projects/:id        → Project Detail
/submit              → Submit Project (auth required)
/leaderboard         → Leaderboard
/u/:username         → User Profile
/login               → Login
/signup              → Signup
/auth/callback       → OAuth callback handler
*                    → 404
```

### State Management Strategy

```
Global State (AuthContext)
├── user (Supabase User object or null)
├── session (JWT session or null)
├── loading (boolean)
└── methods: signIn, signUp, signOut, signInWithGoogle

Server State (TanStack Query)
├── useProjects() — feed data, paginated
├── useProject(id) — single project + reactions + comments
├── useLeaderboard() — top 50 users
└── useProfile(username) — user + their projects

Local State (useState in components)
├── Form inputs
├── Modal open/close
└── Optimistic UI (reaction counts)
```

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3",
    "react-dom": "^18.3",
    "react-router-dom": "^6.22",
    "@supabase/supabase-js": "^2.39",
    "@tanstack/react-query": "^5.17",
    "date-fns": "^3.3"
  },
  "devDependencies": {
    "vite": "^5.0",
    "@vitejs/plugin-react": "^4.2",
    "eslint": "^8.56"
  }
}
```

**No UI component library.** All components are custom-built per the design system. This prevents template-looking UI and gives full design control.

---

## Backend Architecture

VibeCoders has no traditional backend server. The "backend" is composed of:

### 1. Supabase PostgREST

Auto-generated REST API from PostgreSQL schema. The Supabase JS client calls this transparently. Direct table access is controlled by RLS.

### 2. PostgreSQL Functions (RPC)

For complex queries that shouldn't be done client-side:

```sql
-- Leaderboard aggregation
CREATE OR REPLACE FUNCTION get_leaderboard()
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  total_score BIGINT,
  project_count BIGINT
) AS $$
  SELECT 
    u.id AS user_id,
    u.username,
    COALESCE(SUM(
      CASE WHEN r.reaction_type = 'like' THEN 1
           WHEN r.reaction_type = 'dislike' THEN -1
           ELSE 0 END
    ), 0) AS total_score,
    COUNT(DISTINCT p.id) AS project_count
  FROM users u
  LEFT JOIN projects p ON p.user_id = u.id
  LEFT JOIN reactions r ON r.project_id = p.id
  GROUP BY u.id, u.username
  ORDER BY total_score DESC
  LIMIT 50;
$$ LANGUAGE sql STABLE;

-- Net reaction score for a single project
CREATE OR REPLACE FUNCTION get_project_score(p_project_id UUID)
RETURNS INTEGER AS $$
  SELECT 
    COALESCE(SUM(
      CASE WHEN reaction_type = 'like' THEN 1
           WHEN reaction_type = 'dislike' THEN -1
           ELSE 0 END
    ), 0)
  FROM reactions
  WHERE project_id = p_project_id;
$$ LANGUAGE sql STABLE;
```

### 3. PostgreSQL Triggers

```sql
-- Prevent users from reacting to their own projects
CREATE OR REPLACE FUNCTION prevent_self_reaction()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT user_id FROM projects WHERE id = NEW.project_id) = NEW.user_id THEN
    RAISE EXCEPTION 'Cannot react to your own project';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_self_reaction
BEFORE INSERT ON reactions
FOR EACH ROW EXECUTE FUNCTION prevent_self_reaction();

-- Updated_at auto-update
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Database Architecture

### Entity Relationship Diagram

```
┌──────────────────┐
│      users       │
├──────────────────┤
│ id (PK, UUID)    │◄──────────────────────────────┐
│ username         │                               │
│ email            │                               │
│ display_name     │                               │
│ bio              │                               │
│ avatar_url       │                               │
│ created_at       │                               │
│ updated_at       │                               │
└────────┬─────────┘                               │
         │ 1                                        │
         │                                          │
         │ N                                        │
┌────────▼─────────┐                               │
│     projects     │                               │
├──────────────────┤       ┌───────────────────┐   │
│ id (PK, UUID)    │◄──────┤    reactions      │   │
│ user_id (FK)     │       ├───────────────────┤   │
│ title            │       │ id (PK, UUID)     │   │
│ url              │       │ project_id (FK)   │   │
│ description      │       │ user_id (FK)      ├───┘
│ created_at       │       │ reaction_type     │
│ updated_at       │       │ created_at        │
└────────┬─────────┘       └───────────────────┘
         │ 1
         │
         │ N
┌────────▼─────────┐       ┌───────────────────┐
│     comments     │       │ ENUM              │
├──────────────────┤       ├───────────────────┤
│ id (PK, UUID)    │       │ reaction_type:    │
│ project_id (FK)  │       │  'like'           │
│ user_id (FK)     │       │  'dislike'        │
│ content          │       └───────────────────┘
│ created_at       │
│ updated_at       │
└──────────────────┘
```

---

## Authentication Design

### Flow: Email/Password

```
User submits email + password
        │
        ▼
Supabase Auth validates credentials
        │
        ├─── Invalid ──► Return error (no account info leaked)
        │
        ▼ Valid
JWT access token issued (1 hour expiry)
JWT refresh token issued (stored in httpOnly cookie by Supabase)
        │
        ▼
supabase.auth.onAuthStateChange fires
        │
        ▼
AuthContext updates user + session state
        │
        ▼
React Router redirects to intended destination
```

### Flow: Google OAuth

```
User clicks "Continue with Google"
        │
        ▼
supabase.auth.signInWithOAuth({ provider: 'google' })
        │
        ▼
Redirect to Google OAuth consent screen
        │
        ▼
Google redirects to /auth/callback?code=...
        │
        ▼
AuthCallback page exchanges code for session
        │
        ▼
supabase.auth.exchangeCodeForSession(code)
        │
        ▼
Session stored; user redirected to /
```

### Session Management

- Supabase handles access token refresh automatically via `supabase-js`
- `onAuthStateChange` listener set up in AuthContext on app mount
- Session persisted in localStorage by Supabase (configurable)
- On 401 from any API call → clear session → redirect to /login

### Username Assignment

New users via OAuth won't have a username set. On first login:

```
User created via OAuth
        │
        ▼
Check users table for username column
        │
        ├── username IS NULL ──► Redirect to /onboarding
        │                        (username setup page)
        │
        └── username EXISTS ──► Normal flow
```

---

## Authorization Rules

All authorization is enforced at the database level via Row Level Security.

### RLS Policy Matrix

| Table | Operation | Policy |
|-------|-----------|--------|
| users | SELECT | Public (anyone can view profiles) |
| users | INSERT | `auth.uid() = id` (Supabase handles via trigger) |
| users | UPDATE | `auth.uid() = id` (own row only) |
| users | DELETE | Never (soft-delete only, Phase 2) |
| projects | SELECT | Public |
| projects | INSERT | `auth.uid() IS NOT NULL` (any authenticated user) |
| projects | UPDATE | `auth.uid() = user_id` (own projects only) |
| projects | DELETE | `auth.uid() = user_id` (own projects only) |
| reactions | SELECT | Public |
| reactions | INSERT | `auth.uid() IS NOT NULL AND auth.uid() != (SELECT user_id FROM projects WHERE id = project_id)` |
| reactions | UPDATE | `auth.uid() = user_id` |
| reactions | DELETE | `auth.uid() = user_id` |
| comments | SELECT | Public |
| comments | INSERT | `auth.uid() IS NOT NULL` |
| comments | UPDATE | `auth.uid() = user_id` |
| comments | DELETE | `auth.uid() = user_id` |

### RLS SQL Implementation

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- PROJECTS policies
CREATE POLICY "Projects are publicly readable" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- REACTIONS policies
CREATE POLICY "Reactions are publicly readable" ON reactions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can react (not own projects)" ON reactions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    auth.uid() != (SELECT user_id FROM projects WHERE id = project_id)
  );

CREATE POLICY "Users can delete their own reactions" ON reactions
  FOR DELETE USING (auth.uid() = user_id);

-- COMMENTS policies
CREATE POLICY "Comments are publicly readable" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);
```

---

## Database Schema

### Table: `users`

This table is separate from `auth.users`. It stores public profile data. A trigger syncs new `auth.users` entries to this table.

```sql
CREATE TABLE users (
  id            UUID          PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT          UNIQUE NOT NULL,
  display_name  TEXT,
  bio           TEXT          CHECK (char_length(bio) <= 300),
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Constraints
ALTER TABLE users ADD CONSTRAINT username_format 
  CHECK (username ~ '^[a-zA-Z0-9_-]{3,30}$');

-- Indexes
CREATE INDEX idx_users_username ON users(username);

-- Updated_at trigger
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Sync trigger: auto-create users row when auth.users created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

| Column | Type | Nullable | Constraints | Description |
|--------|------|----------|-------------|-------------|
| `id` | UUID | NOT NULL | PK, FK auth.users | Matches Supabase Auth user ID |
| `username` | TEXT | NOT NULL | UNIQUE, 3-30 chars, alphanumeric/underscore/hyphen | Public handle |
| `display_name` | TEXT | NULL | max 100 chars | Display name (defaults to email name) |
| `bio` | TEXT | NULL | max 300 chars | Short bio |
| `avatar_url` | TEXT | NULL | Valid URL | Profile picture URL |
| `created_at` | TIMESTAMPTZ | NOT NULL | DEFAULT NOW() | Account creation time |
| `updated_at` | TIMESTAMPTZ | NOT NULL | DEFAULT NOW(), auto-updated | Last profile update |

---

### Table: `projects`

```sql
CREATE TABLE projects (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         TEXT          NOT NULL CHECK (char_length(title) BETWEEN 5 AND 100),
  url           TEXT          NOT NULL CHECK (url ~ '^https?://'),
  description   TEXT          NOT NULL CHECK (char_length(description) BETWEEN 20 AND 500),
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Updated_at trigger
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Unique URL per user
ALTER TABLE projects ADD CONSTRAINT unique_url_per_user 
  UNIQUE (user_id, url);
```

| Column | Type | Nullable | Constraints | Description |
|--------|------|----------|-------------|-------------|
| `id` | UUID | NOT NULL | PK, DEFAULT gen_random_uuid() | Project identifier |
| `user_id` | UUID | NOT NULL | FK → users.id, CASCADE | Project author |
| `title` | TEXT | NOT NULL | 5–100 characters | Project name |
| `url` | TEXT | NOT NULL | Valid http/https URL | Live project link |
| `description` | TEXT | NOT NULL | 20–500 characters | What the project does |
| `created_at` | TIMESTAMPTZ | NOT NULL | DEFAULT NOW() | Submission time |
| `updated_at` | TIMESTAMPTZ | NOT NULL | DEFAULT NOW() | Last edit time |

---

### Table: `reactions`

```sql
CREATE TYPE reaction_type_enum AS ENUM ('like', 'dislike');

CREATE TABLE reactions (
  id              UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID                NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id         UUID                NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_type   reaction_type_enum  NOT NULL,
  created_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),

  UNIQUE (project_id, user_id)  -- One reaction per user per project
);

-- Indexes
CREATE INDEX idx_reactions_project_id ON reactions(project_id);
CREATE INDEX idx_reactions_user_id ON reactions(user_id);

-- Self-reaction prevention trigger
CREATE TRIGGER check_self_reaction
  BEFORE INSERT ON reactions
  FOR EACH ROW EXECUTE FUNCTION prevent_self_reaction();
```

| Column | Type | Nullable | Constraints | Description |
|--------|------|----------|-------------|-------------|
| `id` | UUID | NOT NULL | PK | Reaction identifier |
| `project_id` | UUID | NOT NULL | FK → projects.id, CASCADE | Reacted project |
| `user_id` | UUID | NOT NULL | FK → users.id, CASCADE | Who reacted |
| `reaction_type` | ENUM | NOT NULL | 'like' or 'dislike' | Reaction value |
| `created_at` | TIMESTAMPTZ | NOT NULL | DEFAULT NOW() | Reaction time |

**UNIQUE(project_id, user_id)** — Enforces one reaction per user per project at the database level.

---

### Table: `comments`

```sql
CREATE TABLE comments (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID          NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id     UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content     TEXT          NOT NULL CHECK (char_length(content) BETWEEN 1 AND 500),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_comments_project_id ON comments(project_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at ASC);

-- Updated_at trigger
CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
```

| Column | Type | Nullable | Constraints | Description |
|--------|------|----------|-------------|-------------|
| `id` | UUID | NOT NULL | PK | Comment identifier |
| `project_id` | UUID | NOT NULL | FK → projects.id, CASCADE | Parent project |
| `user_id` | UUID | NOT NULL | FK → users.id, CASCADE | Comment author |
| `content` | TEXT | NOT NULL | 1–500 characters | Comment text |
| `created_at` | TIMESTAMPTZ | NOT NULL | DEFAULT NOW() | Posted time |
| `updated_at` | TIMESTAMPTZ | NOT NULL | DEFAULT NOW() | Last edit time |

---

## API Structure

The Supabase JS client abstracts REST calls. Below are the logical API operations and the Supabase calls that implement them.

### Projects API

```javascript
// GET /projects — Fetch paginated feed
const { data, error } = await supabase
  .from('projects')
  .select(`
    id, title, url, description, created_at,
    user:users(id, username, display_name, avatar_url),
    reactions(reaction_type),
    comments(id)
  `)
  .order('created_at', { ascending: false })
  .range(0, 19); // Pagination: page * 20 to (page+1) * 20 - 1

// GET /projects/:id — Fetch single project with all data
const { data, error } = await supabase
  .from('projects')
  .select(`
    id, title, url, description, created_at, updated_at,
    user:users(id, username, display_name, avatar_url),
    reactions(id, user_id, reaction_type),
    comments(
      id, content, created_at,
      user:users(id, username, display_name, avatar_url)
    )
  `)
  .eq('id', projectId)
  .single();

// POST /projects — Submit a project
const { data, error } = await supabase
  .from('projects')
  .insert({
    title,
    url,
    description,
    user_id: session.user.id
  })
  .select()
  .single();

// PATCH /projects/:id — Edit a project
const { data, error } = await supabase
  .from('projects')
  .update({ title, url, description })
  .eq('id', projectId)
  .select()
  .single();

// DELETE /projects/:id
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

### Reactions API

```javascript
// GET reaction for current user on a project
const { data } = await supabase
  .from('reactions')
  .select('id, reaction_type')
  .eq('project_id', projectId)
  .eq('user_id', userId)
  .maybeSingle();

// POST reaction (like or dislike)
const { error } = await supabase
  .from('reactions')
  .upsert({
    project_id: projectId,
    user_id: userId,
    reaction_type: 'like' | 'dislike'
  }, { onConflict: 'project_id,user_id' });

// DELETE reaction (toggle off)
const { error } = await supabase
  .from('reactions')
  .delete()
  .eq('project_id', projectId)
  .eq('user_id', userId);
```

### Comments API

```javascript
// GET comments for a project (included in project detail query above)

// POST comment
const { data, error } = await supabase
  .from('comments')
  .insert({
    project_id: projectId,
    user_id: userId,
    content: content.trim()
  })
  .select(`
    id, content, created_at,
    user:users(id, username, display_name, avatar_url)
  `)
  .single();

// DELETE comment
const { error } = await supabase
  .from('comments')
  .delete()
  .eq('id', commentId);
```

### Leaderboard API

```javascript
// Via RPC function
const { data, error } = await supabase
  .rpc('get_leaderboard');
```

### User Profile API

```javascript
// GET profile by username
const { data, error } = await supabase
  .from('users')
  .select(`
    id, username, display_name, bio, avatar_url, created_at,
    projects(id, title, url, description, created_at, reactions(reaction_type))
  `)
  .eq('username', username)
  .single();

// UPDATE own profile
const { error } = await supabase
  .from('users')
  .update({ display_name, bio })
  .eq('id', userId);
```

---

## Security Requirements

### Input Validation (Client-Side)

```javascript
// validators.js
export const projectSchema = {
  title: { min: 5, max: 100, required: true },
  url: { pattern: /^https?:\/\/.+\..+/, required: true },
  description: { min: 20, max: 500, required: true }
};

export const commentSchema = {
  content: { min: 1, max: 500, required: true }
};

export const usernameSchema = {
  username: { min: 3, max: 30, pattern: /^[a-zA-Z0-9_-]+$/ }
};
```

### Input Sanitization (Database-Level)

- All text fields have `CHECK` constraints with `char_length` limits
- URL field validates `https?://` prefix via regex CHECK constraint
- React's JSX auto-escapes all rendered text (no `dangerouslySetInnerHTML`)

### Environment Variables

```bash
# .env.local (NEVER commit this file)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# .env.example (commit this file — no real values)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** The `anon` key is safe to expose in client-side code. Supabase RLS policies enforce all access control. The `service_role` key is NEVER used in frontend code.

### Security Headers (via `vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'"
        }
      ]
    }
  ]
}
```

---

## Performance Requirements

### Targets

| Metric | Target | Implementation |
|--------|--------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | Static hosting on Vercel CDN |
| FID (First Input Delay) | < 100ms | Minimal JS bundle; no heavy libraries |
| CLS (Cumulative Layout Shift) | < 0.1 | Skeleton loaders; explicit image dimensions |
| Bundle size (gzipped) | < 150KB | Code splitting by route |
| Feed query time | < 200ms | Indexed queries + Supabase edge |
| Reaction update | < 200ms | Optimistic UI + background sync |

### Implementation Strategies

**Code Splitting:**
```javascript
// App.jsx — lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Profile = lazy(() => import('./pages/Profile'));
```

**TanStack Query Caching:**
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,        // 1 minute
      cacheTime: 5 * 60 * 1000,    // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});
```

**Optimistic Updates (Reactions):**
```javascript
const { mutate: toggleReaction } = useMutation({
  mutationFn: (type) => reactionService.toggle(projectId, userId, type),
  onMutate: async (type) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['project', projectId]);
    // Snapshot previous value
    const previous = queryClient.getQueryData(['project', projectId]);
    // Optimistically update
    queryClient.setQueryData(['project', projectId], (old) => ({
      ...old,
      reactions: computeOptimisticReactions(old.reactions, userId, type)
    }));
    return { previous };
  },
  onError: (err, type, context) => {
    queryClient.setQueryData(['project', projectId], context.previous);
  }
});
```

---

## Scalability Considerations

### Current Architecture Limits (Free Tier)

| Resource | Supabase Free Limit | Expected Usage (Month 1) | Buffer |
|----------|--------------------|-----------------------|--------|
| Database size | 500 MB | ~5 MB | 100x |
| Monthly active users (Auth) | 50,000 | ~500 | 100x |
| Bandwidth | 5 GB | ~500 MB | 10x |
| API requests | 500K/month | ~100K | 5x |

### Database Scalability

- All foreign keys have indexes
- Leaderboard uses a server-side RPC function to avoid N+1 queries
- Feed query uses a single join query (not multiple round trips)
- Reaction counts are computed from `reactions` table aggregation (not cached counters) — acceptable at this scale

### When to Upgrade

Trigger points for moving off free tier:

- MAU > 5,000 (auth limit)
- DB size > 400 MB
- Response time degradation > 500ms for common queries
- Bandwidth > 4 GB/month

---

## Free Tier Considerations

### Supabase Free Tier Constraints

| Constraint | Impact | Mitigation |
|-----------|--------|-----------|
| Project paused after 7 days inactivity | Data loss risk | Set up a simple cron ping (e.g., via GitHub Actions) to keep the project active |
| 2 projects max | Use 1 for prod, 1 for staging | Fine for launch |
| No Point-in-Time Recovery | Manual backup needed | Export DB via Supabase dashboard weekly |
| 500MB DB | More than enough for year 1 | Monitor weekly |

### Keeping Supabase Active

```yaml
# .github/workflows/keep-alive.yml
name: Keep Supabase Active
on:
  schedule:
    - cron: '0 12 * * 1'  # Every Monday at noon UTC
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl -s "${{ secrets.SUPABASE_URL }}/rest/v1/projects?select=id&limit=1" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}"
```

### Vercel Free Tier Constraints

| Constraint | Impact | Mitigation |
|-----------|--------|-----------|
| 100GB bandwidth | Sufficient for early stage | Monitor in Vercel dashboard |
| Serverless function timeout: 10s | We use no serverless functions | N/A |
| Build time: 45 min/month | Vite builds are fast (~30s) | Approximately 90 deploys before hitting limit |

---

## Error Handling Strategy

### Error Classification

```javascript
// lib/errors.js
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION: 'VALIDATION_ERROR',
  PERMISSION: 'PERMISSION_DENIED',
  DUPLICATE: 'DUPLICATE_ERROR',
  SERVER: 'SERVER_ERROR'
};

export function classifySupabaseError(error) {
  if (!error) return null;
  
  const code = error.code;
  const message = error.message;

  if (code === '42501') return ErrorTypes.PERMISSION;
  if (code === '23505') return ErrorTypes.DUPLICATE;
  if (code === '23514') return ErrorTypes.VALIDATION;
  if (message?.includes('JWT')) return ErrorTypes.AUTH;
  if (message?.includes('NetworkError')) return ErrorTypes.NETWORK;
  
  return ErrorTypes.SERVER;
}
```

### Error UI Patterns

| Error Type | User Message | Action |
|-----------|-------------|--------|
| `NETWORK` | "Can't connect. Check your internet." | Retry button |
| `AUTH` | "Sign in to do that." | Redirect to /login |
| `NOT_FOUND` | "This page doesn't exist." | Link to home |
| `VALIDATION` | Field-specific inline error | Highlight field |
| `PERMISSION` | "You don't have permission for that." | No retry |
| `DUPLICATE` | "You've already submitted this URL." | Clear URL field |
| `SERVER` | "Something went wrong. Try again." | Retry button |

### React Error Boundary

```jsx
// components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
    // Phase 2: Send to error tracking (Sentry free tier)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Global 401 Handler

```javascript
// lib/supabase.js
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !session) {
    queryClient.clear();
    navigate('/login');
  }
});
```

---

## Deployment Architecture

### Git-Based Deploy Flow

```
Developer pushes to main branch
           │
           ▼
GitHub (source of truth)
           │
           ▼
Vercel CI detects push to main
           │
           ▼
Vite build runs (NODE_ENV=production)
  - Tree-shaking
  - Code splitting
  - Asset optimization
           │
           ▼
Build output deployed to Vercel Edge Network
           │
           ▼
Production URL updated (vibecoders.app)
```

### `vercel.json` Configuration

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

### `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          query: ['@tanstack/react-query']
        }
      }
    }
  }
});
```

### Environment Setup

```
.env.local          → Local development (gitignored)
Vercel Project UI   → Production environment variables
  VITE_SUPABASE_URL
  VITE_SUPABASE_ANON_KEY
```

---

## Monitoring Strategy

### Free Tier Monitoring Stack

| Tool | Purpose | Cost |
|------|---------|------|
| Vercel Analytics | Web vitals, page performance | Free |
| Plausible Cloud (free trial) or Umami (self-hosted) | Privacy-first page views | Free |
| Supabase Dashboard | DB query performance, auth events | Free |
| GitHub Actions | Keep-alive pings + basic uptime | Free |

### Key Metrics to Monitor

- **Supabase:** DB size, active connections, slow query log
- **Vercel:** Build success rate, 4xx/5xx error rate, edge function invocations
- **Frontend:** Core Web Vitals via Vercel Analytics
- **Product:** DAU/WAU/MAU via Plausible/Umami

### Alerting

At MVP, monitoring is manual (check dashboards weekly). Phase 2 will add:
- Uptime Robot (free) for 5-minute uptime checks
- Sentry (free tier) for JavaScript error tracking

---

## Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Supabase free tier paused | Medium | Critical | GitHub Actions keep-alive weekly ping |
| RLS misconfiguration exposes data | Low | Critical | Thorough RLS testing with anon key before launch; test with PostgREST directly |
| N+1 query performance issues at scale | Medium | Medium | Pre-join all required data in single queries |
| Supabase Realtime instability | Low | Low | Realtime not used at MVP; rely on polling/refetch |
| Auth token not refreshing silently | Medium | Medium | Implement `onAuthStateChange` listener; test token expiry manually |
| XSS via URL field rendering | Low | High | Never `dangerouslySetInnerHTML` with user data; validate URLs in DB |
| Username collisions in OAuth flow | Low | Medium | Handle gracefully with onboarding page; show conflict error |

---

## Future Technical Roadmap

### Phase 2 Technical Additions

| Feature | Technical Approach |
|---------|------------------|
| Full-text search | `to_tsvector` + `to_tsquery` in PostgreSQL; add `search_vector` column with GIN index |
| Email notifications | Supabase Database Webhooks → Resend API (free 100 emails/day) |
| Profile image upload | Supabase Storage bucket with RLS; resize via Supabase Edge Functions |
| Trending algorithm | PostgreSQL view computing `score / (age_hours + 2)^1.5` (HN-style) |
| Comment threading | Add `parent_id UUID REFERENCES comments(id)` column; fetch with recursive CTE |

### Phase 3 Technical Additions

| Feature | Technical Approach |
|---------|------------------|
| Follow system | New `follows` table (follower_id, following_id); feed filtered by follows |
| Collections | New `collections` + `collection_projects` tables |
| Weekly digest | Supabase Cron (pg_cron extension) → trigger Edge Function → Resend batch email |

### Migration Strategy

All schema changes use numbered SQL migration files:

```
supabase/migrations/
├── 20260101000000_initial_schema.sql
├── 20260201000000_add_search_vector.sql
└── 20260301000000_add_follows_table.sql
```

Applied via Supabase CLI: `supabase db push`
