import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}

