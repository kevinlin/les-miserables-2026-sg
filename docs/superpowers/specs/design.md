# Les Misérables 2026 Singapore — Fan Site Design Spec

**Date:** 2026-03-26
**Project:** `les-miserables-2026-sg`
**Status:** Approved

---

## 1. Overview

A mobile-first, bilingual (English/Chinese) fan microsite for *Les Misérables: The Arena Spectacular* at Sands Theatre, Marina Bay Sands, Singapore (24 March – 10 May 2026).

The site highlights what makes this specific Singapore production special — the headline casting of Lea Salonga and Nathania Ong — and provides rich cast detail including biographies, key songs, and personal stories, all in a theatrical visual style appropriate to the show.

---

## 2. Event Context

| Detail | Value |
|---|---|
| Full title | Les Misérables: The Arena Spectacular World Tour |
| Producer | Cameron Mackintosh / Nick Grace Management / Base Entertainment Asia |
| Venue | Sands Theatre, Marina Bay Sands, Singapore |
| Run | 24 March – 10 May 2026 |
| Rating | G — recommended ages 8+, under 6 not admitted |
| Running time | ~3h 5min including 20-min interval |

### Singapore-specific highlights

1. **Lea Salonga's "Triple Crown"** — The Tony/Olivier Award-winning Filipino actress (Disney's Princess Jasmine and Fa Mulan singing voice) joins last-minute as Madame Thénardier. She has now played Éponine (Broadway 1992, 10th anniversary concert), Fantine (25th anniversary O2 concert), and Madame Thénardier — the only performer to have played all three principal female roles across separate productions.

2. **Nathania Ong's homecoming** — Singapore-born Nathania Ong is the first Singaporean to play Éponine in the West End. This run marks the first time she performs the role in her home country. Previous credits include Hamilton (Eliza) and the Les Mis UK/Ireland tour.

3. **Arena Spectacular format** — Not a conventional touring production. Purpose-built for venues 2,000+ seats: three large video screens, projection-based scenography, arena-calibrated sound design. Grew from the West End staged concert (200+ performances). 40th anniversary production. Over 1 million tickets sold across 30+ cities worldwide.

---

## 3. Requirements

### Functional
- Cast highlights section: what's special about this Singapore production, why these cast members matter
- Cast detail view: photo, biography, "Why Special" callout (featured cast only), awards/tags, and songs performed in the show
- Key songs section: ~10 iconic numbers with character attribution, act, and brief description
- Language toggle: full bilingual content switch (English ↔ 中文), persisted to localStorage
- Theme toggle: dark/light mode, defaulting to dark, persisted to localStorage

### Non-functional
- Mobile-first responsive design (primary breakpoint: 375px)
- Accessible: keyboard navigable, focus-trapped panels, ARIA labels, Escape to close
- Fast: static build, no server required, deployable to GitHub Pages or Netlify
- No external fonts blocked on render (use `font-display: swap`)

---

## 4. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 18 + Vite | Fast dev, optimised static build |
| Language | TypeScript | Full type-safety for bilingual content |
| Styling | Tailwind CSS (`darkMode: 'class'`) | Utility-first; dark/light via `dark:` prefix, no runtime CSS-in-JS |
| Animation | Framer Motion | `AnimatePresence` + `motion.div` for cast detail panel slide-in |
| i18n | Custom `LanguageContext` (no library) | Typed `Bilingual` objects; `t(b)` returns `b[lang]`; zero dependencies |
| Deployment | Static (`vite build`) | GitHub Pages / Netlify — no server needed |

---

## 5. Visual Style

**Theme: Cinematic Mist**

| Token | Dark mode | Light mode |
|---|---|---|
| Background | `#111318` | `#f4f2ee` |
| Surface | `#1a1e24` | `#ffffff` |
| Border | `#7ab8d422` | `#7ab8d433` |
| Accent | `#7ab8d4` (steel blue) | `#4a8faa` |
| Text primary | `#e8eef2` | `#1a1e24` |
| Text secondary | `#5a7080` | `#6a8090` |
| Default theme | Dark | — |

**Typography**
- Display (title): `Georgia` or `Playfair Display` serif — letter-spacing 2–4px, uppercase for section labels
- Body: System sans-serif stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- Bilingual body: uses the same font stack; Chinese characters render correctly on all platforms

**Motion**
- Cast detail panel: slides up from bottom at `< 1024px` (`y: '100%' → 0`), slides in from right at `>= 1024px` (`x: '100%' → 0`). The 1024px breakpoint is the single threshold for both layout and animation variant — no intermediate tablet-specific animation.
- Cast card hover: subtle lift (`translateY(-2px)`) + border glow (`box-shadow: 0 0 12px #7ab8d433`)
- All transitions: 300ms ease

