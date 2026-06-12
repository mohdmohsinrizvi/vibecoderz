# DECISIONS.md

## D-01: No Custom Backend
- **Problem**: How to handle API and auth?
- **Options**: Express.js server, Next.js API routes, Supabase direct
- **Decision**: Supabase direct (no custom server)
- **Reasoning**: Eliminates server cost, free tier sufficient, RLS handles auth

## D-02: SPA over SSR
- **Problem**: Rendering strategy?
- **Options**: Next.js SSR, Vite SPA, Remix
- **Decision**: Vite + React SPA
- **Reasoning**: Fast dev experience, SEO acceptable for community platform, simpler deployment

## D-03: Tailwind CSS
- **Problem**: Styling approach?
- **Options**: CSS Modules, Styled Components, Tailwind, Vanilla CSS
- **Decision**: Tailwind CSS
- **Reasoning**: Fast iteration, consistent design system, dark mode support, no CSS-in-JS overhead

## D-04: TanStack Query
- **Problem**: Server state management?
- **Options**: Redux, Zustand, TanStack Query, SWR
- **Decision**: TanStack Query
- **Reasoning**: Built for server state, caching, optimistic updates, minimal boilerplate

## D-05: Single Column Feed
- **Problem**: Feed layout?
- **Options**: Grid layout, Single column, Masonry
- **Decision**: Single column, max-width 720px
- **Reasoning**: Reading experience, editorial feel, faster scan, mobile-first

## D-06: Monochromatic + Single Accent
- **Problem**: Color strategy?
- **Options**: Multi-color palette, Monochromatic, Duotone
- **Decision**: Monochromatic + single indigo accent (#4F6EF7)
- **Reasoning**: Reduces cognitive load, signals technical credibility, distinct from competitors
