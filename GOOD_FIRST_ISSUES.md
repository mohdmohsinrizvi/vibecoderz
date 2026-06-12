# Good First Issues

Looking to make your first contribution to VibeCoderz? Here is a curated list of tasks that are excellent starting points. If you want to work on any of these, feel free to open an issue or submit a Pull Request directly!

---

## 🎨 UI & Layout Tweaks

### 1. Improve Empty States
- **Description**: Currently, when no projects match a feed category or user profile filter, the empty state displays plain text.
- **Task**: Replace with a polished, centered layout featuring a clean illustration or icon, and a "+ Submit Project" button for call-to-actions.
- **Difficulty**: Easy
- **Files**: `src/components/project/ProjectFeed.jsx`

### 2. Refine Mobile Spacing
- **Description**: Certain views (such as the Leaderboard page and Submission page) need padding adjustments on small screens (e.g., iPhone SE, 320px width).
- **Task**: Audit views on narrow widths, add responsive horizontal padding classes, and verify text wrapping.
- **Difficulty**: Easy
- **Files**: `src/pages/Leaderboard.jsx`, `src/pages/Submit.jsx`

---

## ⚡ Functionality & Accessibility

### 3. Add Keyboard Navigation to Reaction Bar
- **Description**: Ensure the project reaction buttons are fully accessible to keyboard users.
- **Task**: Verify that all reaction buttons are focusable (`tabindex="0"` or standard `<button>`), have appropriate hover styles on focus, and trigger on Space/Enter key presses.
- **Difficulty**: Medium
- **Files**: `src/components/project/ReactionBar.jsx`

### 4. Optimize Image Lazy Loading
- **Description**: Project card thumbnails and user avatars should load efficiently.
- **Task**: Ensure `loading="lazy"` tags are set on feed project thumbnails and fallback avatars.
- **Difficulty**: Easy
- **Files**: `src/components/project/ProjectCard.jsx`, `src/components/ui/Avatar.jsx`

---

## 🔒 Code Quality & Testing

### 5. Add Unit Tests for Date Formatting
- **Description**: Add unit test coverage for date utility formatting (e.g., `formatDistanceToNow` or similar).
- **Task**: Write unit tests verifying that timestamps are formatted correctly under edge cases (e.g., 1 minute ago, 1 year ago).
- **Difficulty**: Medium
- **Files**: `src/utils/date.js`
