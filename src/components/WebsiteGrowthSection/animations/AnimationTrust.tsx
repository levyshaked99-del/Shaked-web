import { motion } from 'framer-motion'
import { ILLU, PANEL, VB } from './shared'

interface Props {
  active: boolean
}

const CARDS = [
  { x: 130, y: 100, w: 100, h: 70, delay: 0.15 },
  { x: 170, y: 120, w: 100, h: 70, delay: 0.28 },
  { x: 150, y: 140, w: 100, h: 70, delay: 0.4 },
] as const

export function AnimationTrust({ active }: Props) {
  const { x, y, w, h } = PANEL

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

      {CARDS.map((card, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: card.y + 16 }}
          animate={active ? { opacity: 1, y: card.y } : { opacity: 0, y: card.y + 16 }}
          transition={{ duration: 0.55, delay: card.delay, ease: ILLU.ease }}
        >
          <rect
            x={card.x}
            y={card.y}
            width={card.w}
            height={card.h}
            rx={8}
            fill={ILLU.panel}
            stroke={ILLU.ink}
            strokeOpacity={0.08}
            strokeWidth={1}
          />
          <rect x={card.x + 10} y={card.y + 12} width={card.w - 20} height={card.h - 36} rx={4} fill={ILLU.ink} fillOpacity={0.04} />
          <rect x={card.x + 10} y={card.y + card.h - 18} width={48} height={3} rx={1.5} fill={ILLU.ink} fillOpacity={0.12} />
        </motion.g>
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.5, delay: 0.65, ease: ILLU.ease }}
        style={{ transformOrigin: '280px 220px' }}
      >
        <circle cx={280} cy={220} r={36} fill={ILLU.accentSoft} />
        <circle cx={280} cy={220} r={28} fill={ILLU.panel} stroke={ILLU.accent} strokeOpacity={0.35} strokeWidth={1.5} />
        <motion.path
          d="M268 220 L276 228 L292 212"
          stroke={ILLU.accent}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.45, delay: 0.85, ease: ILLU.ease }}
        />
      </motion.g>

      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`star-${i}`}
          cx={120 + i * 24}
          cy={y + 52}
          r={2}
          fill={ILLU.accent}
          fillOpacity={0.6}
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: 0.9 + i * 0.08 }}
        />
      ))}
    </svg>
  )
}
