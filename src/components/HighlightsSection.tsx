import { useLanguage } from '../contexts/LanguageContext'
import { highlights } from '../data/highlights'
import HighlightCard from './HighlightCard'

export default function HighlightsSection() {
  const { t } = useLanguage()

  return (
    <section id="highlights" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-xs tracking-[4px] uppercase text-accent mb-8 text-center">
          {t({ en: 'What Makes This Special', zh: '为何特别' })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <HighlightCard key={h.id} highlight={h} />
          ))}
        </div>
      </div>
    </section>
  )
}
