import { motion } from 'framer-motion'
import { ILLU, PANEL, VB } from './shared'

interface Props {
  active: boolean
}

const NODES = [
  { label: 'שירותים', x: 120, y: 80 },
  { label: 'עבודות', x: 280, y: 90 },
  { label: 'שאלות', x: 100, y: 230 },
  { label: 'קשר', x: 290, y: 220 },
] as const

export function AnimationHub({ active }: Props) {
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

      {NODES.map((node, i) => (
        <motion.line
          key={`line-${node.label}`}
          x1={cx}
          y1={cy}
          x2={node.x}
          y2={node.y}
          stroke={ILLU.ink}
          strokeOpacity={0.08}
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: ILLU.ease }}
        />
      ))}

      <motion.rect
        x={cx - 44}
        y={cy - 32}
        width={88}
        height={64}
        rx={10}
        fill={ILLU.ink}
        fillOpacity={0.04}
        stroke={ILLU.ink}
        strokeOpacity={0.15}
        strokeWidth={1.2}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.55, ease: ILLU.ease }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <motion.rect
        x={cx - 28}
        y={cy - 18}
        width={56}
        height={4}
        rx={2}
        fill={ILLU.ink}
        fillOpacity={0.2}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      />
      <motion.rect
        x={cx - 20}
        y={cy - 6}
        width={40}
        height={3}
        rx={1.5}
        fill={ILLU.ink}
        fillOpacity={0.1}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.28, duration: 0.4 }}
      />

      {NODES.map((node, i) => (
        <motion.g
          key={node.label}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.45, delay: 0.25 + i * 0.1, ease: ILLU.ease }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <circle cx={node.x} cy={node.y} r={18} fill={ILLU.panel} stroke={ILLU.ink} strokeOpacity={0.1} strokeWidth={1.2} />
          <circle cx={node.x} cy={node.y} r={5} fill={ILLU.accent} fillOpacity={0.5} />
        </motion.g>
      ))}
    </svg>
  )
}
