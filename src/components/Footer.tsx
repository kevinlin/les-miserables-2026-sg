import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-4 border-t border-surface-border">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <p className="font-display text-sm tracking-widest uppercase text-muted">
          Les Misérables: The Arena Spectacular
        </p>
        <p className="text-xs text-muted">
          {t({
            en: 'Sands Theatre, Marina Bay Sands, Singapore · 24 Mar – 10 May 2026',
            zh: '滨海湾金沙·金沙剧场 · 2026年3月24日 – 5月10日',
          })}
        </p>
        <p className="text-xs text-muted">
          {t({
            en: 'Approx. 185 mins (incl. 20-min intermission) · Language: English · Rating: G (ages 8+ recommended)',
            zh: '演出时长：约185分钟（含20分钟中场休息）· 演出语言：英语 · 分级：G（建议8岁以上）',
          })}
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <a
            href="https://www.marinabaysands.com/entertainment/shows/les-miserables.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:underline"
          >
            {t({ en: 'Official Tickets', zh: '官方购票' })}
          </a>
        </div>
        <p className="text-xs text-muted/60 pt-4">
          {t({
            en: 'Fan site — not affiliated with Cameron Mackintosh Ltd or Marina Bay Sands.',
            zh: '粉丝网站——与Cameron Mackintosh有限公司及滨海湾金沙无关。',
          })}
        </p>
      </div>
    </footer>
  )
}
