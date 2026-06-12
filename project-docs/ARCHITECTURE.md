# ARCHITECTURE.md

## System Architecture
```
User Browser → React SPA (Vite) → Supabase JS Client → Supabase Platform
                                    ↓
                              PostgreSQL (RLS)
                              Supabase Auth
                              PostgREST API
```

No custom backend server. All business logic in React client, PostgreSQL functions/triggers, or Supabase RLS policies.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 6 |
| State (server) | TanStack Query 5 |
| State (global) | React Context (Auth only) |
| Auth | Supabase Auth |
| Database | PostgreSQL via Supabase |
| Hosting | Vercel (static) |
| Fonts | Inter (Google Fonts) |

## Folder Structure
```
vibecoders/
├── public/
├── src/
│   ├── assets/icons/
│   ├── components/
│   │   ├── ui/           # Button, Input, Textarea, Badge, Avatar, Skeleton, Modal
│   │   ├── layout/       # Header, Footer, PageContainer
│   │   ├── project/      # ProjectCard, ProjectFeed, ProjectForm, ReactionBar
│   │   ├── comment/      # CommentList, CommentItem, CommentInput
│   │   └── leaderboard/  # LeaderboardTable
│   ├── pages/            # Home, ProjectDetail, Submit, Leaderboard, Profile, Login, Signup, NotFound
│   ├── hooks/            # useAuth, useProjects, useReactions, useComments, useLeaderboard
│   ├── lib/              # supabase.js, utils.js, validators.js
│   ├── context/          # AuthContext.jsx
│   ├── styles/           # globals.css, tokens.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Routing
```
/                    → Home (Feed)
/projects/:id        → Project Detail
/submit              → Submit Project (auth required)
/leaderboard         → Leaderboard
/u/:username         → User Profile
/login               → Login
/signup              → Signup
/auth/callback       → OAuth callback handler
/onboarding          → Username setup (OAuth new users)
*                    → 404
```

## Data Flow
```
User Action → React Component → Supabase Client
           → Supabase Auth (JWT verification)
           → PostgREST (RLS policy check)
           → PostgreSQL (query execution)
           → Response → TanStack Query cache update
           → React re-render
```
