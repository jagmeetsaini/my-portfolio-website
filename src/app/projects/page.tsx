import { getAllProjects } from '@/lib/projects'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ProjectCard from '@/components/ui/ProjectCard'

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <>
      <Nav />
      <main className="pt-[120px] pb-[80px]">
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
          <RevealOnScroll>
            <div className="mb-16">
              <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-3.5 block">
                all projects
              </span>
              <h1
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-none"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Everything I&apos;ve shipped.
              </h1>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <ol className="grid grid-cols-3 gap-4 list-none p-0 m-0 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {projects.map((proj, idx) => (
                <ProjectCard key={proj.slug} proj={proj} idx={idx} />
              ))}
            </ol>
          </RevealOnScroll>
        </div>
      </main>
      <Footer />
    </>
  )
}