**Panel scrim (backdrop)**
- A `rgba(0,0,0,0.5)` overlay covers the page content behind the open panel in both dark and light modes. Applied as a `fixed inset-0` div rendered by `CastDetailPanel` via `AnimatePresence` (opacity 0→0.5 on open, 0.5→0 on close). Tapping the scrim closes the panel.

---

## 6. Page Architecture

Single HTML page (`/`). No client-side router. The cast detail panel opens/closes in place via React state.

### Sections (top → bottom)

| # | Section | Notes |
|---|---|---|
| 1 | **Nav** (sticky) | Logo · EN/中 toggle · ☀/🌙 toggle · hamburger at `< 1024px` |
| 2 | **HeroSection** | Show title (serif, large) · subtitle · dates · "Get Tickets" CTA → `https://www.marinabaysands.com/entertainment/shows/les-miserables.html` |
| 3 | **HighlightsSection** | 3 callout cards: Triple Crown · Homecoming · Arena format |
| 4 | **CastSection** | 2-col featured row (Lea, Nathania) + 3-col grid (remaining 7 cast, left-aligned — orphaned last row shows 1 card left-aligned, no special treatment) |
| — | **CastDetailPanel** | Slides in on cast card tap — see §8 |
| 5 | **SongsSection** | Normal page scroll (no inner overflow container). Section header: "Key Songs / 经典曲目". Each `SongRow` shows: song title (left, prominent) · character name (center, muted) · act badge (right, e.g. "Act 1"). |
| 6 | **Footer** | Disclaimer · links · show info |

---

## 7. Data Model

### `src/data/types.ts`

```ts
export type Bilingual = { en: string; zh: string }

export type CastTag = 'featured' | 'local' | 'celebrity'

export type CastMember = {
  id: string
  name: string                    // same in both languages
  role: Bilingual
  bio: Bilingual
  whySpecial: Bilingual | null    // null for non-featured cast
  songs: string[]                 // Song ids
  photoUrl: string
  tags: CastTag[]
  awards?: string[]
}

export type Song = {
  id: string
  title: Bilingual
  character: Bilingual
  act: 1 | 2 | 'prologue' | 'epilogue'
  description: Bilingual
}

export type Highlight = {
  id: string
  icon: string
  title: Bilingual
  body: Bilingual
}
```

### Cast data (`src/data/cast.ts`) — 9 members

| Name | Role | Tags |
|---|---|---|
| Lea Salonga | Madame Thénardier | featured, celebrity |
| Nathania Ong | Éponine | featured, local |
| Gerónimo Rauch | Jean Valjean | — |
| Jeremy Secomb | Javert | — |
| Na-Young Jeon | Fantine | — |
| Red Concepción | Thénardier | — |
| Will Callan | Marius | — |
| Lulu-Mae Pears | Cosette | — |
| Harry Chandler | Enjolras | — |

### Songs data (`src/data/songs.ts`) — 10 featured numbers

| Song | Character | Act |
|---|---|---|
| I Dreamed a Dream | Fantine | 1 |
| Who Am I? | Valjean | 1 |
| Stars | Javert | 1 |
| Master of the House | Thénardiers | 1 |
| Do You Hear the People Sing? | Enjolras + Company | 1 |
| One Day More | Full Company | 1 |
| On My Own | Éponine | 2 |
| A Little Fall of Rain | Éponine + Marius | 2 |
| Bring Him Home | Valjean | 2 |
| Empty Chairs at Empty Tables | Marius | 2 |

### Highlights data (`src/data/highlights.ts`) — 3 cards

1. Lea Salonga's Triple Crown
2. Nathania Ong's homecoming
3. Arena Spectacular format (40th anniversary, 1M+ tickets)

---

## 8. Component Design

### Component tree

```
App
├─ ThemeContext        (dark|light + toggle + localStorage)
├─ LanguageContext     (lang + t(Bilingual) + localStorage)
└─ Layout
   ├─ Nav              (sticky, backdrop blur on scroll)
   │  ├─ Logo
   │  ├─ LanguageToggle
   │  ├─ ThemeToggle
   │  └─ MobileMenu
   ├─ HeroSection
   │  ├─ ShowTitle
   │  └─ TicketCTA
   ├─ HighlightsSection
   │  └─ HighlightCard × 3
   ├─ CastSection       (owns selectedCast: CastMember | null)
   │  ├─ FeaturedRow    (2-col, Lea + Nathania)
   │  │  └─ CastCard    variant="featured"
   │  ├─ CastGrid       (3-col, remaining 7)
   │  │  └─ CastCard    variant="standard"
   │  └─ CastDetailPanel (AnimatePresence)
   │     ├─ CastPhoto
   │     ├─ CastTags
   │     ├─ WhySpecialCallout  (renders if whySpecial !== null)
   │     ├─ CastBio
   │     └─ CastSongs          (filters songs.ts by member.songs[])
   ├─ SongsSection
   │  └─ SongRow × 10
   └─ Footer
```

