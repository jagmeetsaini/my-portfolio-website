import { getAllProjects } from '@/lib/projects'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

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
            <ol className="grid gap-0 list-none p-0 m-0 border-t border-[var(--color-line)]">
              {projects.map((proj, idx) => (
                <li key={proj.slug} className="proj group relative border-b border-[var(--color-line)] overflow-hidden">
                  <a
                    href={`/projects/${proj.slug}`}
                    className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-8 py-[28px] px-[2px] transition-[padding-left] duration-[360ms] hover:pl-3 max-[700px]:grid-cols-1 max-[700px]:gap-3"
                  >
                    <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] tracking-widest w-8 group-hover:text-[var(--color-bg)] transition-colors duration-[360ms]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h2
                        className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.02em] leading-[1.15] group-hover:text-[var(--color-bg)] transition-colors duration-[360ms]"
                        style={{ fontSize: 'clamp(20px,2vw,28px)' }}
                      >
                        {proj.title}
                      </h2>
                      <p className="mt-1.5 text-[14px] text-[var(--color-fg-soft)] leading-[1.5] max-w-[60ch] group-hover:text-[var(--color-bg)] transition-colors duration-[360ms] opacity-80">
                        {proj.summary}
                      </p>
                    </div>
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
                  <div className="absolute inset-0 bg-[var(--color-fg)] origin-left scale-x-0 group-hover:scale-x-100 transition-[scale] duration-[360ms] ease-[var(--ease)] pointer-events-none" />
                </li>
              ))}
            </ol>
          </RevealOnScroll>
        </div>
      </main>
      <Footer />
    </>
  )
}
