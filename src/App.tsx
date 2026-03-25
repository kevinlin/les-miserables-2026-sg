import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout />
      </LanguageProvider>
    </ThemeProvider>
  )
}
