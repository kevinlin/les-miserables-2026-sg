import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Bilingual } from '../data/types'

type Lang = 'en' | 'zh'

type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (b: Bilingual) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang')
    return stored === 'zh' ? 'zh' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en'
    localStorage.setItem('lang', lang)
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])

  const t = useCallback((b: Bilingual) => b[lang], [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
