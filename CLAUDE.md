# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile-first, bilingual (English/中文) fan microsite for *Les Misérables: The Arena Spectacular* at Sands Theatre, Marina Bay Sands, Singapore (24 March – 10 May 2026). Single-page static site highlighting the Singapore production's unique casting of Lea Salonga and Nathania Ong.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check (tsc -b) + Vite production build → dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

Note: `npm run build` runs `tsc -b` first — TypeScript errors will fail the build.

## Architecture

**Single page, no router.** App → ThemeProvider → LanguageProvider → Layout. Layout renders all sections in order: Nav, HeroSection, HighlightsSection, CastSection, SongsSection, Footer. Cast detail opens as an overlay panel (bottom-sheet on mobile, right-sidebar on desktop ≥1024px) managed by React state in CastSection.

**Bilingual i18n without a library.** Every user-visible string is a `Bilingual` object (`{ en: string; zh: string }`) in `src/data/`. Components consume text via `const { t } = useLanguage()` then `t(bilingualObj)`. Language preference persists in localStorage. Never hardcode display strings.

**CSS variable-based theming.** Tailwind colors (`bg`, `surface`, `accent`, `foreground`, `muted`) map to CSS custom properties (`var(--color-bg)`, etc.) defined in the stylesheet — not hardcoded hex values. Theme toggles by adding/removing the `dark` class on `<html>`. Dark mode is the default. Use `dark:` prefix in Tailwind classes for dark-mode-specific styles.

**Accessibility pattern.** `focus-trap-react` wraps the CastDetailPanel for focus trapping. Escape key closes panels. Body scroll is locked when panel is open. All interactive elements need ARIA labels.

## Design Tokens

| Token      | Dark             | Light            |
|------------|------------------|------------------|
| Background | `#111318`        | `#f4f2ee`        |
| Surface    | `#1a1e24`        | `#ffffff`        |
| Accent     | `#7ab8d4`        | `#4a8faa`        |
| Text       | `#e8eef2`        | `#1a1e24`        |

Accent color is steel blue. Full token table in the design spec at `docs/superpowers/specs/les-miserables-site-design.md`.

## Data Model

- **9 cast members** — 2 featured (Lea Salonga, Nathania Ong) + 7 standard
- **10 songs** — iconic numbers with character attribution and act
- **3 highlights** — Triple Crown, Homecoming, Arena Spectacular

Types defined in `src/data/types.ts`. Cast members reference songs by ID string array.

## Coding Conventions

- All component text goes through `t()` from `useLanguage()` — never hardcode display strings
- Use Tailwind utility classes with the custom color tokens (`bg-bg`, `text-foreground`, `bg-surface`, etc.)
- Framer Motion for all animations; respect `prefers-reduced-motion`
- Responsive breakpoint at 1024px — mobile-first, then `lg:` for desktop
- Accessibility: keyboard nav, focus trapping in panels, ARIA labels, Escape to close
