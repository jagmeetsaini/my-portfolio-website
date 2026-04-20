import { site } from '@/content/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)] pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] uppercase tracking-[0.08em] mb-4">
          <span className="w-6 h-px bg-[var(--color-fg)] inline-block" />
          End of file
        </div>

        {/* Huge wordmark */}
        <div
          aria-hidden
          className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.05em] leading-[0.85] mb-16 overflow-hidden group cursor-default select-none"
          style={{ fontSize: 'clamp(80px,18vw,260px)' }}
        >
          <span className="inline-block group-hover:-translate-x-2 transition-[translate] duration-[600ms] ease-[var(--ease)]">
            JAGMEET.
          </span>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-6 font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] border-t border-[var(--color-line)] pt-8 max-[600px]:grid-cols-1">
          <div>
            <div className="text-[10px] text-[var(--color-fg-faint)] uppercase tracking-[0.08em] mb-2">Elsewhere</div>
            <div className="text-[13px] text-[var(--color-fg)]">
              <a href={`mailto:${site.email}`} className="hover:underline">Email</a>
              {' · '}
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--color-fg-faint)] uppercase tracking-[0.08em] mb-2">Built with</div>
            <div className="text-[13px] text-[var(--color-fg)]">Next.js · Tailwind · a lot of care</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--color-fg-faint)] uppercase tracking-[0.08em] mb-2">© {year}</div>
            <div className="text-[13px] text-[var(--color-fg)]">Jagmeet S. Saini</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
