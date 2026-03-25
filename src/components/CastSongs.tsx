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
