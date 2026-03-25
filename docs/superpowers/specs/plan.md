# Les Misérables 2026 Singapore — Fan Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, bilingual fan microsite for Les Misérables: The Arena Spectacular at MBS Singapore, highlighting the unique casting of Lea Salonga and Nathania Ong.

**Architecture:** Single-page React app with no router. All content is static bilingual data consumed via a custom `LanguageContext`. Theme switching via Tailwind `darkMode: 'class'` with CSS custom properties for color tokens. Cast detail panel uses Framer Motion `AnimatePresence` for animated mount/unmount with responsive variants (bottom sheet on mobile, right sidebar on desktop).

**Tech Stack:** React 18, Vite, TypeScript (strict), Tailwind CSS v3, Framer Motion, Vitest

**Spec:** `docs/superpowers/specs/design.md`

---

## File Structure

```
les-miserables-2026-sg/
├── index.html                          # HTML shell with font import + theme flash prevention script
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── public/
│   └── images/cast/                    # Cast placeholder images (to be replaced with real photos)
├── src/
│   ├── main.tsx                        # ReactDOM.createRoot entry
│   ├── App.tsx                         # Context providers + Layout
│   ├── index.css                       # Tailwind directives + CSS custom properties for design tokens
│   ├── vite-env.d.ts                   # Vite client types
│   ├── data/
│   │   ├── types.ts                    # Bilingual, CastMember, Song, Highlight types
│   │   ├── cast.ts                     # 9 cast members with bilingual bios
│   │   ├── songs.ts                    # 10 featured songs with bilingual content
│   │   └── highlights.ts              # 3 highlight cards with bilingual content
│   ├── contexts/
│   │   ├── ThemeContext.tsx            # dark/light toggle + localStorage
│   │   └── LanguageContext.tsx         # en/zh toggle + t() helper + localStorage
│   └── components/
│       ├── Layout.tsx                  # Page wrapper with all sections
│       ├── Nav.tsx                     # Sticky nav with backdrop blur
│       ├── LanguageToggle.tsx          # EN/中 toggle button
│       ├── ThemeToggle.tsx             # Sun/moon toggle button
│       ├── MobileMenu.tsx             # Hamburger dropdown at < 1024px
│       ├── HeroSection.tsx            # Title, subtitle, dates, CTA
│       ├── HighlightsSection.tsx      # Section wrapper for 3 highlight cards
│       ├── HighlightCard.tsx          # Single highlight card
│       ├── CastSection.tsx            # Featured row + grid + detail panel state
│       ├── CastCard.tsx               # Cast card (featured/standard variants)
│       ├── CastDetailPanel.tsx        # Animated slide-in panel with scrim
│       ├── CastTags.tsx               # Category tags + award chips
│       ├── WhySpecialCallout.tsx      # Featured cast callout box
│       ├── CastSongs.tsx              # Songs list for a cast member
│       ├── SongsSection.tsx           # Section wrapper for song rows
│       ├── SongRow.tsx                # Single song row
│       └── Footer.tsx                 # Disclaimer, links, show info
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.ts`, `postcss.config.js`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`

- [ ] **Step 1: Initialize Vite project and install dependencies**

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npm install framer-motion
npx tailwindcss init -p --ts
```

- [ ] **Step 2: Configure Tailwind with design tokens**

`tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-border': 'var(--color-border)',
        accent: 'var(--color-accent)',
        foreground: 'var(--color-text-primary)',
        muted: 'var(--color-text-secondary)',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 3: Set up global styles with CSS custom properties**

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg: #f4f2ee;
    --color-surface: #ffffff;
    --color-border: #7ab8d433;
    --color-accent: #4a8faa;
    --color-text-primary: #1a1e24;
    --color-text-secondary: #6a8090;
  }

  .dark {
    --color-bg: #111318;
    --color-surface: #1a1e24;
    --color-border: #7ab8d422;
    --color-accent: #7ab8d4;
    --color-text-primary: #e8eef2;
    --color-text-secondary: #5a7080;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-foreground font-body antialiased;
    transition: background-color 300ms ease, color 300ms ease;
  }
}
```

- [ ] **Step 4: Configure index.html with font import and theme flash prevention**

`index.html`:
```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Les Misérables: The Arena Spectacular — Singapore 2026</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <script>
      (function () {
        var theme = localStorage.getItem('theme');
        if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        }
        var lang = localStorage.getItem('lang');
        if (lang === 'zh') {
          document.documentElement.lang = 'zh-Hans';
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create minimal App shell**

`src/main.tsx`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

`src/App.tsx`:
```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-bg text-foreground">
      <p className="p-8 text-accent font-display text-2xl">Les Misérables — scaffold working</p>
    </div>
  )
}
```

- [ ] **Step 6: Verify dev server starts with correct dark theme**

Run: `npm run dev`
Expected: Browser shows "Les Misérables — scaffold working" in steel blue (`#7ab8d4`) on dark background (`#111318`). Playfair Display font loads.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: project scaffold with Vite, React, TS, Tailwind, design tokens"
```

---

### Task 2: Data Layer — Types and Content

**Files:**
- Create: `src/data/types.ts`, `src/data/cast.ts`, `src/data/songs.ts`, `src/data/highlights.ts`

- [ ] **Step 1: Create type definitions**

`src/data/types.ts`:
```ts
export type Bilingual = { en: string; zh: string }

export type CastTag = 'featured' | 'local' | 'celebrity'