### Key component contracts

**`CastTags`**

Renders inside `CastDetailPanel`. Displays two kinds of tags:
1. **Category tags** from `member.tags`: `featured` → "★ FEATURED", `local` → "🇸🇬 LOCAL", `celebrity` → "Celebrity"
2. **Award chips** from `member.awards?: string[]`: each award rendered as a small outlined badge chip (e.g. "Tony Award", "Olivier Award"). If `awards` is undefined or empty, no award chips are rendered.

Both tag types appear in a wrapping flex row below the cast member's role subtitle in the detail panel.

**`CastCard`**
```ts
props: {
  member: CastMember
  variant: 'featured' | 'standard'
  onClick: (member: CastMember) => void
}
```
Featured: photo (aspect ratio 3:4, `object-fit: cover`), name, role, tag badge. Height is determined by content — grid uses `align-items: start` so cards don't stretch to match each other. `whySpecial` is NOT shown on the card; it only appears in the detail panel. Standard: compact square photo (1:1), name + role only. Both: hover lift + border glow; no hover text reveal.

**`CastDetailPanel`**
```ts
props: {
  member: CastMember | null
  onClose: () => void
}
```
At `< 1024px`: bottom sheet, `90vh`, draggable. Swipe dismiss threshold: drag down > 120px or release velocity > 500px/s triggers close; otherwise snaps back. At `>= 1024px`: right sidebar, `400px` fixed width, full viewport height. `AnimatePresence` handles mount/unmount. Backdrop scrim (see §5) covers the rest of the page. Focus-trapped when open; Escape key or scrim tap closes; focus returns to the triggering card on close.

**`MobileMenu`**
- Visible at `< 1024px` as a hamburger button in the Nav
- Opens a full-width dropdown panel below the Nav (not a drawer — pushes content down)
- Contains anchor links: `#highlights` · `#cast` · `#songs`
- Repeats `LanguageToggle` and `ThemeToggle` controls for reachability
- Closes on: link tap, outside tap, or second hamburger tap
- At `>= 1024px`: hamburger is hidden; `LanguageToggle` and `ThemeToggle` are always visible inline in the Nav

**`LanguageContext`**
```ts
type LanguageContextValue = {
  lang: 'en' | 'zh'
  setLang: (l: 'en' | 'zh') => void
  t: (b: Bilingual) => string     // returns b[lang]
}
```
`lang: 'zh'` maps to Simplified Chinese (zh-Hans). The `<html lang>` attribute is set to `zh-Hans` when Chinese is active. All component text goes through `t()`. Toggle is instant — no async, no loading state.

**`ThemeContext`**
```ts
type ThemeContextValue = {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}
```
Toggles `dark` class on `<html>`. Tailwind `dark:` classes handle all color switching. Defaults to `dark`.

---

## 9. Bilingual Content Pattern

Every user-visible string uses the `Bilingual` type. Components consume it through `t()`:

```tsx
// In any component:
const { t } = useLanguage()

<h2>{t(member.role)}</h2>
<p>{t(member.bio)}</p>
```

Content is authored as co-located bilingual objects in data files, not as separate JSON translation files. This gives full TypeScript autocomplete and eliminates key-string indirection.

---

## 10. Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| `< 640px` (mobile) | Single column cast grid; hamburger nav |
| `640px–1023px` (tablet) | 2-col cast grid; hamburger nav still shown; detail panel bottom sheet (same as mobile) |
| `>= 1024px` (desktop) | 3-col cast grid; inline Nav controls (no hamburger); detail panel slides in from right as 400px sidebar |

The **panel animation threshold is 1024px** (not 640px). Below 1024px: bottom sheet. At 1024px and above: right sidebar.

---

## 11. Accessibility

- All interactive elements keyboard-navigable (Tab / Enter / Space)
- `CastDetailPanel` traps focus when open; returns focus to triggering card on close
- Escape key closes the panel
- All images have descriptive `alt` text
- Language toggle updates `<html lang>` attribute: `en` for English, `zh-Hans` for Simplified Chinese
- Colour contrast meets WCAG AA in both dark and light modes
- `prefers-reduced-motion`: Framer Motion respects this — animations disabled if set

---

## 12. Deployment

```bash
npm run build   # outputs to dist/
```

Deploy `dist/` as a static site to GitHub Pages or Netlify. No server, no API, no environment variables needed. All content is bundled at build time.

---

## 13. Out of Scope

- Ticket purchasing (links to MBS site)
- User accounts or personalisation
- Video or audio playback
- Real-time data or CMS
- SEO / meta tags beyond basic Open Graph (can be added later)
- More than 9 cast members or 10 songs (content is fixed for this production)
