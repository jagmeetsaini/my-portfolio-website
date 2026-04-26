import { getFeaturedProjects } from '@/lib/projects'
import RevealOnScroll from './ui/RevealOnScroll'
import ProjectCard from './ui/ProjectCard'

export default function Projects() {
  const projects = getFeaturedProjects()

  return (
    <section className="py-[clamp(100px,14vh,180px)]" id="projects">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="flex items-baseline justify-between gap-10 mb-16 flex-wrap">
            <div>
              <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-3.5 block">
                03 / projects
              </span>
              <h2
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-none max-w-[16ch]"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                Things I&apos;ve shipped.
              </h2>
            </div>
            <a
              href="/projects"
              className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em] underline underline-offset-4 hover:text-[var(--color-fg)] transition-colors duration-[200ms]"
            >
              all projects →
            </a>
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
    </section>
  )
}
