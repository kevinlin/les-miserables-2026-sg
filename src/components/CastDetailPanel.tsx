import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useDragControls, type PanInfo } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
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
          <FocusTrap focusTrapOptions={{ initialFocus: false, allowOutsideClick: true }}>
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
          </FocusTrap>
        </>
      )}
    </AnimatePresence>
  )
}
