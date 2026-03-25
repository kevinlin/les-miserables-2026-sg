import Nav from './Nav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main>
        <section id="hero" className="p-8">Hero placeholder</section>
        <section id="highlights" className="p-8">Highlights placeholder</section>
        <section id="cast" className="p-8">Cast placeholder</section>
        <section id="songs" className="p-8">Songs placeholder</section>
      </main>
      <footer className="p-8 text-muted">Footer placeholder</footer>
    </div>
  )
}
