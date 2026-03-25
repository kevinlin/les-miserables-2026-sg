import { useLanguage } from '../contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-accent font-display text-xs tracking-[4px] uppercase mb-4">
          {t({ en: 'Cameron Mackintosh presents', zh: 'Cameron Mackintosh 呈献' })}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
          Les Misérables
        </h1>
        <p className="font-display text-lg sm:text-xl text-muted tracking-wide uppercase mb-6">
          {t({ en: 'The Arena Spectacular', zh: '大型场馆震撼版' })}
        </p>
        <p className="text-muted text-sm sm:text-base mb-2">
          {t({ en: 'Sands Theatre, Marina Bay Sands', zh: '滨海湾金沙·金沙剧场' })}
        </p>
        <p className="text-muted text-sm sm:text-base mb-8">
          {t({ en: '24 March – 10 May 2026', zh: '2026年3月24日 – 5月10日' })}
        </p>
        <a
          href="https://www.marinabaysands.com/entertainment/shows/les-miserables.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-accent text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          {t({ en: 'Get Tickets', zh: '购票' })}
        </a>
      </div>
    </section>
  )
}
