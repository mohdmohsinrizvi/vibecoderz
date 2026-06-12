# VibeCoderz

[![CI Build](https://github.com/mohdmohsinrizvi/vibecoderz/actions/workflows/ci.yml/badge.svg)](https://github.com/mohdmohsinrizvi/vibecoderz/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg)](https://vite.dev/)

VibeCoderz is a premium developer community showcase platform where builders share their projects, receive real-time reactions and honest feedback, and build their reputation. 

Unlike general-purpose product hubs, VibeCoderz rewards the craft itself. Every project gets equal initial visibility on a modern feed, and creator progression is gamified through an interactive global leaderboard.

---

## ⚡ Features

- **Dynamic Project Feed**: A modern, bento-grid styled chronological project feed featuring tags, author summaries, and real-time upvotes.
- **Rich Reaction Bar**: Multi-faceted builder signals (Upvote, Ship, Fire, Mindblown) with stateful local tracking and Supabase sync.
- **Interactive Leaderboards**: A gamified builder ranking based on cumulative project upvotes and submission velocity, complete with real-time updates.
- **Visual Design & Dark/Light Themes**: Glassmorphic elements, ambient glowing layouts, and smooth micro-animations.
- **PWA Capabilities**: Standalone mobile launcher compatibility, custom apple touch icons, and offline manifests.
- **SEO Optimization**: Structured metatags, custom OpenGraph social previews, and dynamic page titles.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19 (Hooks, Suspense, Error Boundaries)
- **Tooling & Dev Server**: Vite 8 & Rollup
- **Styling Engine**: Tailwind CSS v4 (Native Theme Engine)
- **Routing**: React Router v7
- **State & Data Fetching**: TanStack React Query v5
- **Backend & Realtime**: Supabase (Database, Storage Buckets, Auth, Row Level Security)

---

## 🚀 Installation & Local Development

### Prerequisites

Ensure you have Node.js (v18.x or later) and npm (v10.x or later) installed.

### 1. Clone the Repository

```bash
git clone git@github.com:mohdmohsinrizvi/vibecoderz.git
cd vibecoderz
```

### 2. Install Dependencies

Navigate to the application folder and install package modules:

```bash
cd vibecoders-app
npm install
```

### 3. Environment Variable Setup

Create a `.env.local` file inside the `vibecoders-app` directory:

```bash
# vibecoders-app/.env.local
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Run the Development Server

Start Vite dev server:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 5. Build for Production

Compile production bundles:

```bash
npm run build
```

---

## 🔒 Environment Variables

| Variable Name | Description | Required |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | The public endpoint URL of your Supabase project instances. | Yes |
| `VITE_SUPABASE_ANON_KEY` | The anonymous public key used for client authentication. | Yes |

---

## 🌐 Deployment

This application is ready to be hosted on Vercel, Netlify, or AWS Amplify:
1. Link your GitHub fork or repository.
2. Select `vibecoders-app` as the root directory of the build step.
3. Configure the build command as `npm run build` and output directory as `dist`.
4. Inject your environment variables (`VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`).

---

## 🗺️ Roadmap

Our detailed feature roadmap is defined in [ROADMAP.md](./ROADMAP.md). Highlights include:
- [x] Multi-reactions upvoting pipeline
- [x] Live global leaderboards
- [ ] Direct builder messaging / thread channels
- [ ] Custom builder portfolio domains

---

## 🤝 Contributing

We welcome contributions from builders of all skill levels! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) to understand our coding standards, branch naming rules, and pull request workflows.

---

## 👑 Founder

VibeCoderz was created and is maintained by **[Mohd Mohsin](https://github.com/mohdmohsinrizvi)**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
