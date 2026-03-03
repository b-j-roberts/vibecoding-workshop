# Starknet USDC Dashboard — Styling Specification

## Design Philosophy

Dark-themed crypto dashboard with a clean, premium feel. Prioritizes readability and visual hierarchy — the data is the hero. Subtle depth through layered cards, restrained color use, and smooth micro-interactions create a polished impression without visual noise.

---

## Color Palette

### Base (Dark Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0a0b0f` | Page background |
| `bg-card` | `#12131a` | Card surfaces |
| `bg-card-hover` | `#1a1b25` | Card hover state |
| `bg-elevated` | `#1e1f2b` | Modals, dropdowns, tooltips |
| `border-default` | `#1f2133` | Card borders, dividers |
| `border-subtle` | `#161724` | Subtle separators |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#f0f0f5` | Headings, primary content |
| `text-secondary` | `#8b8ca0` | Labels, descriptions |
| `text-tertiary` | `#555670` | Timestamps, metadata |
| `text-inverse` | `#0a0b0f` | Text on light backgrounds |

### Accent — Starknet Blue

| Token | Value | Usage |
|-------|-------|-------|
| `accent` | `#3b82f6` | Primary actions, links, focus rings |
| `accent-light` | `#60a5fa` | Hover states on accent elements |
| `accent-muted` | `#1e3a5f` | Accent backgrounds (badges, chips) |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `success` | `#22c55e` | Positive metrics, incoming transfers |
| `success-muted` | `#14532d` | Success backgrounds |
| `warning` | `#f59e0b` | Whale alerts, caution states |
| `warning-muted` | `#451a03` | Warning backgrounds |
| `error` | `#ef4444` | Errors, failed transactions |
| `error-muted` | `#450a0a` | Error backgrounds |
| `info` | `#3b82f6` | Informational highlights |

---

## Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
```

- **Sans**: All UI text — headings, labels, descriptions
- **Mono**: Addresses, transaction hashes, numerical values, amounts

### Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `display` | 36px / 2.25rem | 700 | Hero metric (total supply) |
| `heading-lg` | 24px / 1.5rem | 600 | Section titles |
| `heading-sm` | 18px / 1.125rem | 600 | Card titles |
| `body` | 14px / 0.875rem | 400 | Default text |
| `body-sm` | 13px / 0.8125rem | 400 | Secondary content |
| `caption` | 12px / 0.75rem | 500 | Labels, timestamps |
| `mono-lg` | 20px / 1.25rem | 500 | Amounts, key metrics |
| `mono-sm` | 13px / 0.8125rem | 400 | Addresses, hashes |

### Line Heights

- Headings: 1.2
- Body text: 1.5
- Mono/data: 1.4

---

## Spacing & Layout

### Spacing Scale

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |

### Layout

- **Max content width**: 1200px
- **Container padding**: 24px (mobile: 16px)
- **Card grid**: CSS Grid, 1-3 columns responsive
- **Card gap**: 24px (mobile: 16px)

### Breakpoints

| Name | Width |
|------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Dashboard Layout

```
┌────────────────────────────────────────────┐
│  Header: Logo + Title + Last Updated       │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │        Total Supply (hero card)      │  │
│  │        $XXX,XXX,XXX.XX               │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  ┌───────────┐ ┌───────────┐ ┌──────────┐ │
│  │ Transfers │ │  Largest  │ │  Unique  │  │
│  │  (count)  │ │ Transfer  │ │ Addrs    │  │
│  └───────────┘ └───────────┘ └──────────┘  │
│                                            │
│  ┌──────────────────┐ ┌─────────────────┐  │
│  │  Transfer Feed   │ │  Whale Alerts   │  │
│  │  (scrollable)    │ │  (highlighted)  │  │
│  │                  │ │                 │  │
│  │  From → To  $amt │ │  🐋 $50,000    │  │
│  │  From → To  $amt │ │  🐋 $25,000    │  │
│  │  From → To  $amt │ │                 │  │
│  │  ...             │ │                 │  │
│  └──────────────────┘ └─────────────────┘  │
│                                            │
│  Footer: Powered by Starknet               │
└────────────────────────────────────────────┘
```

---

## Component Styling

### Cards

```css
background: var(--bg-card);
border: 1px solid var(--border-default);
border-radius: 12px;
padding: 24px;
```

- Hover: `background` transitions to `bg-card-hover`, border lightens slightly
- No box-shadow by default — depth comes from border + background contrast

### Stat Cards (small metrics)

```css
background: var(--bg-card);
border: 1px solid var(--border-default);
border-radius: 12px;
padding: 20px;
```

- Label in `caption` style, `text-secondary` color
- Value in `mono-lg` style, `text-primary` color

### Hero Card (Total Supply)

```css
background: linear-gradient(135deg, #12131a 0%, #1a1b2e 100%);
border: 1px solid var(--accent-muted);
border-radius: 16px;
padding: 32px;
```

- Subtle gradient background for emphasis
- Accent-tinted border to draw the eye
- Value in `display` size

### Transfer Row

```css
padding: 12px 16px;
border-bottom: 1px solid var(--border-subtle);
```

- Alternating subtle backgrounds optional
- Address displayed in `mono-sm`, truncated to `0x1234...5678`
- Amount right-aligned in `mono-lg`
- Whale transfers get `border-left: 3px solid var(--warning)` accent

### Whale Alert Card

```css
background: var(--warning-muted);
border: 1px solid color-mix(in srgb, var(--warning) 30%, transparent);
border-radius: 12px;
padding: 16px;
```

- Warning-tinted background and border
- Pulsing dot indicator for very recent alerts

### Buttons (if needed)

```css
/* Primary */
background: var(--accent);
color: white;
border-radius: 8px;
padding: 8px 16px;
font-weight: 500;
font-size: 14px;

/* Ghost */
background: transparent;
color: var(--text-secondary);
border: 1px solid var(--border-default);
```

---

## Motion & Animation

### Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| Background, border | 150ms | `ease-out` |
| Opacity | 200ms | `ease-out` |
| Transform | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

### Animations

- **New transfer row**: Slide in from top with fade (`translateY(-8px)` → `0`, `opacity: 0` → `1`, 300ms)
- **Whale alert pulse**: Subtle scale pulse on the indicator dot (`scale(1)` → `scale(1.2)` → `scale(1)`, 2s loop)
- **Number update**: Brief color flash (accent) when a metric value changes, fading back to primary over 500ms
- **Loading skeleton**: Gentle shimmer animation on placeholder blocks (`background-position` shift, 1.5s loop)

### Principles

- Animations serve function (drawing attention to new data), not decoration
- Keep durations under 300ms for interactive elements
- Use `prefers-reduced-motion` media query to disable non-essential animations

---

## Iconography

- **Style**: Outline / line icons, 1.5px stroke
- **Library**: Lucide React (lightweight, consistent, tree-shakeable)
- **Sizes**: 16px (inline), 20px (card icons), 24px (section headers)
- **Color**: Inherit from text color by default; semantic color for status icons

### Key Icons

| Context | Icon |
|---------|------|
| Total supply | `DollarSign` or `Coins` |
| Transfers | `ArrowLeftRight` |
| Whale alert | `AlertTriangle` or custom whale emoji |
| Refresh/live | `RefreshCw` with spin animation |
| Starknet | Starknet logo SVG |

---

## Shadows & Elevation

Minimal shadow use — depth primarily through background contrast and borders.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.3)` | Tooltips, small popups |
| `shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.4)` | Dropdown menus |
| `shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.5)` | Modals (if used) |
| `shadow-glow` | `0 0 20px rgba(59, 130, 246, 0.15)` | Accent glow on hero card |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Badges, chips, small elements |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards, panels |
| `radius-xl` | 16px | Hero card, modal |
| `radius-full` | 9999px | Avatars, dots, pills |
