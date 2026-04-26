'use client'

import { useState } from 'react'
import SkillSphere, { type SkillNode } from './ui/SkillSphere'

export default function SkillsViz({ nodes }: { nodes: SkillNode[] }) {
  const [hovered, setHovered] = useState<SkillNode | null>(null)

  return (
    <div className="flex gap-8 items-center max-[768px]:flex-col">
      <div className="flex-[3] min-w-0">
        <SkillSphere nodes={nodes} onHover={setHovered} />
      </div>
      <div className="flex-[2] flex flex-col justify-center min-h-[160px] max-[768px]:min-h-[80px]">
        {hovered ? (
          <>
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-3">
              {hovered.category}
            </span>
            <span
              className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.03em] leading-none text-[var(--color-fg)]"
              style={{ fontSize: 'clamp(28px,3vw,42px)' }}
            >
              {hovered.name}
            </span>
          </>
        ) : (
          <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-faint)] tracking-[0.04em]">
            // hover a node
          </span>
        )}
      </div>
    </div>
  )
}