export type CastMember = {
  id: string
  name: string
  role: Bilingual
  bio: Bilingual
  whySpecial: Bilingual | null
  songs: string[]
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

- [ ] **Step 2: Create cast data with all 9 members**

`src/data/cast.ts`:
```ts
import { CastMember } from './types'

export const castMembers: CastMember[] = [
  {
    id: 'lea-salonga',
    name: 'Lea Salonga',
    role: { en: 'Madame Thénardier', zh: '德纳第夫人' },
    bio: {
      en: 'Tony and Olivier Award-winning Filipino actress, known worldwide as the singing voice of Disney\'s Princess Jasmine and Fa Mulan. Lea originated the role of Kim in Miss Saigon on the West End and Broadway, and has played Éponine (Broadway 1992, 10th anniversary concert) and Fantine (25th anniversary O2 concert) in Les Misérables. Her casting as Madame Thénardier in this Singapore run makes her the only performer to have played all three principal female roles across separate productions.',
      zh: '菲律宾裔托尼奖及奥利弗奖双料得主，以迪士尼茉莉公主与花木兰的歌声闻名世界。她在《西贡小姐》中首演Kim一角，曾在《悲惨世界》中饰演爱潘妮（1992年百老汇、十周年音乐会）及芳汀（25周年O2音乐会）。此次在新加坡出演德纳第夫人，使她成为唯一在不同制作中饰演过三位女主角的演员。',
    },
    whySpecial: {
      en: 'The only performer ever to play Éponine, Fantine, and Madame Thénardier — all three principal female roles — across separate Les Misérables productions. A historic "Triple Crown."',
      zh: '史上唯一在不同《悲惨世界》制作中分别饰演爱潘妮、芳汀和德纳第夫人三位女主角的演员——历史性的"三冠王"。',
    },
    songs: ['master-of-the-house', 'one-day-more'],
    photoUrl: '/images/cast/lea-salonga.jpg',
    tags: ['featured', 'celebrity'],
    awards: ['Tony Award', 'Olivier Award'],
  },
  {
    id: 'nathania-ong',
    name: 'Nathania Ong',
    role: { en: 'Éponine', zh: '爱潘妮' },
    bio: {
      en: 'Singapore-born musical theatre actress and the first Singaporean to play Éponine in the West End. Nathania\'s credits include Eliza in Hamilton (West End) and the Les Misérables UK and Ireland tour. This Singapore run marks the first time she performs the role in her home country.',
      zh: '新加坡出生的音乐剧演员，首位在伦敦西区饰演爱潘妮的新加坡人。曾在西区《汉密尔顿》中饰演Eliza，并参演《悲惨世界》英国及爱尔兰巡演。此次新加坡演出是她首次在家乡演出这一角色。',
    },
    whySpecial: {
      en: 'The first Singaporean to play Éponine in the West End, now performing the role for the first time in her home country. A true homecoming.',
      zh: '首位在伦敦西区饰演爱潘妮的新加坡人，如今首次在家乡演出这一角色——真正的衣锦还乡。',
    },
    songs: ['on-my-own', 'a-little-fall-of-rain', 'one-day-more'],
    photoUrl: '/images/cast/nathania-ong.jpg',
    tags: ['featured', 'local'],
  },
  {
    id: 'geronimo-rauch',
    name: 'Gerónimo Rauch',
    role: { en: 'Jean Valjean', zh: '冉阿让' },
    bio: {
      en: 'Argentine musical theatre star who has played Jean Valjean in the West End, on Broadway, and in multiple international productions. Acclaimed for his powerful tenor voice and emotional depth in the role.',
      zh: '阿根廷音乐剧明星，曾在伦敦西区、百老汇及多个国际制作中饰演冉阿让。以强大的男高音和深厚的情感表现著称。',
    },
    whySpecial: null,
    songs: ['who-am-i', 'bring-him-home', 'one-day-more'],
    photoUrl: '/images/cast/geronimo-rauch.jpg',
    tags: [],
  },
  {
    id: 'jeremy-secomb',
    name: 'Jeremy Secomb',
    role: { en: 'Javert', zh: '沙威' },
    bio: {
      en: 'Australian actor and singer who has played Javert in multiple productions of Les Misérables worldwide, including the West End and the Arena Spectacular tour. Known for his commanding stage presence and rich baritone.',
      zh: '澳大利亚演员及歌手，在全球多个《悲惨世界》制作中饰演沙威，包括伦敦西区及Arena Spectacular巡演。以其强大的舞台气场和浑厚的男中音著称。',
    },
    whySpecial: null,
    songs: ['stars', 'one-day-more'],
    photoUrl: '/images/cast/jeremy-secomb.jpg',
    tags: [],
  },
  {
    id: 'na-young-jeon',
    name: 'Na-Young Jeon',
    role: { en: 'Fantine', zh: '芳汀' },
    bio: {
      en: 'South Korean musical theatre actress bringing emotional intensity to the role of Fantine. Known for her powerful soprano voice across Korean and international musical productions.',
      zh: '韩国音乐剧女演员，为芳汀一角注入深沉的情感力量。以其强大的女高音在韩国及国际音乐剧舞台上闻名。',
    },
    whySpecial: null,
    songs: ['i-dreamed-a-dream', 'one-day-more'],
    photoUrl: '/images/cast/na-young-jeon.jpg',
    tags: [],
  },
  {
    id: 'red-concepcion',
    name: 'Red Concepción',
    role: { en: 'Thénardier', zh: '德纳第' },
    bio: {
      en: 'Filipino-British actor known for diverse roles across theatre, television, and film. Brings comic villainy and charisma to the role of the scheming innkeeper Thénardier.',
      zh: '菲律宾裔英国演员，活跃于戏剧、电视和电影领域。为奸诈的客店老板德纳第注入喜剧般的坏蛋魅力。',
    },
    whySpecial: null,
    songs: ['master-of-the-house', 'one-day-more'],
    photoUrl: '/images/cast/red-concepcion.jpg',
    tags: [],
  },
  {
    id: 'will-callan',
    name: 'Will Callan',
    role: { en: 'Marius', zh: '马吕斯' },
    bio: {
      en: 'British musical theatre actor playing the idealistic student revolutionary Marius. Known for his lyrical tenor and youthful energy on stage.',
      zh: '英国音乐剧演员，饰演理想主义的学生革命者马吕斯。以抒情的男高音和青春的舞台活力著称。',
    },
    whySpecial: null,
    songs: ['a-little-fall-of-rain', 'empty-chairs-at-empty-tables', 'one-day-more'],
    photoUrl: '/images/cast/will-callan.jpg',
    tags: [],
  },
  {
    id: 'lulu-mae-pears',
    name: 'Lulu-Mae Pears',
    role: { en: 'Cosette', zh: '珂赛特' },
    bio: {
      en: 'British actress bringing warmth and grace to Cosette, Valjean\'s adopted daughter. Her portrayal captures both the character\'s innocence and inner strength.',
      zh: '英国女演员，为冉阿让的养女珂赛特注入温暖与优雅。她的演绎兼具角色的纯真与内在的坚强。',
    },
    whySpecial: null,
    songs: ['one-day-more'],
    photoUrl: '/images/cast/lulu-mae-pears.jpg',
    tags: [],
  },
  {
    id: 'harry-chandler',
    name: 'Harry Chandler',
    role: { en: 'Enjolras', zh: '安灼拉' },
    bio: {
      en: 'British musical theatre performer playing the fiery student leader Enjolras. Commands the barricade scenes with vocal power and revolutionary conviction.',
      zh: '英国音乐剧演员，饰演充满激情的学生领袖安灼拉。以强大的歌声和革命信念掌控路障场景。',
    },
    whySpecial: null,
    songs: ['do-you-hear-the-people-sing', 'one-day-more'],
    photoUrl: '/images/cast/harry-chandler.jpg',
    tags: [],
  },
]

export const featuredCast = castMembers.filter((m) => m.tags.includes('featured'))
export const standardCast = castMembers.filter((m) => !m.tags.includes('featured'))
```

- [ ] **Step 3: Create songs data**

`src/data/songs.ts`:
```ts
import { Song } from './types'

export const songs: Song[] = [
  {
    id: 'i-dreamed-a-dream',
    title: { en: 'I Dreamed a Dream', zh: '我曾有梦' },
    character: { en: 'Fantine', zh: '芳汀' },
    act: 1,
    description: {
      en: 'Fantine\'s devastating lament for the life she once hoped to live, as she faces destitution and despair.',
      zh: '芳汀在陷入贫困与绝望时，对曾经憧憬的生活发出的悲痛哀叹。',
    },
  },
  {
    id: 'who-am-i',
    title: { en: 'Who Am I?', zh: '我是谁？' },
    character: { en: 'Valjean', zh: '冉阿让' },
    act: 1,
    description: {
      en: 'Valjean\'s moral crisis: reveal his identity to save an innocent man, or protect his new life.',
      zh: '冉阿让的道德危机：暴露身份拯救无辜之人，还是保全自己的新生活。',
    },
  },
  {
    id: 'stars',
    title: { en: 'Stars', zh: '星' },
    character: { en: 'Javert', zh: '沙威' },
    act: 1,
    description: {
      en: 'Javert\'s ode to the unchanging order of the heavens, reflecting his rigid devotion to the law.',
      zh: '沙威对永恒星空秩序的颂歌，映照他对法律的刚正不阿。',
    },
  },
  {
    id: 'master-of-the-house',
    title: { en: 'Master of the House', zh: '酒店主人' },
    character: { en: 'Thénardiers', zh: '德纳第夫妇' },
    act: 1,
    description: {
      en: 'The Thénardiers\' raucous comic number celebrating their talent for swindling guests at their inn.',
      zh: '德纳第夫妇欢快的喜剧曲目，炫耀他们在客栈坑骗客人的"才华"。',
    },
  },
  {
    id: 'do-you-hear-the-people-sing',
    title: { en: 'Do You Hear the People Sing?', zh: '你可听到人民的歌声？' },
    character: { en: 'Enjolras & Company', zh: '安灼拉与众人' },
    act: 1,
    description: {
      en: 'The rousing anthem of revolution as the students rally to build the barricade.',
      zh: '激昂的革命颂歌，学生们集结起来筑起街垒。',
    },
  },
  {
    id: 'one-day-more',
    title: { en: 'One Day More', zh: '再多一天' },
    character: { en: 'Full Company', zh: '全体演员' },
    act: 1,
    description: {
      en: 'The Act 1 finale weaving every character\'s hopes and fears on the eve of the uprising.',
      zh: '第一幕终曲，在起义前夜交织每个角色的希望与恐惧。',
    },
  },
  {
    id: 'on-my-own',
    title: { en: 'On My Own', zh: '独自一人' },
    character: { en: 'Éponine', zh: '爱潘妮' },
    act: 2,
    description: {
      en: 'Éponine\'s heartbreaking solo about her unrequited love for Marius, wandering alone through the rain.',
      zh: '爱潘妮独自在雨中徘徊，倾诉对马吕斯无望的爱——令人心碎的独唱。',
    },
  },
  {
    id: 'a-little-fall-of-rain',
    title: { en: 'A Little Fall of Rain', zh: '微雨轻落' },
    character: { en: 'Éponine & Marius', zh: '爱潘妮与马吕斯' },
    act: 2,
    description: {
      en: 'Éponine\'s final duet with Marius as she dies in his arms at the barricade.',
      zh: '爱潘妮在街垒上于马吕斯怀中离世时的最后二重唱。',
    },
  },
  {
    id: 'bring-him-home',
    title: { en: 'Bring Him Home', zh: '带他回家' },
    character: { en: 'Valjean', zh: '冉阿让' },
    act: 2,
    description: {
      en: 'Valjean\'s prayer over the sleeping Marius on the eve of the final battle at the barricade.',
      zh: '在最后决战前夜，冉阿让在沉睡的马吕斯身旁的祈祷。',
    },
  },
  {
    id: 'empty-chairs-at-empty-tables',
    title: { en: 'Empty Chairs at Empty Tables', zh: '空桌空椅' },
    character: { en: 'Marius', zh: '马吕斯' },
    act: 2,
    description: {
      en: 'Marius\'s grief-stricken lament for his fallen friends, the sole survivor of the barricade.',
      zh: '马吕斯作为街垒唯一的幸存者，为牺牲的朋友们发出的悲恸哀歌。',
    },
  },
]
```

- [ ] **Step 4: Create highlights data**

`src/data/highlights.ts`:
```ts
import { Highlight } from './types'

export const highlights: Highlight[] = [
  {
    id: 'triple-crown',
    icon: '👑',
    title: {
      en: 'Lea Salonga\'s Triple Crown',
      zh: 'Lea Salonga 的三冠王',
    },
    body: {
      en: 'The Tony & Olivier Award winner becomes the only performer to have played Éponine, Fantine, and Madame Thénardier — all three principal female roles — across separate Les Misérables productions.',
      zh: '这位托尼奖与奥利弗奖双料得主，成为唯一在不同《悲惨世界》制作中分别饰演过爱潘妮、芳汀和德纳第夫人三位女主角的演员。',
    },
  },
  {
    id: 'homecoming',
    icon: '🇸🇬',
    title: {
      en: 'Nathania Ong\'s Homecoming',
      zh: 'Nathania Ong 的回乡演出',
    },
    body: {
      en: 'The first Singaporean to play Éponine in the West End returns home to perform the role in her own country for the first time. Previous credits include Eliza in Hamilton.',
      zh: '首位在伦敦西区饰演爱潘妮的新加坡人回到家乡，首次在自己的国家演出这一角色。此前曾在《汉密尔顿》中饰演Eliza。',
    },
  },
  {
    id: 'arena-spectacular',
    icon: '🎭',
    title: {
      en: 'Arena Spectacular',
      zh: '大型场馆震撼版',
    },
    body: {
      en: 'Not a conventional tour — purpose-built for 2,000+ seat venues with three giant video screens, projection scenography, and arena-calibrated sound. The 40th anniversary production has sold over 1 million tickets across 30+ cities.',
      zh: '非传统巡演——专为两千座以上大型场馆打造，配备三块巨幕、投影布景和场馆级音响系统。四十周年纪念制作已在全球三十余座城市售出超过一百万张门票。',
    },
  },
]
```

- [ ] **Step 5: Verify TypeScript compiles with no errors**

Run: `npx tsc --noEmit`
Expected: No errors. All types are consistent, cast song IDs reference valid song IDs.

- [ ] **Step 6: Commit**

```bash
git add src/data/
git commit -m "feat: add data layer with types, cast, songs, and highlights"
```

---

### Task 3: ThemeContext

**Files:**
- Create: `src/contexts/ThemeContext.tsx`

- [ ] **Step 1: Create ThemeContext with localStorage persistence**

`src/contexts/ThemeContext.tsx`:
```tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type ThemeContextValue = {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/contexts/ThemeContext.tsx
git commit -m "feat: add ThemeContext with dark/light toggle and localStorage"
```

---

### Task 4: LanguageContext

**Files:**
- Create: `src/contexts/LanguageContext.tsx`

- [ ] **Step 1: Create LanguageContext with t() helper and localStorage**

`src/contexts/LanguageContext.tsx`:
```tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Bilingual } from '../data/types'

type Lang = 'en' | 'zh'

type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (b: Bilingual) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang')
    return stored === 'zh' ? 'zh' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en'
    localStorage.setItem('lang', lang)
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])

  const t = useCallback((b: Bilingual) => b[lang], [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/contexts/LanguageContext.tsx
git commit -m "feat: add LanguageContext with bilingual t() helper and localStorage"
```

---

### Task 5: App Shell + Layout

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/Layout.tsx`

- [ ] **Step 1: Wire up App with context providers**

`src/App.tsx`:
```tsx
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout />
      </LanguageProvider>
    </ThemeProvider>
  )
}
```

- [ ] **Step 2: Create Layout with section placeholders**

`src/components/Layout.tsx`:
```tsx
export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="p-4 text-accent font-display">Nav placeholder</header>
      <main>
        <section id="hero" className="p-8">Hero placeholder</section>
        <section id="highlights" className="p-8">Highlights placeholder</section>
        <section id="cast" className="p-8">Cast placeholder</section>
        <section id="songs" className="p-8">Songs placeholder</section>
      </main>
      <footer className="p-8 text-muted">Footer placeholder</footer>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser — dark background, section placeholders visible**

