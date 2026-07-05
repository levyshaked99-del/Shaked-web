import { motion } from 'framer-motion'
import { ILLU, PANEL, VB } from './shared'

interface Props {
  active: boolean
}

const SOURCES = [
  { x: 100, y: 90 },
  { x: 300, y: 85 },
  { x: 95, y: 230 },
  { x: 305, y: 225 },
] as const

export function AnimationChannels({ active }: Props) {
  const { x, y, w, h } = PANEL
  const cx = x + w / 2
  const cy = y + h / 2

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

      {SOURCES.map((source, i) => {
        const midX = (source.x + cx) / 2
        const midY = (source.y + cy) / 2 - 20
        return (
          <motion.path
            key={i}
            d={`M ${source.x} ${source.y} Q ${midX} ${midY} ${cx} ${cy}`}
            stroke={ILLU.accent}
            strokeWidth={1.2}
            strokeOpacity={0.35}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.12 + i * 0.1, ease: ILLU.ease }}
          />
        )
      })}

      {SOURCES.map((source, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={source.x}
          cy={source.y}
          r={14}
          fill={ILLU.panel}
          stroke={ILLU.ink}
          strokeOpacity={0.1}
          strokeWidth={1.2}
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: ILLU.ease }}
        />
      ))}

      <motion.circle
        cx={cx}
        cy={cy}
        r={32}
        fill={ILLU.ink}
        fillOpacity={0.05}
        stroke={ILLU.accent}
        strokeOpacity={0.4}
        strokeWidth={1.5}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.45, ease: ILLU.ease }}
      />
      <motion.rect
        x={cx - 16}
        y={cy - 10}
        width={32}
        height={4}
        rx={2}
        fill={ILLU.ink}
        fillOpacity={0.2}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.35 }}
      />
      <motion.rect
        x={cx - 10}
        y={cy + 2}
        width={20}
        height={3}
        rx={1.5}
        fill={ILLU.ink}
        fillOpacity={0.1}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.68, duration: 0.35 }}
      />

      {SOURCES.map((source, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={source.x}
          cy={source.y}
          r={4}
          fill={ILLU.accent}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: [0, 1, 0], cx: [source.x, cx], cy: [source.y, cy] } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.6 + i * 0.15, ease: ILLU.ease, repeat: active ? Infinity : 0, repeatDelay: 1.2 }}
        />
      ))}
    </svg>
  )
}
