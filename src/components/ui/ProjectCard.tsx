'use client'

type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
}

const SiemSvg = () => (
  <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="38" height="26" rx="4" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 2" opacity="0.5"/>
    <rect x="56" y="8" width="38" height="26" rx="4" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 2" opacity="0.5"/>
    <rect x="8" y="86" width="38" height="26" rx="4" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 2" opacity="0.5"/>
    <rect x="56" y="86" width="38" height="26" rx="4" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 2" opacity="0.5"/>
    <circle cx="75" cy="60" r="9" fill="currentColor" opacity="0.4"/>
    <line x1="27" y1="34" x2="67" y2="51" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.3"/>
    <line x1="75" y1="34" x2="75" y2="51" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.3"/>
    <line x1="27" y1="86" x2="67" y2="69" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.3"/>
    <line x1="75" y1="86" x2="75" y2="69" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.3"/>
    <rect x="104" y="30" width="38" height="26" rx="4" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 2" opacity="0.5"/>
    <rect x="104" y="64" width="38" height="26" rx="4" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 2" opacity="0.5"/>
    <line x1="84" y1="55" x2="104" y2="43" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.3"/>
    <line x1="84" y1="65" x2="104" y2="77" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.3"/>
  </svg>
)

const RegionSvg = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.3"/>
    <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="1" opacity="0.45"/>
    <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.7"/>
    <circle cx="110" cy="60" r="5.5" fill="currentColor" opacity="0.5"/>
    <circle cx="10" cy="60" r="5.5" fill="currentColor" opacity="0.5"/>
    <circle cx="60" cy="10" r="5.5" fill="currentColor" opacity="0.5"/>
    <circle cx="60" cy="110" r="5.5" fill="currentColor" opacity="0.5"/>
    <circle cx="90" cy="60" r="3.5" fill="currentColor" opacity="0.35"/>
    <circle cx="30" cy="60" r="3.5" fill="currentColor" opacity="0.35"/>
  </svg>
)

const S3Svg = () => (
  <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="22" height="78" rx="4" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
    <line x1="10" y1="34" x2="32" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <rect x="42" y="36" width="22" height="62" rx="4" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
    <line x1="42" y1="50" x2="64" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <rect x="74" y="26" width="22" height="72" rx="4" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
    <line x1="74" y1="40" x2="96" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <rect x="106" y="42" width="22" height="56" rx="4" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
    <line x1="106" y1="56" x2="128" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <path d="M21 98 L21 108 L33 108" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
    <path d="M53 98 L53 108 L65 108" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
    <path d="M85 98 L85 108 L97 108" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
  </svg>
)

const FallbackSvg = () => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
    {Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 6 }, (_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={12 + col * 20}
          cy={10 + row * 20}
          r="2"
          fill="currentColor"
          opacity={0.15 + ((row + col) % 3) * 0.12}
        />
      ))
    )}
  </svg>
)

const ILLUSTRATIONS: Record<string, () => React.ReactElement> = {
  'siem-integration': SiemSvg,
  'region-automation': RegionSvg,
  's3-pipeline': S3Svg,
}

export default function ProjectCard({ proj, idx }: { proj: Project; idx: number }) {
  const Illustration = ILLUSTRATIONS[proj.slug] ?? FallbackSvg

  return (
    <li className="group relative overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-[var(--color-bg)]">
      {/* Bottom-to-top fill */}
      <div className="absolute inset-0 bg-[var(--color-fg)] translate-y-full group-hover:translate-y-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none rounded-[14px]" />

      <a href={`/projects/${proj.slug}`} className="relative z-10 flex flex-col p-6 h-full">
        {/* Top row */}
        <div className="flex items-start justify-between mb-7">
          <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] tracking-[0.1em] group-hover:text-[var(--color-fg-muted)] transition-colors duration-[350ms]">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div className="w-[34px] h-[34px] rounded-full border border-[var(--color-line)] flex items-center justify-center group-hover:bg-[var(--color-bg)] group-hover:border-[var(--color-bg)] transition-colors duration-[350ms]">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 12L12 2M12 2H5M12 2V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Illustration — floats up and rotates on hover */}
        <div className="flex items-center justify-center min-h-[140px] mb-7 text-[var(--color-fg-muted)] group-hover:text-[var(--color-bg)] group-hover:-translate-y-2 group-hover:-rotate-[5deg] group-hover:scale-105 transition-[transform,color] duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
          <Illustration />
        </div>

        {/* Title */}
        <h3
          className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.02em] leading-[1.2] mb-2.5 group-hover:text-[var(--color-bg)] transition-colors duration-[350ms]"
          style={{ fontSize: 'clamp(18px,1.6vw,22px)' }}
        >
          {proj.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[var(--color-fg-soft)] leading-[1.55] mb-5 opacity-80 group-hover:text-[var(--color-bg)] transition-colors duration-[350ms]">
          {proj.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {proj.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-[var(--font-mono-loaded,var(--font-mono))] text-[10px] uppercase tracking-[0.06em] border border-[var(--color-line)] rounded-full px-2.5 py-1 text-[var(--color-fg-muted)] group-hover:border-[var(--color-fg-muted)] group-hover:text-[var(--color-bg)] transition-colors duration-[350ms]"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </li>
  )
}
