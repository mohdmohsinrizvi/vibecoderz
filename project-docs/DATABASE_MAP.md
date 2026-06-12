# DATABASE_MAP.md

## Tables

### users
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK, FK auth.users, CASCADE | Matches Supabase Auth user ID |
| username | TEXT | UNIQUE, NOT NULL, 3-30 chars, regex | Public handle |
| display_name | TEXT | NULL, max 100 chars | Display name |
| bio | TEXT | NULL, max 300 chars | Short bio |
| avatar_url | TEXT | NULL | Profile picture URL |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Account creation |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update |

### projects
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Project ID |
| user_id | UUID | NOT NULL, FK users.id, CASCADE | Author |
| title | TEXT | NOT NULL, 5-100 chars | Project name |
| url | TEXT | NOT NULL, valid URL | Live project link |
| description | TEXT | NOT NULL, 20-500 chars | What it does |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Submission time |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last edit |

UNIQUE(user_id, url) — one URL per user

### reactions
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Reaction ID |
| project_id | UUID | NOT NULL, FK projects.id, CASCADE | Reacted project |
| user_id | UUID | NOT NULL, FK users.id, CASCADE | Who reacted |
| reaction_type | ENUM('like','dislike') | NOT NULL | Reaction value |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Reaction time |

UNIQUE(project_id, user_id) — one reaction per user per project

### comments
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Comment ID |
| project_id | UUID | NOT NULL, FK projects.id, CASCADE | Parent project |
| user_id | UUID | NOT NULL, FK users.id, CASCADE | Author |
| content | TEXT | NOT NULL, 1-500 chars | Comment text |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Posted time |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last edit |

## Relationships
```
users 1──N projects
users 1──N reactions
users 1──N comments
projects 1──N reactions
projects 1──N comments
```

## Key Functions
- `get_leaderboard()` — Top 50 builders by net score
- `get_project_score(project_id)` — Net score for single project
- `handle_new_user()` — Auto-create users row from auth.users
- `prevent_self_reaction()` — Block self-reactions
- `handle_updated_at()` — Auto-update updated_at

## Indexes
- idx_users_username
- idx_projects_user_id, idx_projects_created_at
- idx_reactions_project_id, idx_reactions_user_id
- idx_comments_project_id, idx_comments_user_id, idx_comments_created_at
