import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { STORY } from '../../design/storyColors'
import { ILLU, MIN_FONT, PANEL, VB } from './valueIllustrationShared'

interface Props {
  active?: boolean
}

const EASE = ILLU.ease
const accent = STORY.yellow.DEFAULT

const PROFILES = [
  { offset: -28, delay: 0 },
  { offset: 0, delay: 0.08 },
  { offset: 28, delay: 0.16 },
] as const

function useHoverCycle(active: boolean) {
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    if (active) setCycle((c) => c + 1)
  }, [active])
  return cycle
}

export function IllustrationTrust({ active }: Props) {
  const { x, y, w, h } = PANEL
  const cycle = useHoverCycle(active ?? false)
  const animateIn = active ?? false
  const centerX = x + w / 2
  const profilesY = y + 46
  const starsY = y + 88
  const profileR = 16

  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-full w-full overflow-hidden" fill="none" aria-hidden>
      <defs>
        <filter id="trust-panel-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.08" />
        </filter>
        <clipPath id="trust-clip">
          <rect x={x} y={y} width={w} height={h} rx={ILLU.radius} />
        </clipPath>
      </defs>

      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={ILLU.radius}
        fill="white"
        stroke={ILLU.ink}
        strokeWidth={ILLU.stroke}
        strokeOpacity={ILLU.inkFaint}
        filter="url(#trust-panel-shadow)"
        animate={{ y: active ? y - 1 : y }}
        transition={{ duration: 0.45, ease: EASE }}
      />

      <g clipPath="url(#trust-clip)">
        {PROFILES.map(({ offset, delay }, i) => (
          <motion.g
            key={`${cycle}-profile-${i}`}
            initial={animateIn ? { opacity: 0, scale: 0.6 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: animateIn ? delay : 0, duration: 0.38, ease: EASE }}
            style={{ transformOrigin: `${centerX + offset}px ${profilesY}px` }}
          >
            <circle
              cx={centerX + offset}
              cy={profilesY}
              r={profileR}
              fill="#f5f5f5"
              stroke={ILLU.ink}
              strokeWidth={ILLU.stroke}
              strokeOpacity={0.1}
            />
            <circle
              cx={centerX + offset}
              cy={profilesY - 3}
              r={5}
              fill={ILLU.ink}
              fillOpacity={0.1}
            />
            <path
              d={`M${centerX + offset - 8} ${profilesY + 10} Q${centerX + offset} ${profilesY + 2} ${centerX + offset + 8} ${profilesY + 10}`}
              fill={ILLU.ink}
              fillOpacity={0.08}
            />
          </motion.g>
        ))}

        {Array.from({ length: 5 }, (_, i) => (
          <motion.text
            key={`${cycle}-star-${i}`}
            x={centerX - 36 + i * 14}
            y={starsY}
            textAnchor="middle"
            fill={accent}
            fontSize={MIN_FONT + 4}
            fontFamily={ILLU.font}
            initial={animateIn ? { opacity: 0, scale: 0.4 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: animateIn ? 0.28 + i * 0.09 : 0,
              duration: 0.32,
              ease: EASE,
            }}
          >
            ★
          </motion.text>
        ))}

        <motion.text
          key={`${cycle}-score`}
          x={centerX + 44}
          y={starsY}
          textAnchor="middle"
          fill={ILLU.ink}
          fillOpacity={0.58}
          fontSize={MIN_FONT + 5}
          fontWeight="700"
          fontFamily={ILLU.font}
          initial={animateIn ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: animateIn ? 0.28 + 5 * 0.09 + 0.1 : 0,
            duration: 0.38,
            ease: EASE,
          }}
        >
          4.9
        </motion.text>
      </g>
    </svg>
  )
}
