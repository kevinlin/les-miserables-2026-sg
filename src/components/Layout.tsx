import Nav from './Nav'
import HeroSection from './HeroSection'
import HighlightsSection from './HighlightsSection'
import CastSection from './CastSection'
import SongsSection from './SongsSection'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main>
        <HeroSection />
        <HighlightsSection />
        <CastSection />
        <SongsSection />
      </main>
      <Footer />
    </div>
  )
}
