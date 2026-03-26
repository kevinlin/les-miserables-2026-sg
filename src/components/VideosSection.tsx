import { useLanguage } from '../contexts/LanguageContext'

const videos = [
  { bvid: 'BV1gK4y1t7gv', page: 2 },
  { bvid: 'BV1ks411f7zK', page: 1 },
]

export default function VideosSection() {
  const { t } = useLanguage()

  return (
    <section id="videos" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-xs tracking-[4px] uppercase text-accent mb-8 text-center">
          {t({ en: 'Official Recordings', zh: '官方录像' })}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {videos.map(({ bvid, page }) => (
            <div key={bvid} className="rounded-xl overflow-hidden bg-surface border border-surface-border">
              <div className="relative aspect-video">
                <iframe
                  src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=${page}&high_quality=1&danmaku=0`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  title={t({ en: 'Les Misérables Official Recording', zh: '《悲惨世界》官方录像' })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
