import Nav from './Nav'
import HeroSection from './HeroSection'
import HighlightsSection from './HighlightsSection'
import CastSection from './CastSection'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main>
        <HeroSection />
        <HighlightsSection />
        <CastSection />
        <section id="songs" className="p-8">Songs placeholder</section>
      </main>
      <footer className="p-8 text-muted">Footer placeholder</footer>
    </div>
  )
}
