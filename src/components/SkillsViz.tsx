'use client'

import { useState, useCallback } from 'react'
import SkillSphere, { type SkillNode } from './ui/SkillSphere'
import { getIcon } from './ui/SkillIcons'

const CATEGORY_COLORS: Record<string, string> = {
  'Cloud platforms': '#22c55e',
  'Infrastructure as Code': '#a855f7',
  'Containers & orchestration': '#eab308',
  'CI/CD & version control': '#3b82f6',
  'Scripting & automation': '#f43f5e',
  'Observability': '#14b8a6',
  'Security & compliance': '#ef4444',
  'Data & storage': '#818cf8',
}

interface Props {
  nodes: SkillNode[]
  categories: string[]
}

export default function SkillsViz({ nodes, categories }: Props) {
  const [hovered, setHovered] = useState<SkillNode | null>(null)
  const [selected, setSelected] = useState<SkillNode | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleNodeClick = useCallback((node: SkillNode | null) => {
    if (node) {
      setSelected(prev => prev?.name === node.name ? null : node)
      setSelectedCategory(null)
    } else {
      setSelected(null)
      setSelectedCategory(null)
    }
  }, [])

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(prev => prev === cat ? null : cat)
    setSelected(null)
  }

  const display = selected ?? hovered
  const Icon = display ? getIcon(display.name) : null

  return (
    <div>
      <div className="flex gap-10 items-center max-[768px]:flex-col-reverse">

        {/* Info panel — LEFT */}
        <div className="w-[260px] flex-shrink-0 flex flex-col justify-center min-h-[260px] max-[768px]:w-full max-[768px]:min-h-[100px]">
          {display ? (
            <div className="flex flex-col">
              <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-3">
                {display.category}
              </span>
              <span
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.03em] leading-none text-[var(--color-fg)] mb-8"
                style={{ fontSize: 'clamp(22px,2.4vw,34px)' }}
              >
                {display.name}
              </span>
              {Icon && (
                <div className="w-[80px] h-[80px] text-[var(--color-fg-faint)]">
                  <Icon className="w-full h-full" />
                </div>
              )}
            </div>
          ) : (
            <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[12px] text-[var(--color-fg-faint)] tracking-[0.04em]">
              // hover or click a node
            </span>
          )}
        </div>

        {/* Sphere — RIGHT */}
        <div className="flex-1 min-w-0">
          <SkillSphere
            nodes={nodes}
            onHover={setHovered}
            onNodeClick={handleNodeClick}
            selectedNode={selected}
            selectedCategory={selectedCategory}
          />
        </div>

      </div>

      {/* Category legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 pl-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`flex items-center gap-2 font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] tracking-[0.06em] uppercase transition-opacity duration-200 ${
              selectedCategory && selectedCategory !== cat ? 'opacity-25' : 'opacity-100'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: CATEGORY_COLORS[cat] ?? '#888' }}
            />
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