Run: `npm run dev`
Expected: Dark background, placeholder text for each section visible.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/components/Layout.tsx
git commit -m "feat: wire up App shell with context providers and Layout"
```

---

### Task 6: Nav + LanguageToggle + ThemeToggle

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/LanguageToggle.tsx`, `src/components/ThemeToggle.tsx`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Create LanguageToggle**

`src/components/LanguageToggle.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      className="px-3 py-1.5 text-sm font-medium rounded-md border border-surface-border text-foreground hover:text-accent transition-colors"
      aria-label={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
    >
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  )
}
```

- [ ] **Step 2: Create ThemeToggle**

`src/components/ThemeToggle.tsx`:
```tsx
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1.5 text-sm rounded-md border border-surface-border text-foreground hover:text-accent transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

- [ ] **Step 3: Create Nav with sticky positioning and responsive layout**

`src/components/Nav.tsx`:
```tsx
import { useState } from 'react'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-lg tracking-widest uppercase text-foreground">
          Les Misérables
        </a>

        {/* Desktop nav links + controls */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#highlights" className="text-sm text-muted hover:text-foreground transition-colors">
            Highlights
          </a>
          <a href="#cast" className="text-sm text-muted hover:text-foreground transition-colors">
            Cast
          </a>
          <a href="#songs" className="text-sm text-muted hover:text-foreground transition-colors">
            Songs
          </a>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </nav>
  )
}
```

- [ ] **Step 4: Create MobileMenu placeholder** (full implementation in Task 11)

`src/components/MobileMenu.tsx`:
```tsx
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

