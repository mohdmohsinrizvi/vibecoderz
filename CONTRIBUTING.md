# Contributing to VibeCoderz

Thank you for choosing to contribute to VibeCoderz! We are excited to build a premium developer community platform together. Please read this guide to understand how to get started.

---

## 🛠️ Local Development Setup

1. **Fork the Repository**: Fork the repository on GitHub and clone it locally:
   ```bash
   git clone git@github.com:your-username/vibecoderz.git
   cd vibecoderz
   ```
2. **Setup Remotes**: Set the upstream repository to track the main project:
   ```bash
   git remote add upstream git@github.com:mohdmohsinrizvi/vibecoderz.git
   ```
3. **Install Dependencies**: Navigate to the application root and install node packages:
   ```bash
   cd vibecoders-app
   npm install
   ```
4. **Environment Configuration**: Create a `.env.local` inside the `vibecoders-app/` directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. **Run Dev Server**: Launch the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🌿 Branch Naming Conventions

Use lowercase branch names prefixed with one of the following category identifiers:

- `feature/` — For new features (e.g., `feature/direct-messages`)
- `bugfix/` — For fixing bug reports (e.g., `bugfix/profile-avatar-overflow`)
- `refactor/` — For code cleanups and structural improvements (e.g., `refactor/reaction-state`)
- `docs/` — For documentation updates (e.g., `docs/api-endpoints`)
- `ci/` — For GitHub Action changes (e.g., `ci/add-lint-step`)
- `hotfix/` — For quick urgent fixes directly in production

---

## 📝 Commit Conventions

We strictly follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

Format: `<type>(<scope>): <description>`

### Standard Types:
- `feat`: A new user-facing feature (e.g., `feat(auth): add email OTP confirmation`)
- `fix`: A bug fix (e.g., `fix(feed): align grid cards on small screen sizes`)
- `docs`: Documentation edits (e.g., `docs: update roadmap features`)
- `style`: Visual layout formatting, spacing, and styling updates (e.g., `style: tweak brand button glows`)
- `refactor`: Restructuring code files without altering behavior (e.g., `refactor(db): streamline query filters`)
- `chore`: Maintenance tasks (e.g., `chore: bump dependency versions`)
- `ci`: CI workflows and configs (e.g., `ci: configure project build runner`)

---

## 🔄 Pull Request Workflow

1. **Create your Branch**: Always create branches from the latest upstream `main` branch.
2. **Keep it Small**: Focus each PR on one objective. Do not bundle unrelated changes.
3. **Lint & Build Locally**: Verify everything builds cleanly without errors before pushing:
   ```bash
   npm run lint
   npm run build
   ```
4. **Push & Create PR**: Push your branch to your fork and open a Pull Request.
5. **Fill the PR Template**: Use the standard PR template, detail changes, and attach screenshots for UI edits.
6. **Pass CI checks**: Ensure your branch passes the automated linting and building workflows.

---

## 🎨 Coding & UI Standards

### React Components
- Use functional React components with standard ES6 syntax.
- Extract reusable logic into custom hooks (`src/hooks/`).
- Handle loading, empty states, and errors gracefully using boundary blocks.

### CSS & Styling
- Use the unified Tailwind CSS token utilities defined in `src/index.css` (e.g., `bg-bg-base`, `text-text-primary`, `border-border-subtle`).
- Maintain consistent layouts using modern CSS Flexbox and CSS Grid.
- Ensure all interactive elements have hover and focus transition animations.

### Accessibility (a11y)
- Write semantic HTML5 tags (`<main>`, `<header>`, `<nav>`, `<footer>`).
- Provide alternative text (`alt`) on all images and standard `aria-label` tags on icon-only buttons.
