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
    { href: '#schedule', label: { en: 'Schedule', zh: '时间表' } },
    { href: '#highlights', label: { en: 'Highlights', zh: '亮点' } },
    { href: '#cast', label: { en: 'Cast', zh: '演员' } },
    { href: '#songs', label: { en: 'Songs', zh: '曲目' } },
    { href: '#videos', label: { en: 'Videos', zh: '录像' } },
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
