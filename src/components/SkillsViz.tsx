'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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

interface Props { nodes: SkillNode[]; categories: string[] }

export default function SkillsViz({ nodes, categories }: Props) {
  const [hovered, setHovered] = useState<SkillNode | null>(null)
  const [selected, setSelected] = useState<SkillNode | null>(nodes[0] ?? null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const autoPausedRef = useRef(false)
  const autoIdxRef = useRef(0)

  // Auto-cycle through all nodes
  useEffect(() => {
    const tick = setInterval(() => {
      if (autoPausedRef.current) return
      autoIdxRef.current = (autoIdxRef.current + 1) % nodes.length
      setSelected(nodes[autoIdxRef.current])
      setSelectedCategory(null)
    }, 2200)
    return () => clearInterval(tick)
  }, [nodes])

  const handleHover = useCallback((node: SkillNode | null) => {
    setHovered(node)
    if (node) autoPausedRef.current = true
    else autoPausedRef.current = false
  }, [])

  const handleNodeClick = useCallback((node: SkillNode | null) => {
    if (node) {
      autoPausedRef.current = true
      setSelected(prev => prev?.name === node.name ? null : node)
      setSelectedCategory(null)
    } else {
      setSelected(null)
      setSelectedCategory(null)
      autoPausedRef.current = false
    }
  }, [])

  const handleCategoryClick = (cat: string) => {
    const isDeselect = selectedCategory === cat
    setSelectedCategory(isDeselect ? null : cat)
    setSelected(null)
    autoPausedRef.current = !isDeselect
  }

  const display = hovered ?? selected
  const Icon = display ? getIcon(display.name) : null

  return (
    <div>
      {/* Sphere + info overlay */}
      <div className="relative h-[500px] max-[600px]:h-[420px]">
        <SkillSphere
          nodes={nodes}
          onHover={handleHover}
          onNodeClick={handleNodeClick}
          selectedNode={selected}
          selectedCategory={selectedCategory}
        />

        {/* Info panel — absolute left overlay */}
        <div className="absolute left-0 top-0 h-full w-[260px] flex flex-col justify-center pointer-events-none max-[600px]:w-full max-[600px]:bottom-0 max-[600px]:top-auto max-[600px]:h-auto max-[600px]:pb-4">
          {display ? (
            <div className="flex flex-col">
              <span className="font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em] mb-2">
                {display.category}
              </span>
              <span
                className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.03em] leading-none text-[var(--color-fg)] mb-5"
                style={{ fontSize: 'clamp(18px,2vw,30px)' }}
              >
                {display.name}
              </span>
              {Icon && (
                <div className="w-[56px] h-[56px] text-[var(--color-fg-faint)]">
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

        {/* Hint — top right */}
        <span className="absolute top-0 right-0 font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] text-[var(--color-fg-faint)] tracking-[0.04em] pointer-events-none max-[600px]:hidden">
          drag · hover · explore
        </span>
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-3 mt-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`flex items-center gap-2 font-[var(--font-mono-loaded,var(--font-mono))] text-[11px] tracking-[0.06em] uppercase transition-opacity duration-200 ${
              selectedCategory && selectedCategory !== cat ? 'opacity-25' : 'opacity-100'
            }`}
          >
            <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: CATEGORY_COLORS[cat] ?? '#888' }} />
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
