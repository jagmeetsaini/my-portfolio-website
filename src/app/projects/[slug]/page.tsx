import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <Nav />
      <main className="pt-[120px] pb-[80px]">
        <div className="max-w-[800px] mx-auto px-[clamp(20px,5vw,80px)]">
          {/* Back */}
          <a
            href="/projects"
            className="inline-flex items-center gap-2 font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] uppercase tracking-widest hover:text-[var(--color-fg)] transition-colors duration-[200ms] mb-12"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 6H3M3 6l3-3M3 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All projects
          </a>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-muted)] border border-[var(--color-line)] px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-[1.1]"
              style={{ fontSize: 'clamp(32px,5vw,60px)' }}
            >
              {project.title}
            </h1>
            <p className="mt-4 text-[17px] text-[var(--color-fg-soft)] leading-[1.55]">{project.summary}</p>
            <p className="mt-3 font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-faint)]">{project.date}</p>
          </div>

          <hr className="border-[var(--color-line)] mb-12" />

          {/* MDX content */}
          <div className="prose prose-neutral max-w-none text-[var(--color-fg-soft)] [&_h2]:font-[var(--font-display-loaded,var(--font-display))] [&_h2]:text-[var(--color-fg)] [&_h2]:tracking-[-0.02em] [&_h2]:mt-10 [&_h2]:mb-4 [&_strong]:text-[var(--color-fg)] [&_a]:text-[var(--color-fg)] [&_a]:underline [&_ul]:pl-5 [&_li]:mb-1.5">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
