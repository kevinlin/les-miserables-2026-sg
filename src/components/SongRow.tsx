import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import type { Song } from '../data/types'

type Props = { song: Song }

export default function SongRow({ song }: Props) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const actLabel = typeof song.act === 'number'
    ? t({ en: `Act ${song.act}`, zh: `第${song.act === 1 ? '一' : '二'}幕` })
    : t({
        en: song.act.charAt(0).toUpperCase() + song.act.slice(1),
        zh: song.act === 'prologue' ? '序幕' : '尾声',
      })

  return (
    <div className="border-b border-surface-border last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="flex items-center justify-between w-full py-3 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium truncate">{t(song.title)}</p>
        </div>
        <p className="text-muted text-sm mx-4 hidden sm:block">{t(song.character)}</p>
        <span className="text-xs text-muted px-2.5 py-1 rounded-full bg-surface-border/50 whitespace-nowrap">
          {actLabel}
        </span>
        <svg
          className={`w-4 h-4 ml-3 text-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-1 space-y-2">
              <p className="text-sm text-muted sm:hidden">{t(song.character)}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{t(song.context)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
