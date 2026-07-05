import { useEffect, useId, useState } from 'react'
import { ILLU, STAGE, VB, lerp } from './shared'
import { IllustrationFrame } from './IllustrationFrame'

interface WorkshopAnimationProps {
  phase: number
  playing: boolean
}

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v))
}

function seg(p: number, start: number, end: number) {
  if (end <= start) return p >= end ? 1 : 0
  return clamp((p - start) / (end - start))
}

function ease(t: number) {
  return 1 - (1 - t) ** 3
}

function segE(p: number, start: number, end: number) {
  return ease(seg(p, start, end))
}

const CANVAS = { x: 118, y: 40, w: 228, h: 192 }
const DOCK = { x: 24, y: 36, w: 86, h: 268 }

const NOTES = [
  { sx: 340, sy: 52, tx: 34, ty: 52, rot: 12, delay: 0 },
  { sx: 52, sy: 280, tx: 34, ty: 96, rot: -14, delay: 0.06 },
  { sx: 360, sy: 200, tx: 34, ty: 140, rot: 8, delay: 0.12 },
  { sx: 68, sy: 48, tx: 72, ty: 68, rot: -6, delay: 0.18 },
  { sx: 320, sy: 290, tx: 72, ty: 112, rot: 10, delay: 0.24 },
] as const

const RESEARCH = [
  { x: 118, y: 72, w: 72, h: 48, delay: 0.22 },
  { x: 206, y: 58, w: 68, h: 44, delay: 0.32 },
  { x: 168, y: 132, w: 76, h: 46, delay: 0.42 },
] as const

const CONNECTIONS = [
  { x1: 154, y1: 96, x2: 206, y2: 80 },
  { x1: 206, y1: 102, x2: 206, y2: 132 },
  { x1: 154, y1: 118, x2: 168, y2: 155 },
  { x1: 244, y1: 80, x2: 232, y2: 132 },
] as const

