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
