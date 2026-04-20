import { skillGroups, marqueeSkills } from '@/content/skills'
import RevealOnScroll from './ui/RevealOnScroll'

export default function Skills() {
  const doubled = [...marqueeSkills, ...marqueeSkills]
  const totalCount = skillGroups.reduce((acc, g) => acc + g.pills.length, 0)

  return (
    <section className="py-[clamp(100px,14vh,180px)]" id="skills">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="flex items-baseline justify-between gap-10 mb-16 flex-wrap">
            <div>
              <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-3.5 block">
                04 / skills
              </span>
              <h2
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-none"
                style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
              >
                The stack I ship on.
              </h2>
            </div>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]">
              {totalCount} tools &amp; counting
            </span>
          </div>
        </RevealOnScroll>
      </div>

      {/* Marquee — full bleed, bleeds past container */}
      <RevealOnScroll delay={60}>
        <div className="overflow-hidden border-t border-b border-[var(--color-line)] py-7 mb-16">
          <div
            className="inline-flex gap-14 whitespace-nowrap animate-[marquee_45s_linear_infinite]"
            style={{ width: 'max-content' }}
          >
            {doubled.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-14 font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.02em]"
                style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}
              >
                {skill}
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-fg)] flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Skills grid */}
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll delay={120}>
          <div className="grid grid-cols-2 border-t border-[var(--color-line)] max-[780px]:grid-cols-1">
            {skillGroups.map((group, i) => (
              <div
                key={group.name}
                className={`py-9 border-b border-[var(--color-line)] ${
                  i % 2 === 0
                    ? 'pr-10 border-r border-[var(--color-line)] max-[780px]:pr-0 max-[780px]:border-r-0'
                    : 'pl-10 max-[780px]:pl-0'
                }`}
              >
                <div className="flex items-baseline justify-between mb-5">
                  <span
                    className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(18px,1.6vw,22px)' }}
                  >
                    {group.name}
                  </span>
                  <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)]">
                    {String(group.pills.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2 list-none p-0">
                  {group.pills.map((pill) => (
                    <li
                      key={pill}
                      className="font-[var(--font-mono-loaded,var(--font-mono))] text-[13px] text-[var(--color-fg-soft)] border border-[var(--color-line)] px-[14px] py-[7px] rounded-full bg-[var(--color-bg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] hover:border-[var(--color-fg)] hover:-translate-y-0.5 transition-[background,color,border-color,translate] duration-[200ms] cursor-default"
                    >
                      {pill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
