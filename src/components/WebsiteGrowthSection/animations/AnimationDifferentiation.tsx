import { motion } from 'framer-motion'
import { ILLU, PANEL, VB } from './shared'

interface Props {
  active: boolean
}

const BARS = [
  { x: 110, h: 80, highlight: false },
  { x: 170, h: 140, highlight: true },
  { x: 230, h: 95, highlight: false },
  { x: 290, h: 70, highlight: false },
] as const

export function AnimationDifferentiation({ active }: Props) {
  const { x, y, w, h } = PANEL
  const baseY = y + h - 48

  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-full w-full" fill="none" aria-hidden>
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={ILLU.radius}
        fill={ILLU.panel}
        stroke={ILLU.inkFaint}
        strokeWidth={ILLU.stroke}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: ILLU.ease }}
      />

      <line x1={x + 40} y1={baseY} x2={x + w - 40} y2={baseY} stroke={ILLU.ink} strokeOpacity={0.08} strokeWidth={1} />

      {BARS.map((bar, i) => (
        <motion.rect
          key={bar.x}
          x={bar.x}
          width={36}
          rx={6}
          fill={bar.highlight ? ILLU.accent : ILLU.ink}
          fillOpacity={bar.highlight ? 0.85 : 0.08}
          initial={{ height: 0, y: baseY }}
          animate={active ? { height: bar.h, y: baseY - bar.h } : { height: 0, y: baseY }}
          transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: ILLU.ease }}
        />
      ))}

      <motion.path
        d={`M ${BARS[1].x + 18} ${baseY - BARS[1].h - 20} Q ${BARS[1].x + 50} ${baseY - BARS[1].h - 40} ${BARS[1].x + 80} ${baseY - BARS[1].h - 28}`}
        stroke={ILLU.accent}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: ILLU.ease }}
      />

      <motion.polygon
        points={`${BARS[1].x + 80},${baseY - BARS[1].h - 28} ${BARS[1].x + 74},${baseY - BARS[1].h - 34} ${BARS[1].x + 86},${baseY - BARS[1].h - 34}`}
        fill={ILLU.accent}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ delay: 0.75, duration: 0.3 }}
      />
    </svg>
  )
}