type Props = { onClose: () => void }

export default function MobileMenu({ onClose }: Props) {
  return (
    <div className="lg:hidden border-t border-surface-border bg-bg/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
        <a href="#highlights" onClick={onClose} className="text-sm text-muted hover:text-foreground py-2">
          Highlights
        </a>
        <a href="#cast" onClick={onClose} className="text-sm text-muted hover:text-foreground py-2">
          Cast
        </a>
        <a href="#songs" onClick={onClose} className="text-sm text-muted hover:text-foreground py-2">
          Songs
        </a>
        <div className="flex items-center gap-2 pt-2 border-t border-surface-border">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Update Layout to use Nav**

Replace the `<header>` placeholder in `src/components/Layout.tsx`:
```tsx
import Nav from './Nav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main>
        <section id="hero" className="p-8">Hero placeholder</section>
        <section id="highlights" className="p-8">Highlights placeholder</section>
        <section id="cast" className="p-8">Cast placeholder</section>
        <section id="songs" className="p-8">Songs placeholder</section>
      </main>
      <footer className="p-8 text-muted">Footer placeholder</footer>
    </div>
  )
}
```

- [ ] **Step 6: Verify in browser**

Run: `npm run dev`
Expected: Sticky nav with logo, theme/language toggles work (dark ↔ light, EN ↔ 中文). Hamburger visible below 1024px, inline controls at >= 1024px.

- [ ] **Step 7: Commit**

```bash
git add src/components/Nav.tsx src/components/LanguageToggle.tsx src/components/ThemeToggle.tsx src/components/MobileMenu.tsx src/components/Layout.tsx
git commit -m "feat: add sticky Nav with language and theme toggles"
```

---

### Task 7: HeroSection

**Files:**
- Create: `src/components/HeroSection.tsx`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Create HeroSection**

`src/components/HeroSection.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-accent font-display text-xs tracking-[4px] uppercase mb-4">
          {t({ en: 'Cameron Mackintosh presents', zh: 'Cameron Mackintosh 呈献' })}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
          Les Misérables
        </h1>
        <p className="font-display text-lg sm:text-xl text-muted tracking-wide uppercase mb-6">
          {t({ en: 'The Arena Spectacular', zh: '大型场馆震撼版' })}
        </p>
        <p className="text-muted text-sm sm:text-base mb-2">
          {t({ en: 'Sands Theatre, Marina Bay Sands', zh: '滨海湾金沙·金沙剧场' })}
        </p>
        <p className="text-muted text-sm sm:text-base mb-8">
          {t({ en: '24 March – 10 May 2026', zh: '2026年3月24日 – 5月10日' })}
        </p>
        <a
          href="https://www.marinabaysands.com/entertainment/shows/les-miserables.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-accent text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          {t({ en: 'Get Tickets', zh: '购票' })}
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace hero placeholder in Layout**

In `src/components/Layout.tsx`, replace `<section id="hero" ...>Hero placeholder</section>` with `<HeroSection />`. Add the import.

- [ ] **Step 3: Verify in browser**

Expected: Hero section with show title in Playfair Display, subtitle, venue, dates, and "Get Tickets" button in accent color. Language toggle switches all text.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx src/components/Layout.tsx
git commit -m "feat: add HeroSection with bilingual content and ticket CTA"
```

---

### Task 8: HighlightsSection + HighlightCard

**Files:**
- Create: `src/components/HighlightsSection.tsx`, `src/components/HighlightCard.tsx`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Create HighlightCard**

`src/components/HighlightCard.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import type { Highlight } from '../data/types'

type Props = { highlight: Highlight }

export default function HighlightCard({ highlight }: Props) {
  const { t } = useLanguage()

  return (
    <div className="p-6 rounded-xl bg-surface border border-surface-border hover:border-accent/30 transition-colors">
      <span className="text-3xl mb-3 block">{highlight.icon}</span>
      <h3 className="font-display text-lg font-bold text-foreground mb-2">
        {t(highlight.title)}
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        {t(highlight.body)}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Create HighlightsSection**

`src/components/HighlightsSection.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import { highlights } from '../data/highlights'
import HighlightCard from './HighlightCard'

export default function HighlightsSection() {
  const { t } = useLanguage()

  return (
    <section id="highlights" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-xs tracking-[4px] uppercase text-accent mb-8 text-center">
          {t({ en: 'What Makes This Special', zh: '为何特别' })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <HighlightCard key={h.id} highlight={h} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Replace highlights placeholder in Layout**

In `src/components/Layout.tsx`, replace the highlights placeholder with `<HighlightsSection />`. Add imports.

- [ ] **Step 4: Verify in browser**

Expected: 3 highlight cards in a responsive grid (1-col mobile, 3-col desktop). Icons, titles, and body text all switch with language toggle.

- [ ] **Step 5: Commit**

```bash
git add src/components/HighlightsSection.tsx src/components/HighlightCard.tsx src/components/Layout.tsx
git commit -m "feat: add HighlightsSection with 3 bilingual callout cards"
```

---

### Task 9: CastSection + CastCard

**Files:**
- Create: `src/components/CastSection.tsx`, `src/components/CastCard.tsx`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Create CastCard with featured/standard variants**

`src/components/CastCard.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import type { CastMember } from '../data/types'

type Props = {
  member: CastMember
  variant: 'featured' | 'standard'
  onClick: (member: CastMember) => void
}

export default function CastCard({ member, variant, onClick }: Props) {
  const { t } = useLanguage()

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onClick(member)}
        className="group text-left w-full rounded-xl bg-surface border border-surface-border overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_12px_var(--color-border)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <div className="aspect-[3/4] bg-surface overflow-hidden">
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              target.parentElement!.classList.add('flex', 'items-center', 'justify-center')
              const fallback = document.createElement('span')
              fallback.className = 'text-4xl text-muted'
              fallback.textContent = member.name[0]
              target.parentElement!.appendChild(fallback)
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg font-bold text-foreground">{member.name}</h3>
          <p className="text-muted text-sm mt-1">{t(member.role)}</p>
          {member.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {member.tags.includes('featured') && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">★ Featured</span>
              )}
              {member.tags.includes('local') && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">🇸🇬 Local</span>
              )}
              {member.tags.includes('celebrity') && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">Celebrity</span>
              )}
            </div>
          )}
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={() => onClick(member)}
      className="group text-left w-full rounded-xl bg-surface border border-surface-border overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_12px_var(--color-border)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="aspect-square bg-surface overflow-hidden">
        <img
          src={member.photoUrl}
          alt={member.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            target.parentElement!.classList.add('flex', 'items-center', 'justify-center')
            const fallback = document.createElement('span')
            fallback.className = 'text-3xl text-muted'
            fallback.textContent = member.name[0]
            target.parentElement!.appendChild(fallback)
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-foreground">{member.name}</h3>
        <p className="text-muted text-xs mt-0.5">{t(member.role)}</p>
      </div>
    </button>
  )
}
```

- [ ] **Step 2: Create CastSection with featured row and standard grid**

`src/components/CastSection.tsx`:
```tsx
import { useState, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { featuredCast, standardCast } from '../data/cast'
import type { CastMember } from '../data/types'
import CastCard from './CastCard'
import CastDetailPanel from './CastDetailPanel'

export default function CastSection() {
  const { t } = useLanguage()
  const [selectedCast, setSelectedCast] = useState<CastMember | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const handleCardClick = (member: CastMember) => {
    triggerRef.current = document.activeElement as HTMLButtonElement
    setSelectedCast(member)
  }

  const handleClose = () => {
    setSelectedCast(null)
    triggerRef.current?.focus()
  }

  return (
    <section id="cast" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-xs tracking-[4px] uppercase text-accent mb-8 text-center">
          {t({ en: 'The Cast', zh: '演员阵容' })}
        </h2>

        {/* Featured row — 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 items-start">
          {featuredCast.map((member) => (
            <CastCard key={member.id} member={member} variant="featured" onClick={handleCardClick} />
          ))}
        </div>

        {/* Standard grid — 1/2/3 columns responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {standardCast.map((member) => (
            <CastCard key={member.id} member={member} variant="standard" onClick={handleCardClick} />
          ))}
        </div>
      </div>

      <CastDetailPanel member={selectedCast} onClose={handleClose} />
    </section>
  )
}
```

- [ ] **Step 3: Create CastDetailPanel placeholder** (full implementation in Task 10)

`src/components/CastDetailPanel.tsx`:
```tsx
import type { CastMember } from '../data/types'

type Props = {
  member: CastMember | null
  onClose: () => void
}

export default function CastDetailPanel({ member, onClose }: Props) {
  if (!member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-stretch lg:justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-surface w-full lg:w-[400px] h-[90vh] lg:h-full rounded-t-2xl lg:rounded-none p-6 overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-foreground">✕</button>
        <h2 className="text-xl font-display font-bold text-foreground">{member.name}</h2>
        <p className="text-muted mt-1">Panel placeholder — full implementation in Task 10</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Replace cast placeholder in Layout**

In `src/components/Layout.tsx`, replace the cast placeholder with `<CastSection />`. Add the import.

- [ ] **Step 5: Verify in browser**

Expected: Featured row with 2 cards (Lea, Nathania) showing 3:4 photo area, name, role, tag badges. Standard grid with 7 cards showing 1:1 photo area. Cards have hover lift + glow. Clicking any card opens placeholder panel.

- [ ] **Step 6: Commit**

```bash
git add src/components/CastSection.tsx src/components/CastCard.tsx src/components/CastDetailPanel.tsx src/components/Layout.tsx
git commit -m "feat: add CastSection with featured/standard cards and panel placeholder"
```

---

### Task 10: CastDetailPanel + Sub-components

**Files:**
- Modify: `src/components/CastDetailPanel.tsx`
- Create: `src/components/CastTags.tsx`, `src/components/WhySpecialCallout.tsx`, `src/components/CastSongs.tsx`

- [ ] **Step 1: Create CastTags**

`src/components/CastTags.tsx`:
```tsx
import type { CastMember } from '../data/types'

type Props = { member: CastMember }

export default function CastTags({ member }: Props) {
  const hasAnyTags = member.tags.length > 0 || (member.awards && member.awards.length > 0)
  if (!hasAnyTags) return null

  return (
    <div className="flex flex-wrap gap-2">
      {member.tags.includes('featured') && (
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">★ FEATURED</span>
      )}
      {member.tags.includes('local') && (
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">🇸🇬 LOCAL</span>
      )}
      {member.tags.includes('celebrity') && (
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">Celebrity</span>
      )}
      {member.awards?.map((award) => (
        <span
          key={award}
          className="text-xs px-2.5 py-1 rounded-full border border-surface-border text-muted"
        >
          {award}
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create WhySpecialCallout**

`src/components/WhySpecialCallout.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import type { Bilingual } from '../data/types'

type Props = { whySpecial: Bilingual }

export default function WhySpecialCallout({ whySpecial }: Props) {
  const { t } = useLanguage()

  return (
    <div className="rounded-lg bg-accent/5 border border-accent/20 p-4">
      <p className="text-xs font-display tracking-[2px] uppercase text-accent mb-2">
        {t({ en: 'Why Special', zh: '为何特别' })}
      </p>
      <p className="text-sm text-foreground leading-relaxed">{t(whySpecial)}</p>
    </div>
  )
}
```

- [ ] **Step 3: Create CastSongs**

`src/components/CastSongs.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import { songs } from '../data/songs'

type Props = { songIds: string[] }

export default function CastSongs({ songIds }: Props) {
  const { t } = useLanguage()
  const memberSongs = songs.filter((s) => songIds.includes(s.id))

  if (memberSongs.length === 0) return null

  return (
    <div>
      <p className="text-xs font-display tracking-[2px] uppercase text-accent mb-3">
        {t({ en: 'Songs in This Show', zh: '演出曲目' })}
      </p>
      <ul className="space-y-2">
        {memberSongs.map((song) => (
          <li key={song.id} className="flex items-center justify-between text-sm">
            <span className="text-foreground">{t(song.title)}</span>
            <span className="text-xs text-muted px-2 py-0.5 rounded bg-surface-border/50">
              {t({ en: `Act ${song.act}`, zh: `第${song.act === 1 ? '一' : '二'}幕` })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Implement full CastDetailPanel with Framer Motion**

`src/components/CastDetailPanel.tsx`:
```tsx
import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useDragControls, type PanInfo } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import type { CastMember } from '../data/types'
import CastTags from './CastTags'
import WhySpecialCallout from './WhySpecialCallout'
import CastSongs from './CastSongs'

type Props = {
  member: CastMember | null
  onClose: () => void
}

const SWIPE_THRESHOLD = 120
const VELOCITY_THRESHOLD = 500

export default function CastDetailPanel({ member, onClose }: Props) {
  const { t } = useLanguage()
  const dragControls = useDragControls()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (member) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }
  }, [member, handleKeyDown])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > SWIPE_THRESHOLD || info.velocity.y > VELOCITY_THRESHOLD) {
      onClose()
    }
  }

  const useDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024

  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Scrim */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} details`}
            className={`fixed z-50 bg-surface overflow-y-auto ${
              useDesktop
                ? 'top-0 right-0 h-full w-[400px] rounded-none'
                : 'bottom-0 left-0 right-0 h-[90vh] rounded-t-2xl'
            }`}
            initial={useDesktop ? { x: '100%' } : { y: '100%' }}
            animate={useDesktop ? { x: 0 } : { y: 0 }}
            exit={useDesktop ? { x: '100%' } : { y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag={useDesktop ? false : 'y'}
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Drag handle (mobile) */}
            {!useDesktop && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted/40" />
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-bg/50 text-muted hover:text-foreground transition-colors"
              aria-label="Close panel"
            >
              ✕
            </button>

            <div className="p-6 space-y-5">
              {/* Photo */}
              <div className="aspect-[3/4] rounded-lg bg-bg overflow-hidden">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                    const fallback = document.createElement('span')
                    fallback.className = 'text-6xl text-muted'
                    fallback.textContent = member.name[0]
                    target.parentElement!.appendChild(fallback)
                  }}
                />
              </div>

              {/* Name + Role */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">{member.name}</h2>
                <p className="text-muted text-lg mt-1">{t(member.role)}</p>
              </div>

              {/* Tags + Awards */}
              <CastTags member={member} />

              {/* Why Special */}
              {member.whySpecial && <WhySpecialCallout whySpecial={member.whySpecial} />}

              {/* Bio */}
              <div>
                <p className="text-sm text-foreground/90 leading-relaxed">{t(member.bio)}</p>
              </div>

              {/* Songs */}
              <CastSongs songIds={member.songs} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 5: Verify in browser**

Expected:
- Click a cast card → panel slides up from bottom on mobile (< 1024px) or from right on desktop (>= 1024px)
- Scrim darkens the background; clicking scrim closes panel
- Escape key closes panel
- Mobile: drag down to dismiss (threshold: 120px or fast velocity)
- Panel shows: photo, name, role, tags, awards (Lea only), why-special callout (featured only), bio, songs
- Language toggle updates all panel text

- [ ] **Step 6: Commit**

```bash
git add src/components/CastDetailPanel.tsx src/components/CastTags.tsx src/components/WhySpecialCallout.tsx src/components/CastSongs.tsx
git commit -m "feat: add animated CastDetailPanel with tags, callout, bio, and songs"
```

---

### Task 11: SongsSection + SongRow + Footer

**Files:**
- Create: `src/components/SongsSection.tsx`, `src/components/SongRow.tsx`, `src/components/Footer.tsx`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Create SongRow**

`src/components/SongRow.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import type { Song } from '../data/types'

type Props = { song: Song }

export default function SongRow({ song }: Props) {
  const { t } = useLanguage()

  const actLabel = typeof song.act === 'number'
    ? t({ en: `Act ${song.act}`, zh: `第${song.act === 1 ? '一' : '二'}幕` })
    : t({
        en: song.act.charAt(0).toUpperCase() + song.act.slice(1),
        zh: song.act === 'prologue' ? '序幕' : '尾声',
      })

  return (
    <div className="flex items-center justify-between py-3 border-b border-surface-border last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-medium truncate">{t(song.title)}</p>
      </div>
      <p className="text-muted text-sm mx-4 hidden sm:block">{t(song.character)}</p>
      <span className="text-xs text-muted px-2.5 py-1 rounded-full bg-surface-border/50 whitespace-nowrap">
        {actLabel}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Create SongsSection**

`src/components/SongsSection.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'
import { songs } from '../data/songs'
import SongRow from './SongRow'

export default function SongsSection() {
  const { t } = useLanguage()

  return (
    <section id="songs" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-xs tracking-[4px] uppercase text-accent mb-8 text-center">
          {t({ en: 'Key Songs', zh: '经典曲目' })}
        </h2>
        <div className="bg-surface rounded-xl border border-surface-border p-4 sm:p-6">
          {songs.map((song) => (
            <SongRow key={song.id} song={song} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Footer**

`src/components/Footer.tsx`:
```tsx
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-4 border-t border-surface-border">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <p className="font-display text-sm tracking-widest uppercase text-muted">
          Les Misérables: The Arena Spectacular
        </p>
        <p className="text-xs text-muted">
          {t({
            en: 'Sands Theatre, Marina Bay Sands, Singapore · 24 Mar – 10 May 2026',
            zh: '滨海湾金沙·金沙剧场 · 2026年3月24日 – 5月10日',
          })}
        </p>
        <p className="text-xs text-muted">
          {t({
            en: 'Running time: ~3h 5min including 20-min interval · Rating: G (ages 8+ recommended)',
            zh: '演出时长：约3小时5分钟（含20分钟中场休息）· 分级：G（建议8岁以上观众）',
          })}
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <a
            href="https://www.marinabaysands.com/entertainment/shows/les-miserables.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:underline"
          >
            {t({ en: 'Official Tickets', zh: '官方购票' })}
          </a>
        </div>
        <p className="text-xs text-muted/60 pt-4">
          {t({
            en: 'Fan site — not affiliated with Cameron Mackintosh Ltd or Marina Bay Sands.',
            zh: '粉丝网站——与Cameron Mackintosh有限公司及滨海湾金沙无关。',
          })}
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Update Layout with SongsSection and Footer**

Replace remaining placeholders in `src/components/Layout.tsx`:
```tsx
import Nav from './Nav'
import HeroSection from './HeroSection'
import HighlightsSection from './HighlightsSection'
import CastSection from './CastSection'
import SongsSection from './SongsSection'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main>
        <HeroSection />
        <HighlightsSection />
        <CastSection />
        <SongsSection />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 5: Verify in browser**

Expected: Full page renders top to bottom — Nav, Hero, Highlights, Cast, Songs, Footer. All sections are bilingual. Songs show title, character (hidden on mobile), and act badge. Footer shows disclaimer.

- [ ] **Step 6: Commit**

```bash
git add src/components/SongsSection.tsx src/components/SongRow.tsx src/components/Footer.tsx src/components/Layout.tsx
git commit -m "feat: add SongsSection, SongRow, and Footer to complete all page sections"
```

---

### Task 12: MobileMenu Refinement + Accessibility + Polish

**Files:**
- Modify: `src/components/MobileMenu.tsx`, `src/components/CastDetailPanel.tsx`, `src/components/Nav.tsx`

- [ ] **Step 1: Add outside-click close to MobileMenu**

Update `src/components/MobileMenu.tsx`:
```tsx
import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

type Props = { onClose: () => void }

export default function MobileMenu({ onClose }: Props) {
  const { t } = useLanguage()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const links = [
    { href: '#highlights', label: { en: 'Highlights', zh: '亮点' } },
    { href: '#cast', label: { en: 'Cast', zh: '演员' } },
    { href: '#songs', label: { en: 'Songs', zh: '曲目' } },
  ]

  return (
    <div
      ref={menuRef}
      className="lg:hidden border-t border-surface-border bg-bg/95 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-sm text-muted hover:text-foreground py-2.5 transition-colors"
          >
            {t(link.label)}
          </a>
        ))}
        <div className="flex items-center gap-2 pt-3 mt-1 border-t border-surface-border">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add focus trapping to CastDetailPanel**

Install a focus trap library:
```bash
npm install focus-trap-react
```

Update `src/components/CastDetailPanel.tsx` — wrap the panel content in `FocusTrap`:

At the top of the file, add import:
```tsx
import FocusTrap from 'focus-trap-react'
```

Wrap the `<motion.div role="dialog" ...>` element with:
```tsx
<FocusTrap focusTrapOptions={{ initialFocus: false, allowOutsideClick: true }}>
  <motion.div role="dialog" ...>
    {/* existing panel content */}
  </motion.div>
</FocusTrap>
```

Note: `FocusTrap` requires a single child that can receive a ref. Since `motion.div` supports `ref`, this works directly.

- [ ] **Step 3: Add prefers-reduced-motion support**

In `src/index.css`, add:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Framer Motion automatically respects `prefers-reduced-motion` when using its `useReducedMotion` hook, but the CSS fallback catches any non-Framer transitions.

- [ ] **Step 4: Add bilingual nav links on desktop**

Update the desktop nav links in `src/components/Nav.tsx` to use `t()`:

```tsx
import { useLanguage } from '../contexts/LanguageContext'
// ... inside Nav component:
const { t } = useLanguage()

// Replace static link text with:
<a href="#highlights" className="text-sm text-muted hover:text-foreground transition-colors">
  {t({ en: 'Highlights', zh: '亮点' })}
</a>
<a href="#cast" className="text-sm text-muted hover:text-foreground transition-colors">
  {t({ en: 'Cast', zh: '演员' })}
</a>
<a href="#songs" className="text-sm text-muted hover:text-foreground transition-colors">
  {t({ en: 'Songs', zh: '曲目' })}
</a>
```

- [ ] **Step 5: Run TypeScript check and fix any errors**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 6: Full visual verification**

Test the following in browser:
1. Dark/light mode toggle — all sections update colors correctly
2. EN/中文 toggle — all text switches, `<html lang>` updates
3. Responsive: resize from mobile (375px) → tablet (768px) → desktop (1024px+)
4. Cast card click → panel opens with correct member data
5. Panel close: Escape key, scrim click, close button, swipe down (mobile)
6. Nav anchor links scroll to correct sections
7. Mobile hamburger menu opens/closes
8. Keyboard navigation: Tab through all interactive elements
9. prefers-reduced-motion: verify animations disabled in accessibility settings

- [ ] **Step 7: Build production bundle**

Run: `npm run build`
Expected: Build succeeds. `dist/` directory created with optimised assets.

Run: `npm run preview`
Expected: Preview server starts, site works identically to dev mode.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add accessibility, focus trapping, reduced motion, and final polish"
```

---

## Notes

- **Cast photos:** The `photoUrl` paths (`/images/cast/*.jpg`) are placeholders. Actual cast photos need to be sourced and placed in `public/images/cast/` before deployment. The CastCard and CastDetailPanel components include fallback rendering (initial letter) when images fail to load.
- **Chinese translations:** All Chinese content uses Simplified Chinese (zh-Hans). Translations may need review by a native speaker for naturalness.
- **Song-to-cast mapping:** Song assignments follow the main character attributions in the spec. "One Day More" is assigned to all principal cast as it is a full company number.
