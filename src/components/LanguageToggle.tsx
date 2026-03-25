import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      className="px-3 py-1.5 text-sm font-medium rounded-md border border-surface-border text-foreground hover:text-accent transition-colors"
      aria-label={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
    >
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  )
}
