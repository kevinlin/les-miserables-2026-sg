import { useLanguage } from '../contexts/LanguageContext'
import type { Bilingual } from '../data/types'

type Props = { whySpecial: Bilingual }

export default function WhySpecialCallout({ whySpecial }: Props) {
  const { t } = useLanguage()

  return (
    <div className="rounded-lg bg-accent/5 border border-accent/20 p-4">
      <p className="text-xs font-display tracking-[2px] uppercase text-accent mb-2">
        {t({ en: 'Why Special', zh: '为何特别' })}
      </p>
      <p className="text-sm text-foreground leading-relaxed">{t(whySpecial)}</p>
    </div>
  )
}
