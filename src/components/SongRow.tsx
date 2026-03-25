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
