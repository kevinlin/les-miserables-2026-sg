import { useLanguage } from '../contexts/LanguageContext'
import type { CastMember } from '../data/types'

type Props = {
  member: CastMember
  variant: 'featured' | 'standard'
  highlighted?: boolean
  onClick: (member: CastMember) => void
}

export default function CastCard({ member, variant, highlighted = false, onClick }: Props) {
  const { t } = useLanguage()
  const photoSrc = `${import.meta.env.BASE_URL}${member.photoUrl.replace(/^\//, '')}`

  const highlightBorder = highlighted
    ? 'border-accent/50 shadow-[0_0_20px_rgba(122,184,212,0.15)]'
    : 'border-surface-border'

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onClick(member)}
        className={`group text-left w-full rounded-xl bg-surface border overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(122,184,212,0.25)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${highlightBorder}`}
      >
        <div className="aspect-[3/4] bg-surface overflow-hidden">
          <img
            src={photoSrc}
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
          {(member.tags.length > 0 || highlighted) && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {member.tags.includes('featured') && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">★ Featured</span>
              )}
              {highlighted && !member.tags.includes('featured') && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                  ★ Spotlight
                </span>
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
          src={photoSrc}
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
