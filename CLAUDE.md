# Les Misérables 2026 Singapore — Fan Microsite

## Project Overview

A mobile-first, bilingual (English/中文) fan microsite for *Les Misérables: The Arena Spectacular* at Sands Theatre, Marina Bay Sands, Singapore (24 March – 10 May 2026). Single-page static site highlighting the Singapore production's unique casting of Lea Salonga and Nathania Ong.

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS with `darkMode: 'class'`
- **Animation:** Framer Motion (`AnimatePresence`, `motion.div`)
- **i18n:** Custom `LanguageContext` — typed `Bilingual` objects, no external library
- **Deployment:** Static build (`vite build` → `dist/`), GitHub Pages or Netlify

## Project Structure

```
src/
  components/       # React components (Nav, HeroSection, CastSection, etc.)
  contexts/         # ThemeContext, LanguageContext
  data/             # Static data: cast.ts, songs.ts, highlights.ts, types.ts
docs/
  superpowers/specs/  # Design spec (les-miserables-site-design.md)
```

## Key Architecture Decisions

- **Single page, no router.** All sections render on one page; cast detail panel opens/closes via React state.
- **Bilingual content is co-located.** Every user-visible string is a `Bilingual` object (`{ en: string; zh: string }`) consumed via `t()` from `LanguageContext`. No separate JSON translation files.
- **Dark mode default.** Tailwind `dark:` classes handle all theming. The `dark` class toggles on `<html>`.
- **Responsive breakpoint at 1024px.** Below: mobile/tablet layout with hamburger nav and bottom-sheet detail panel. At/above: desktop layout with inline nav and right-sidebar detail panel.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Design Tokens

| Token      | Dark             | Light            |
|------------|------------------|------------------|
| Background | `#111318`        | `#f4f2ee`        |
| Surface    | `#1a1e24`        | `#ffffff`        |
| Accent     | `#7ab8d4`        | `#4a8faa`        |
| Text       | `#e8eef2`        | `#1a1e24`        |

Accent color is steel blue. Full token table in the design spec.

## Data Model

- **9 cast members** — 2 featured (Lea Salonga, Nathania Ong) + 7 standard
- **10 songs** — iconic numbers with character attribution and act
- **3 highlights** — Triple Crown, Homecoming, Arena Spectacular

Types defined in `src/data/types.ts`. Spec: `docs/superpowers/specs/les-miserables-site-design.md`.

## Coding Conventions

- All component text goes through `t()` from `useLanguage()` — never hardcode display strings
- Use Tailwind utility classes; use `dark:` prefix for dark-mode variants
- Framer Motion for all animations; respect `prefers-reduced-motion`
- Accessibility: keyboard nav, focus trapping in panels, ARIA labels, Escape to close
- No external fonts that block render (`font-display: swap`)
