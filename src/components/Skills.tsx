import { skillGroups } from '@/content/skills'
import RevealOnScroll from './ui/RevealOnScroll'
import SkillsRack from './SkillsRack'

export default function Skills() {
  return (
    <section className="py-[clamp(100px,14vh,180px)]" id="skills">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <RevealOnScroll>
          <SkillsRack groups={skillGroups} />
        </RevealOnScroll>
      </div>
    </section>
  )
}
