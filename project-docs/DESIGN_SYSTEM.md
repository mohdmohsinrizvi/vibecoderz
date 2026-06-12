# DESIGN_SYSTEM.md

## Brand
- **Personality**: Focused, Honest, Fast, Understated, Builder-native
- **Voice**: Short sentences, active voice, never corporate
- **Differentiation**: Between GitHub (technical), Linear (premium), Raycast (dark-mode)

## Colors

### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| --bg-base | #FFFFFF | Page background |
| --bg-subtle | #F8F8F8 | Card backgrounds |
| --bg-muted | #F0F0F0 | Hover states |
| --bg-overlay | #E8E8E8 | Dividers |
| --text-primary | #111111 | Headings |
| --text-secondary | #555555 | Descriptions |
| --text-tertiary | #999999 | Timestamps |
| --border-subtle | #EBEBEB | Card borders |
| --border-default | #DDDDDD | Dividers |
| --accent | #4F6EF7 | Primary CTA |
| --accent-hover | #3D5CE6 | Hover accent |
| --accent-subtle | #EEF1FE | Accent bg |
| --success | #22C55E | Positive |
| --error | #EF4444 | Errors |
| --like | #4F6EF7 | Like active |
| --dislike | #777777 | Dislike active |

### Dark Theme
| Token | Value |
|-------|-------|
| --bg-base | #0C0C0C |
| --bg-subtle | #141414 |
| --bg-muted | #1C1C1C |
| --text-primary | #F0F0F0 |
| --text-secondary | #A0A0A0 |
| --accent | #6680F8 |

## Typography
- **Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono / ui-monospace
- **Scale**: 12px (xs) → 36px (3xl)
- **Body**: 15px, weight 400, line-height 1.6
- **Headings**: Negative tracking at ≥24px

## Spacing
4px base unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

## Layout
- Max-width: 720px (content), centered
- Header: 56px, sticky, backdrop-blur
- Single column feed (not grid)
- Mobile-first breakpoints: 640px, 768px, 1024px, 1280px

## Components
- **Buttons**: Primary (#4F6EF7), Secondary, Ghost, Destructive
- **Inputs**: bg-subtle, border-subtle, accent focus ring
- **Cards**: border-subtle, 10px radius, hover shadow
- **Reactions**: min 44px touch target, scale animation on click

## Motion
- --duration-fast: 120ms (button states)
- --duration-normal: 200ms (element appearances)
- --duration-slow: 300ms (page transitions)
- --ease-spring: cubic-bezier(0.32, 0.72, 0, 1) for modals

## Dark Mode
- Toggle via data-theme attribute on html
- Respect prefers-reduced-motion
- All colors via CSS custom properties
