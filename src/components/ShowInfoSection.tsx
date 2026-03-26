import { useLanguage } from '../contexts/LanguageContext'

export default function ShowInfoSection() {
  const { t } = useLanguage()

  return (
    <section id="schedule" className="py-16 px-4 border-t border-surface-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-xs tracking-[4px] uppercase text-accent mb-8 text-center">
          {t({ en: 'Performance Schedule', zh: '演出时间表' })}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Off-Peak */}
          <div className="bg-surface rounded-xl p-5 space-y-3">
            <p className="text-xs font-medium tracking-widest uppercase text-muted">
              {t({ en: 'Off-Peak', zh: '非高峰' })}
            </p>
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-foreground font-medium">
                  {t({ en: 'Tue – Thu', zh: '周二至周四' })}
                </span>
                <span className="text-sm text-muted tabular-nums">8pm</span>
              </div>
              <p className="text-xs text-muted/70">
                {t({ en: 'Excluding eve of public holidays & public holidays', zh: '公共假日前夕及公共假日除外' })}
              </p>
            </div>
          </div>

          {/* Peak */}
          <div className="bg-surface rounded-xl p-5 space-y-3">
            <p className="text-xs font-medium tracking-widest uppercase text-accent">
              {t({ en: 'Peak', zh: '高峰' })}
            </p>
            <div className="space-y-2">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-foreground font-medium">
                    {t({ en: 'Thu – Fri', zh: '周四至周五' })}
                  </span>
                  <span className="text-sm text-muted tabular-nums">8pm</span>
                </div>
                <p className="text-xs text-muted/70">
                  {t({ en: 'Including eve of public holidays & public holidays', zh: '包括公共假日前夕及公共假日' })}
                </p>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-foreground font-medium">
                  {t({ en: 'Sat', zh: '周六' })}
                </span>
                <span className="text-sm text-muted tabular-nums">2pm &amp; 8pm</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-foreground font-medium">
                  {t({ en: 'Sun', zh: '周日' })}
                </span>
                <span className="text-sm text-muted tabular-nums">1pm &amp; 6.30pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional details */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted border-t border-surface-border pt-6">
          <span>
            <span className="text-muted/60 text-xs uppercase tracking-wider mr-1.5">
              {t({ en: 'Duration', zh: '演出时长' })}
            </span>
            {t({ en: 'Approx. 185 mins (incl. 20-min intermission)', zh: '约185分钟（含20分钟中场休息）' })}
          </span>
          <span>
            <span className="text-muted/60 text-xs uppercase tracking-wider mr-1.5">
              {t({ en: 'Language', zh: '演出语言' })}
            </span>
            {t({ en: 'English', zh: '英语' })}
          </span>
          <span>
            <span className="text-muted/60 text-xs uppercase tracking-wider mr-1.5">
              {t({ en: 'Rating', zh: '分级' })}
            </span>
            {t({ en: 'G (ages 8+ recommended)', zh: 'G（建议8岁以上）' })}
          </span>
        </div>
      </div>
    </section>
  )
}
