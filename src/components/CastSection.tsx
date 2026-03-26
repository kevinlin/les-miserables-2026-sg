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

  const spotlightCast = standardCast.filter((m) => m.tags.includes('highlight'))
  const regularCast = standardCast.filter((m) => !m.tags.includes('highlight'))

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 items-start">
          {featuredCast.map((member) => (
            <CastCard key={member.id} member={member} variant="featured" onClick={handleCardClick} />
          ))}
        </div>

        {/* Spotlight row — highlight-tagged standard cast */}
        {spotlightCast.length > 0 && (
          <>
            <p className="font-display text-xs tracking-[4px] uppercase text-accent/70 mb-6 text-center">
              {t({ en: 'Spotlight', zh: '焦点演员' })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 items-start">
              {spotlightCast.map((member) => (
                <CastCard
                  key={member.id}
                  member={member}
                  variant="featured"
                  highlighted
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </>
        )}

        {/* Standard grid — 1/2/3 columns responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {regularCast.map((member) => (
            <CastCard key={member.id} member={member} variant="standard" onClick={handleCardClick} />
          ))}
        </div>
      </div>

      <CastDetailPanel member={selectedCast} onClose={handleClose} />
    </section>
  )
}
