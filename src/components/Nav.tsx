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
