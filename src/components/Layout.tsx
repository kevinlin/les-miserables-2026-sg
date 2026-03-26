import Nav from './Nav'
import HeroSection from './HeroSection'
import ShowInfoSection from './ShowInfoSection'
import HighlightsSection from './HighlightsSection'
import CastSection from './CastSection'
import SongsSection from './SongsSection'
import VideosSection from './VideosSection'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main>
        <HeroSection />
        <ShowInfoSection />
        <HighlightsSection />
        <CastSection />
        <SongsSection />
        <VideosSection />
      </main>
      <Footer />
    </div>
  )
}
