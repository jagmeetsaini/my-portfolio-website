import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <hr className="border-[var(--color-line)] mx-[clamp(20px,5vw,80px)]" />
        <About />
        <hr className="border-[var(--color-line)] mx-[clamp(20px,5vw,80px)]" />
        <Experience />
        <hr className="border-[var(--color-line)] mx-[clamp(20px,5vw,80px)]" />
        <Projects />
        <hr className="border-[var(--color-line)] mx-[clamp(20px,5vw,80px)]" />
        <Skills />
        <hr className="border-[var(--color-line)] mx-[clamp(20px,5vw,80px)]" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
