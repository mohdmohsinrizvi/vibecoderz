# COMPONENT_MAP.md

## UI Primitives (components/ui/)
| Component | Purpose | Dependencies |
|-----------|---------|-------------|
| Button | Primary, secondary, ghost, destructive variants | None |
| Input | Text input with label, error, hint | None |
| Textarea | Multi-line input with char counter | None |
| Badge | Status/tag badges | None |
| Avatar | User avatar with fallback initials | None |
| Skeleton | Loading placeholder with shimmer | None |
| Modal | Dialog overlay with backdrop | None |
| Toast | Non-blocking notification | None |

## Layout (components/layout/)
| Component | Purpose | Dependencies |
|-----------|---------|-------------|
| Header | Sticky nav with auth state | useAuth, Link |
| Footer | Minimal footer | None |
| PageContainer | Content wrapper (max-width 720px) | None |

## Project (components/project/)
| Component | Purpose | Dependencies |
|-----------|---------|-------------|
| ProjectCard | Feed card with title, desc, meta | Link, Avatar, formatRelativeTime |
| ProjectFeed | Paginated list of cards | ProjectCard, useProjects |
| ProjectForm | Submit/edit form (3 fields) | Input, Textarea, Button, validators |
| ReactionBar | Like/dislike buttons with counts | useReactions, Button |

## Comment (components/comment/)
| Component | Purpose | Dependencies |
|-----------|---------|-------------|
| CommentList | List of comments | CommentItem |
| CommentItem | Single comment with delete | Avatar, Button, formatRelativeTime |
| CommentInput | Comment form (1-500 chars) | Textarea, Button |

## Leaderboard (components/leaderboard/)
| Component | Purpose | Dependencies |
|-----------|---------|-------------|
| LeaderboardTable | Ranked list of builders | Link, Skeleton |

## Pages (pages/)
| Page | Route | Purpose |
|------|-------|---------|
| Home | / | Feed page with project list |
| ProjectDetail | /projects/:id | Full project view + comments |
| Submit | /submit | Project submission form |
| Leaderboard | /leaderboard | Top 50 builders |
| Profile | /u/:username | User profile + projects |
| Login | /login | Email/Google sign in |
| Signup | /signup | Email registration |
| Onboarding | /onboarding | Username setup for OAuth |
| NotFound | * | 404 page |
