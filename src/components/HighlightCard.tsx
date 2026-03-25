import { useLanguage } from '../contexts/LanguageContext'
import type { Highlight } from '../data/types'

type Props = { highlight: Highlight }

export default function HighlightCard({ highlight }: Props) {
  const { t } = useLanguage()

  return (
    <div className="p-6 rounded-xl bg-surface border border-surface-border hover:border-accent/30 transition-colors">
      <span className="text-3xl mb-3 block">{highlight.icon}</span>
      <h3 className="font-display text-lg font-bold text-foreground mb-2">
        {t(highlight.title)}
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        {t(highlight.body)}
      </p>
    </div>
  )
}
