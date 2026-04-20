import { getFeaturedProjects } from '@/lib/projects'
import RevealOnScroll from './ui/RevealOnScroll'

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
          <ol className="grid gap-0 list-none p-0 m-0 border-t border-[var(--color-line)]">
            {projects.map((proj, idx) => (
              <li key={proj.slug} className="proj group relative border-b border-[var(--color-line)] overflow-hidden">
                <a
                  href={`/projects/${proj.slug}`}
                  className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-8 py-[28px] px-[2px] transition-[padding-left] duration-[360ms] hover:pl-3 max-[700px]:grid-cols-1 max-[700px]:gap-3"
                >
                  {/* Index */}
                  <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] tracking-widest w-8 group-hover:text-[var(--color-bg)] transition-colors duration-[360ms]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Title + summary */}
                  <div className="min-w-0">
                    <h3
                      className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.02em] leading-[1.15] group-hover:text-[var(--color-bg)] transition-colors duration-[360ms]"
                      style={{ fontSize: 'clamp(20px,2vw,28px)' }}
                    >
                      {proj.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-[var(--color-fg-soft)] leading-[1.5] max-w-[60ch] group-hover:text-[var(--color-bg)] transition-colors duration-[360ms] opacity-80">
                      {proj.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-end max-[700px]:justify-start">
                    {proj.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] border border-[var(--color-line)] px-2.5 py-1 rounded-full bg-[var(--color-bg)] group-hover:border-[var(--color-bg)] group-hover:text-[var(--color-fg)] group-hover:bg-[var(--color-bg)] transition-colors duration-[360ms]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>

                {/* Hover fill — sweeps from left */}
                <div className="absolute inset-0 bg-[var(--color-fg)] origin-left scale-x-0 group-hover:scale-x-100 transition-[scale] duration-[360ms] ease-[var(--ease)] pointer-events-none" />
              </li>
            ))}
          </ol>
        </RevealOnScroll>
      </div>
    </section>
  )
}
