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
