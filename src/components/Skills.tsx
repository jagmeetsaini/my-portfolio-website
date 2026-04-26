import { skillGroups } from '@/content/skills'
import RevealOnScroll from './ui/RevealOnScroll'
import SkillsViz from './SkillsViz'

export default function Skills() {
  const totalCount = skillGroups.reduce((acc, g) => acc + g.pills.length, 0)
  const nodes = skillGroups.flatMap(g =>
    g.pills.map(name => ({ name, category: g.name }))
  )

  return (
    <section className="py-[clamp(100px,14vh,180px)]" id="skills">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <div className="flex items-center justify-between mb-3.5">
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em]">
              04 / skills
            </span>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]">
              {totalCount} tools &amp; counting
            </span>
          </div>
          <h2
            className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-none mb-16"
            style={{ fontSize: 'clamp(36px,5.5vw,72px)' }}
          >
            The stack I ship on.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <SkillsViz nodes={nodes} />
        </RevealOnScroll>
      </div>
    </section>
  )
}
