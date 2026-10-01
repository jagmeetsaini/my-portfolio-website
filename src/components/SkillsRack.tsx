'use client'

import { useState, type CSSProperties } from 'react'
import type { SkillGroup } from '@/content/skills'
import { cn } from '@/lib/utils'

const SPECTRUM = ['green', 'violet', 'yellow', 'blue', 'rose', 'teal', 'orange', 'indigo']
const PER_ROW = 4
const RACK_U = 42
const mono = 'font-[var(--font-mono-loaded,var(--font-mono))]'
const pad = (n: number) => String(n).padStart(2, '0')

interface Props { groups: SkillGroup[] }

// Stacks units bottom-up from U01; each unit is ceil(tools / 4) U tall
function layoutRack(groups: SkillGroup[]) {
  let rail = 1
  const units = groups.map((g, i) => {
    const u = Math.max(1, Math.ceil(g.pills.length / PER_ROW))
    const start = rail
    rail += u
    const end = rail - 1
    return {
      ...g,
      index: i,
      u,
      label: u > 1 ? `U${pad(start)}–${pad(end)}` : `U${pad(start)}`,
      railNum: pad(start),
      slug: g.slug ?? g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      color: `var(--spec-${SPECTRUM[i % SPECTRUM.length]})`,
    }
  })
  return { units, usedU: rail - 1 }
}

export default function SkillsRack({ groups }: Props) {
  const { units, usedU } = layoutRack(groups)
  const toolCount = groups.reduce((n, g) => n + g.pills.length, 0)

  // Default to the largest unit so the detail panel starts on something meaty
  const largest = units.reduce((a, b) => (b.pills.length > a.pills.length ? b : a), units[0])
  const [sel, setSel] = useState(largest?.index ?? 0)
  const active = units[sel]

  return (
    <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_780px]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3.5">
          <span className={cn(mono, 'text-[11px] text-[var(--color-fg-faint)] uppercase tracking-[0.1em]')}>04 / skills</span>
          <span className={cn(mono, 'text-[12px] text-[var(--color-fg-muted)] tracking-[0.04em]')}>{toolCount} tools &amp; counting</span>
        </div>
        <h2
          className="font-[var(--font-display-loaded,var(--font-display))] font-medium tracking-[-0.035em] leading-none"
          style={{ fontSize: 'clamp(36px,5.5vw,64px)' }}
        >
          The stack I ship on.
        </h2>
        <p className="mt-4 text-[17px] leading-[1.55] text-[var(--color-fg-soft)]">
          {units.length} units, {toolCount} drives, racked in ap-south-1. Hover a unit to slide it out.
        </p>

        {active && (
          <div
            className="mt-10 xl:mt-auto xl:pt-10 flex flex-col gap-3"
            style={{ '--unit-color': active.color } as CSSProperties}
            aria-live="polite"
          >
            <span className={cn(mono, 'flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-faint)]')}>
              <span className="rack-sel-dot w-[7px] h-[7px] rounded-full" />
              {active.label} · {active.pills.length} drives · {active.u}U
            </span>
            <span className="text-[32px] leading-[1.05] font-medium tracking-[-0.03em]">{active.name}</span>
            {active.blurb && <span className="text-[15px] leading-[1.55] text-[var(--color-fg-muted)]">{active.blurb}</span>}
          </div>
        )}
      </div>

      <div className="overflow-x-auto -mx-[clamp(20px,5vw,80px)] px-[clamp(20px,5vw,80px)] xl:mx-0 xl:px-0">
        <div className="min-w-[640px] relative py-3.5 px-[34px] rounded-[8px] bg-[var(--rack)] border border-[var(--rack-line)]">
          <div className="flex flex-col gap-1.5">
            {units.map((unit) => {
              const on = unit.index === sel
              return (
                <div
                  key={unit.name}
                  data-on={on}
                  tabIndex={0}
                  aria-label={`${unit.name}: ${unit.pills.join(', ')}`}
                  onMouseEnter={() => setSel(unit.index)}
                  onFocus={() => setSel(unit.index)}
                  className={cn(
                    'rack-unit relative flex items-center gap-3.5 px-3.5 py-2 rounded-[4px] border border-[var(--unit-line)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fg)]',
                    'transition-[translate,background-color,border-color,box-shadow] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                    on ? 'bg-[var(--unit-on)] -translate-x-[22px]' : 'bg-[var(--unit)]'
                  )}
                  style={{ minHeight: 62 + (unit.u - 1) * 48, '--unit-color': unit.color } as CSSProperties}
                >
                  <span className={cn(mono, 'absolute -left-[26px] top-1/2 -translate-y-1/2 text-[9px] text-[var(--rail)]')}>{unit.railNum}</span>
                  <span className="absolute -right-6 top-1/2 -mt-[3px] w-[5px] h-[5px] rounded-full bg-[var(--vent)] border border-[var(--rack-line)]" />

                  <div className={cn(mono, 'w-24 flex-none flex flex-col gap-0.5')}>
                    <span className="text-[10px] tracking-[0.1em] text-[var(--rail)]">{unit.label}</span>
                    <span className="rack-slug text-[11px] tracking-[0.04em] text-[var(--label)] transition-colors duration-300">{unit.slug}</span>
                  </div>

                  <div className="flex-1 min-w-0 grid grid-cols-4 gap-1.5">
                    {unit.pills.map((tool, j) => (
                      <div
                        key={tool}
                        className="rack-bay min-w-0 min-h-[42px] flex flex-col justify-between gap-1 px-2 py-1.5 rounded-[3px] bg-[var(--bay)] border border-[var(--bay-line)] transition-colors duration-300"
                      >
                        <span className="flex gap-1">
                          <span className="rack-led w-[5px] h-[5px] rounded-full" />
                          <span
                            className="rack-act w-[5px] h-[5px] rounded-full"
                            style={{
                              animation: `led ${(0.5 + ((unit.index * 7 + j * 13) % 9) / 6).toFixed(2)}s steps(2, jump-none) infinite`,
                              animationDelay: `${(-((unit.index + j) % 5) * 0.23).toFixed(2)}s`,
                            }}
                          />
                        </span>
                        <span
                          className={cn(
                            mono,
                            'text-[10.5px] leading-[1.2] [overflow-wrap:anywhere] transition-colors duration-300',
                            on ? 'text-[var(--drive-text-on)]' : 'text-[var(--drive-text)]'
                          )}
                        >
                          {tool}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div aria-hidden className="w-10 flex-none flex gap-0.5 h-6">
                    {Array.from({ length: 6 }, (_, v) => (
                      <span key={v} className="flex-1 bg-[var(--vent)] rounded-[1px]" />
                    ))}
                  </div>
                </div>
              )
            })}

            <div className={cn(mono, 'relative min-h-[46px] flex items-center justify-between px-3.5 rounded-[4px] border border-dashed border-[var(--rack-line)] text-[10px] tracking-[0.08em] text-[var(--rail)]')}>
              <span className="absolute -left-[26px] top-1/2 -translate-y-1/2 text-[9px]">{pad(usedU + 1)}</span>
              <span>U{pad(usedU + 1)}–{RACK_U} · reserved for what’s next</span>
              <span>blanking panel</span>
            </div>
          </div>

          <div className={cn(mono, 'mt-3 flex justify-between text-[10px] tracking-[0.08em] text-[var(--rail)]')}>
            <span>RACK-01 · AP-SOUTH-1A · {usedU}/{RACK_U}U</span>
            <span>PWR A ● PWR B ●</span>
          </div>
        </div>
      </div>
    </div>
  )
}