function Bar({ x, y, w, h, o = 0.1 }: { x: number; y: number; w: number; h: number; o?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={ILLU.ink} fillOpacity={o} />
}

export function WorkshopAnimation({ phase, playing }: WorkshopAnimationProps) {
  const uid = useId().replace(/:/g, '')
  const [micro, setMicro] = useState(0)

  useEffect(() => {
    if (!playing) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      setMicro(((now - start) % 8000) / 8000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const p = phase

  const notesIn = segE(p, 0.02, 0.38)
  const researchIn = segE(p, 0.28, 0.62)
  const linesIn = segE(p, 0.48, 0.82)
  const organize = segE(p, 0.58, 0.92)
  const dockSettle = segE(p, 0.88, 1.18)

  const dockScale = lerp(1, 0.78, dockSettle)
  const dockOpacity = lerp(1, 0.55, segE(p, 1.05, 1.45))

  const canvasGrid = segE(p, 1.02, 1.28)
  const wireIn = segE(p, 1.08, 1.38)
  const wireOut = 1 - segE(p, 1.62, 2.08)
  const wireOpacity = wireIn * wireOut

  const toolsIn = segE(p, 1.12, 1.48)
  const toolsFade = 1 - segE(p, 2.35, 2.85) * 0.92

  const polishIn = segE(p, 1.52, 2.05)
  const uiSettled = seg(p, 1.95, 2.2)

  const liveIn = segE(p, 2.08, 2.48)
  const scrollT = liveIn > 0.35 ? segE(p, 2.28, 2.72) + micro * 0.06 * (p >= 2 ? 1 : 0) : 0
  const scrollY = scrollT * 42
  const hoverPulse = liveIn > 0.5 ? 0.5 + Math.sin(micro * Math.PI * 2) * 0.5 : 0
  const formSlide = segE(p, 2.58, 2.95)

  const growthIn = segE(p, 2.78, 3.35)

  const cursorPhase = seg(p, 2.22, 2.55) + micro * 0.18 * (p >= 2 ? 1 : 0)
  const cursorX = lerp(
    CANVAS.x + CANVAS.w - 36,
    CANVAS.x + 52 + Math.sin(cursorPhase * Math.PI * 2) * 18,
    ease(clamp(cursorPhase, 0, 1)),
  )
  const cursorY = lerp(
    CANVAS.y + 58,
    CANVAS.y + CANVAS.h - 72 - scrollY * 0.45,
    ease(clamp(cursorPhase, 0, 1)),
  )

  const clipId = `canvas-clip-${uid}`
  const shadowId = `card-shadow-${uid}`

  return (
    <IllustrationFrame>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-full w-full" fill="none" aria-hidden>
        <defs>
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.06" />
          </filter>
          <clipPath id={clipId}>
            <rect x={CANVAS.x + 1} y={CANVAS.y + 1} width={CANVAS.w - 2} height={CANVAS.h - 2} rx={11} />
          </clipPath>
        </defs>

        {/* Desk surface */}
        <rect
          x={STAGE.x}
          y={STAGE.y}
          width={STAGE.w}
          height={STAGE.h}
          rx={ILLU.radius}
          fill="#F8F8F7"
          stroke={ILLU.inkFaint}
          strokeWidth={ILLU.stroke}
        />
        <rect
          x={STAGE.x + 12}
          y={STAGE.y + STAGE.h - 28}
          width={STAGE.w - 24}
          height={1}
          fill={ILLU.ink}
          fillOpacity={0.04}
        />

        {/* Notebook — strategy */}
        <g
          opacity={notesIn * dockOpacity}
          transform={`translate(${DOCK.x + 4} ${DOCK.y + DOCK.h - 74}) scale(${dockScale})`}
        >
          <rect x={0} y={0} width={58} height={68} rx={5} fill="white" stroke={ILLU.ink} strokeOpacity={0.08} strokeWidth={1} filter={`url(#${shadowId})`} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={8} cy={12 + i * 9} r={1.2} fill={ILLU.ink} fillOpacity={0.12} />
          ))}
          <Bar x={16} y={14} w={34} h={2} o={0.14} />
          <Bar x={16} y={22} w={28} h={2} o={0.08} />
          <Bar x={16} y={30} w={32} h={2} o={0.06} />
          <path
            d="M16 44 Q28 40 38 46"
            stroke={ILLU.ink}
            strokeOpacity={0.1}
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M16 52 L34 48 L38 56"
            stroke={ILLU.ink}
            strokeOpacity={0.08}
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Sticky notes */}
        {NOTES.map((note, i) => {
          const t = ease(clamp(notesIn - note.delay, 0, 1)) * organize
          const x = lerp(note.sx, note.tx, t)
          const y = lerp(note.sy, note.ty, t)
          const rot = lerp(note.rot, 0, t)
          const opacity = ease(clamp(notesIn - note.delay, 0, 1)) * dockOpacity
          if (opacity < 0.02) return null
          return (
            <g
              key={i}
              transform={`translate(${DOCK.x + x * dockScale} ${DOCK.y + y * dockScale}) rotate(${rot}) scale(${dockScale})`}
              opacity={opacity}
            >
              <rect x={-20} y={-14} width={40} height={28} rx={3} fill="#FFFEF8" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
              <Bar x={-10} y={-4} w={18} h={2} o={0.12} />
              <Bar x={-10} y={2} w={24} h={2} o={0.06} />
            </g>
          )
        })}

        {/* Research cards */}
        {RESEARCH.map((card, i) => {
          const cardIn = ease(clamp(researchIn - card.delay, 0, 1))
          const cx = lerp(card.x, DOCK.x + 48, organize * 0.85)
          const cy = lerp(card.y, DOCK.y + 168 + i * 22, organize * 0.85)
          const scale = lerp(1, 0.55, dockSettle) * dockScale
          const opacity = cardIn * lerp(1, 0.5, dockSettle) * dockOpacity
          if (opacity < 0.02) return null
          return (
            <g key={i} transform={`translate(${cx} ${cy}) scale(${scale})`} opacity={opacity}>
              <rect x={-card.w / 2} y={-card.h / 2} width={card.w} height={card.h} rx={6} fill="white" stroke={ILLU.ink} strokeOpacity={0.08} strokeWidth={1} filter={`url(#${shadowId})`} />
              <Bar x={-card.w / 2 + 10} y={-card.h / 2 + 12} w={card.w - 20} h={2.5} o={0.13} />
              <Bar x={-card.w / 2 + 10} y={-card.h / 2 + 22} w={card.w - 28} h={2} o={0.07} />
              <Bar x={-card.w / 2 + 10} y={-card.h / 2 + 30} w={card.w - 24} h={2} o={0.05} />
            </g>
          )
        })}

        {/* Connection lines — chaos to clarity */}
        {CONNECTIONS.map((line, i) => {
          const lineT = ease(clamp(linesIn - i * 0.08, 0, 1))
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1)
          const fade = lineT * (1 - dockSettle * 0.75)
          if (fade < 0.02) return null
          return (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={ILLU.ink}
              strokeOpacity={0.1 * fade}
              strokeWidth={1}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - lineT)}
            />
          )
        })}

        {/* Sketch sheet */}
        <g
          opacity={segE(p, 0.72, 1.05) * (1 - segE(p, 1.35, 1.65)) * dockOpacity}
          transform={`translate(${DOCK.x + 8} ${DOCK.y + 188}) scale(${dockScale * 0.9})`}
        >
          <rect width={64} height={48} rx={4} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} />
          <rect x={8} y={8} width={48} height={32} rx={2} stroke={ILLU.ink} strokeOpacity={0.06} strokeWidth={1} fill="none" />
          <path d="M12 28 L24 18 L36 24 L52 14" stroke={ILLU.ink} strokeOpacity={0.1} strokeWidth={1} fill="none" />
          <rect x={12} y={32} width={20} height={4} rx={1} fill={ILLU.ink} fillOpacity={0.06} />
        </g>

        {/* Design canvas frame — always present from phase 2 */}
        <g opacity={Math.max(canvasGrid, polishIn, uiSettled)}>
          <rect
            x={CANVAS.x}
            y={CANVAS.y}
            width={CANVAS.w}
            height={CANVAS.h}
            rx={12}
            fill="white"
            stroke={ILLU.ink}
            strokeOpacity={0.08}
            strokeWidth={1}
            filter={`url(#${shadowId})`}
          />
        </g>

        {/* Canvas grid */}
        {canvasGrid > 0.02 && wireOpacity < 0.95 && (
          <g opacity={canvasGrid * (1 - polishIn * 0.8)} clipPath={`url(#${clipId})`}>
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={CANVAS.x + 16 + i * 22}
                y1={CANVAS.y + 12}
                x2={CANVAS.x + 16 + i * 22}
                y2={CANVAS.y + CANVAS.h - 12}
                stroke={ILLU.ink}
                strokeOpacity={0.04}
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={CANVAS.x + 12}
                y1={CANVAS.y + 16 + i * 24}
                x2={CANVAS.x + CANVAS.w - 12}
                y2={CANVAS.y + 16 + i * 24}
                stroke={ILLU.ink}
                strokeOpacity={0.04}
                strokeWidth={0.5}
              />
            ))}
          </g>
        )}

        {/* Wireframe */}
        {wireOpacity > 0.02 && (
          <g opacity={wireOpacity * (1 - polishIn * 0.9)} clipPath={`url(#${clipId})`}>
            <rect x={CANVAS.x + 14} y={CANVAS.y + 14} width={CANVAS.w - 28} height={22} rx={4} stroke={ILLU.ink} strokeOpacity={0.12} strokeWidth={1} strokeDasharray="4 3" fill="none" />
            <rect x={CANVAS.x + 14} y={CANVAS.y + 44} width={(CANVAS.w - 28) * 0.58} height={CANVAS.h - 58} rx={5} stroke={ILLU.ink} strokeOpacity={0.1} strokeWidth={1} strokeDasharray="4 3" fill="none" />
            <rect x={CANVAS.x + 14 + (CANVAS.w - 28) * 0.62} y={CANVAS.y + 44} width={(CANVAS.w - 28) * 0.34} height={(CANVAS.h - 58) * 0.42} rx={4} stroke={ILLU.ink} strokeOpacity={0.08} strokeWidth={1} strokeDasharray="4 3" fill="none" />
            <rect x={CANVAS.x + 14 + (CANVAS.w - 28) * 0.62} y={CANVAS.y + 44 + (CANVAS.h - 58) * 0.48} width={(CANVAS.w - 28) * 0.34} height={(CANVAS.h - 58) * 0.46} rx={4} stroke={ILLU.ink} strokeOpacity={0.08} strokeWidth={1} strokeDasharray="4 3" fill="none" />
            <rect x={CANVAS.x + 26} y={CANVAS.y + 58} width={72} height={4} rx={2} fill={ILLU.ink} fillOpacity={0.08} />
            <rect x={CANVAS.x + 26} y={CANVAS.y + 68} width={48} height={3} rx={1.5} fill={ILLU.ink} fillOpacity={0.05} />
            <rect x={CANVAS.x + 26} y={CANVAS.y + CANVAS.h - 38} width={56} height={18} rx={9} stroke={ILLU.ink} strokeOpacity={0.1} strokeWidth={1} strokeDasharray="3 2" fill="none" />
          </g>
        )}

        {/* Polished interface */}
        {polishIn > 0.02 && (
          <g opacity={polishIn} clipPath={`url(#${clipId})`}>
            <g transform={`translate(0 ${-scrollY})`}>
              <rect x={CANVAS.x + 14} y={CANVAS.y + 14} width={CANVAS.w - 28} height={22} rx={4} fill={ILLU.ink} fillOpacity={0.025} />
              <Bar x={CANVAS.x + 22} y={CANVAS.y + 22} w={52} h={3} o={0.16} />
              <Bar x={CANVAS.x + 82} y={CANVAS.y + 22} w={32} h={3} o={0.07} />
              <Bar x={CANVAS.x + CANVAS.w - 54} y={CANVAS.y + 22} w={28} h={3} o={0.06} />

              <rect x={CANVAS.x + 14} y={CANVAS.y + 44} width={(CANVAS.w - 28) * 0.58} height={CANVAS.h - 58} rx={5} fill={ILLU.ink} fillOpacity={0.02} />
              <Bar x={CANVAS.x + 26} y={CANVAS.y + 58} w={96} h={5} o={0.14} />
              <Bar x={CANVAS.x + 26} y={CANVAS.y + 70} w={68} h={3} o={0.07} />
              <Bar x={CANVAS.x + 26} y={CANVAS.y + 82} w={CANVAS.w - 60} h={2} o={0.05} />
              <Bar x={CANVAS.x + 26} y={CANVAS.y + 90} w={CANVAS.w - 72} h={2} o={0.04} />

              <rect x={CANVAS.x + 14 + (CANVAS.w - 28) * 0.62} y={CANVAS.y + 44} width={(CANVAS.w - 28) * 0.34} height={(CANVAS.h - 58) * 0.42} rx={4} fill={ILLU.ink} fillOpacity={0.025} />
              <rect x={CANVAS.x + 14 + (CANVAS.w - 28) * 0.62} y={CANVAS.y + 44 + (CANVAS.h - 58) * 0.48} width={(CANVAS.w - 28) * 0.34} height={(CANVAS.h - 58) * 0.46} rx={4} fill={ILLU.ink} fillOpacity={0.025} />

              <rect
                x={CANVAS.x + 26}
                y={CANVAS.y + CANVAS.h - 36}
                width={64}
                height={22}
                rx={11}
                fill={ILLU.ink}
                fillOpacity={0.04 + liveIn * 0.05 + hoverPulse * 0.04}
                stroke={ILLU.ink}
                strokeOpacity={0.06 + liveIn * hoverPulse * 0.1}
                strokeWidth={1}
              />
              <Bar x={CANVAS.x + 38} y={CANVAS.y + CANVAS.h - 27} w={40} h={2.5} o={0.12 + hoverPulse * 0.06} />

              {/* Extra scroll content */}
              <rect x={CANVAS.x + 14} y={CANVAS.y + CANVAS.h + 8} width={CANVAS.w - 28} height={48} rx={5} fill={ILLU.ink} fillOpacity={0.02} />
              <Bar x={CANVAS.x + 26} y={CANVAS.y + CANVAS.h + 22} w={80} h={4} o={0.1} />
              <Bar x={CANVAS.x + 26} y={CANVAS.y + CANVAS.h + 34} w={CANVAS.w - 52} h={2} o={0.05} />
            </g>

            {/* Contact form */}
            {formSlide > 0.02 && (
              <g opacity={formSlide}>
                <rect
                  x={CANVAS.x + 10}
                  y={CANVAS.y + CANVAS.h - formSlide * 92}
                  width={CANVAS.w - 20}
                  height={84}
                  rx={8}
                  fill="white"
                  stroke={ILLU.ink}
                  strokeOpacity={0.07}
                  strokeWidth={1}
                  filter={`url(#${shadowId})`}
                />
                <Bar x={CANVAS.x + 22} y={CANVAS.y + CANVAS.h - formSlide * 92 + 16} w={36} h={2} o={0.12} />
                <rect x={CANVAS.x + 22} y={CANVAS.y + CANVAS.h - formSlide * 92 + 28} width={CANVAS.w - 44} height={20} rx={4} fill={ILLU.ink} fillOpacity={0.03} stroke={ILLU.ink} strokeOpacity={0.06} strokeWidth={1} />
                <rect
                  x={CANVAS.x + 26}
                  y={CANVAS.y + CANVAS.h - formSlide * 92 + 32}
                  width={(CANVAS.w - 52) * segE(p, 2.72, 2.95)}
                  height={12}
                  rx={2}
                  fill={ILLU.ink}
                  fillOpacity={0.05}
                />
                <rect x={CANVAS.x + 22} y={CANVAS.y + CANVAS.h - formSlide * 92 + 56} width={CANVAS.w - 44} height={20} rx={4} fill={ILLU.ink} fillOpacity={0.03} stroke={ILLU.ink} strokeOpacity={0.06} strokeWidth={1} />
              </g>
            )}

            {/* Cursor */}
            {liveIn > 0.25 && formSlide < 0.45 && (
              <g opacity={liveIn * (1 - formSlide)} transform={`translate(${cursorX} ${cursorY})`}>
                <path d="M0 0 L0 13 L3.6 9.8 L6.2 15 L7.8 14 L5.2 8.8 L9.4 8.8 Z" fill={ILLU.ink} stroke="white" strokeWidth="0.8" />
              </g>
            )}
          </g>
        )}

        {/* Typography samples */}
        <g
          opacity={toolsIn * toolsFade}
          transform={`translate(${STAGE.x + STAGE.w - 78} ${STAGE.y + STAGE.h - 108})`}
        >
          <rect width={64} height={88} rx={7} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
          <text x={10} y={22} fill={ILLU.ink} fillOpacity={0.22} fontSize={14} fontFamily="Georgia, serif" fontWeight={600}>
            Aa
          </text>
          <Bar x={10} y={32} w={44} h={2} o={0.1} />
          <text x={10} y={52} fill={ILLU.ink} fillOpacity={0.14} fontSize={10} fontFamily="Heebo, sans-serif">
            Aa
          </text>
          <Bar x={10} y={58} w={36} h={2} o={0.07} />
          <text x={10} y={76} fill={ILLU.ink} fillOpacity={0.1} fontSize={8} fontFamily="Heebo, sans-serif">
            Aa
          </text>
        </g>

        {/* Monochrome palette */}
        <g opacity={toolsIn * toolsFade} transform={`translate(${STAGE.x + STAGE.w - 28} ${STAGE.y + 52})`}>
          {[0.08, 0.14, 0.22, 0.32, 0.48].map((tone, i) => (
            <rect
              key={i}
              x={0}
              y={i * 18}
              width={18}
              height={16}
              rx={3}
              fill={ILLU.ink}
              fillOpacity={tone}
              stroke={ILLU.ink}
              strokeOpacity={0.06}
              strokeWidth={0.5}
            />
          ))}
        </g>

        {/* UI component cards — visible during wireframe phase only */}
        {[
          { x: CANVAS.x + CANVAS.w + 10, y: CANVAS.y + 28, delay: 0 },
          { x: CANVAS.x + CANVAS.w + 10, y: CANVAS.y + 72, delay: 0.08 },
        ].map((comp, i) => {
          const compIn = ease(clamp(toolsIn - comp.delay, 0, 1)) * toolsFade
          if (compIn < 0.02) return null
          return (
            <g key={i} opacity={compIn}>
              <rect x={comp.x} y={comp.y} width={52} height={36} rx={6} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
              {i === 0 ? (
                <>
                  <rect x={comp.x + 8} y={comp.y + 10} width={36} height={16} rx={8} fill={ILLU.ink} fillOpacity={0.05} />
                  <Bar x={comp.x + 16} y={comp.y + 17} w={20} h={2} o={0.1} />
                </>
              ) : (
                <>
                  <rect x={comp.x + 8} y={comp.y + 10} width={36} height={16} rx={4} fill={ILLU.ink} fillOpacity={0.03} stroke={ILLU.ink} strokeOpacity={0.06} strokeWidth={1} />
                </>
              )}
            </g>
          )
        })}

        {/* Spacing guides */}
        <g opacity={toolsIn * (1 - segE(p, 1.85, 2.2)) * 0.7}>
          <line x1={CANVAS.x - 14} y1={CANVAS.y + 44} x2={CANVAS.x - 14} y2={CANVAS.y + CANVAS.h - 14} stroke={ILLU.ink} strokeOpacity={0.12} strokeWidth={1} />
          <line x1={CANVAS.x - 18} y1={CANVAS.y + 44} x2={CANVAS.x - 10} y2={CANVAS.y + 44} stroke={ILLU.ink} strokeOpacity={0.12} strokeWidth={1} />
          <line x1={CANVAS.x - 18} y1={CANVAS.y + CANVAS.h - 14} x2={CANVAS.x - 10} y2={CANVAS.y + CANVAS.h - 14} stroke={ILLU.ink} strokeOpacity={0.12} strokeWidth={1} />
          <rect x={CANVAS.x - 22} y={CANVAS.y + CANVAS.h / 2 - 8} width={12} height={16} rx={2} fill={ILLU.ink} fillOpacity={0.05} />
        </g>

        {/* Growth layer — metrics accumulate around finished site */}
        {growthIn > 0.02 && (
          <g opacity={growthIn}>
            {/* Deployment status */}
            <g opacity={segE(growthIn, 0.05, 0.35)} transform={`translate(${CANVAS.x + CANVAS.w / 2 - 36} ${STAGE.y + 14})`}>
              <rect width={72} height={20} rx={10} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
              <circle cx={14} cy={10} r={3} fill={ILLU.ink} fillOpacity={0.35} />
              <Bar x={22} y={9} w={40} h={2} o={0.12} />
            </g>

            {/* Analytics */}
            <g opacity={segE(growthIn, 0.12, 0.48)} transform={`translate(${STAGE.x + STAGE.w - 100} ${STAGE.y + 36})`}>
              <rect width={84} height={76} rx={8} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
              <Bar x={12} y={14} w={36} h={2} o={0.12} />
              <Bar x={12} y={22} w={24} h={2} o={0.2} />
              <polyline
                points="14,58 28,48 42,52 58,38 72,44"
                stroke={ILLU.ink}
                strokeOpacity={0.2}
                strokeWidth={1.2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Incoming leads */}
            <g opacity={segE(growthIn, 0.2, 0.52)} transform={`translate(${STAGE.x + 36} ${STAGE.y + 44})`}>
              <rect width={68} height={52} rx={8} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
              <Bar x={12} y={14} w={32} h={2} o={0.1} />
              <Bar x={12} y={24} w={20} h={4} o={0.18} />
              <Bar x={12} y={34} w={44} h={2} o={0.06} />
            </g>

            {/* SEO checklist */}
            <g opacity={segE(growthIn, 0.28, 0.62)} transform={`translate(${STAGE.x + 32} ${STAGE.y + STAGE.h - 88})`}>
              <rect width={88} height={68} rx={8} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
              <Bar x={12} y={14} w={40} h={2} o={0.12} />
              {[0, 1, 2].map((row) => {
                const check = segE(growthIn, 0.38 + row * 0.08, 0.58 + row * 0.08)
                return (
                  <g key={row} transform={`translate(0 ${row * 16})`}>
                    <rect x={12} y={26} width={10} height={10} rx={2} stroke={ILLU.ink} strokeOpacity={0.1} strokeWidth={1} fill={ILLU.ink} fillOpacity={check * 0.08} />
                    {check > 0.5 && (
                      <path d="M14 31 L16.5 33.5 L21 29" stroke={ILLU.ink} strokeOpacity={0.25} strokeWidth={1} fill="none" strokeLinecap="round" />
                    )}
                    <Bar x={28} y={30} w={44} h={2} o={0.07} />
                  </g>
                )
              })}
            </g>

            {/* Performance */}
            <g opacity={segE(growthIn, 0.36, 0.68)} transform={`translate(${STAGE.x + STAGE.w - 96} ${STAGE.y + STAGE.h - 72})`}>
              <rect width={72} height={48} rx={8} fill="white" stroke={ILLU.ink} strokeOpacity={0.07} strokeWidth={1} filter={`url(#${shadowId})`} />
              <Bar x={12} y={14} w={32} h={2} o={0.1} />
              <rect x={12} y={24} width={48} height={6} rx={3} fill={ILLU.ink} fillOpacity={0.05} />
              <rect x={12} y={24} width={48 * segE(growthIn, 0.42, 0.72)} height={6} rx={3} fill={ILLU.ink} fillOpacity={0.18} />
            </g>

            {/* New pages */}
            {[
              { x: STAGE.x + STAGE.w - 118, y: STAGE.y + STAGE.h - 52, d: 0.44 },
              { x: STAGE.x + STAGE.w - 54, y: STAGE.y + STAGE.h - 44, d: 0.54 },
            ].map((page, i) => (
              <g key={i} opacity={segE(growthIn, page.d, page.d + 0.28)}>
                <rect x={page.x} y={page.y} width={52} height={34} rx={5} fill="white" stroke={ILLU.ink} strokeOpacity={0.08} strokeWidth={1} filter={`url(#${shadowId})`} />
                <Bar x={page.x + 8} y={page.y + 12} w={36} h={2} o={0.1} />
                <Bar x={page.x + 8} y={page.y + 20} w={28} h={2} o={0.06} />
              </g>
            ))}
          </g>
        )}
      </svg>
    </IllustrationFrame>
  )
}
