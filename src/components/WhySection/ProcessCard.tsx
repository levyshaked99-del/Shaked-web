import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Compass, Sparkles, Target, Zap, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { PROCESS_STORY, STORY, type StoryTone } from '../../design/storyColors'
import { cardShadow, EASE_PREMIUM } from '../../motion'
import { CardGlow } from '../ui/CardGlow'
import { ILLUSTRATIONS } from './ProcessIllustrations'
import type { ProcessCardData, ProcessIconId } from './processCardsData'

interface ProcessCardProps {
  card: ProcessCardData
  index: number
  inView: boolean
}

const ICON_MAP: Record<ProcessIconId, LucideIcon> = {
  target: Target,
  compass: Compass,
  sparkles: Sparkles,
  zap: Zap,
}

const ILLUSTRATION_BG: Record<number, string> = {
  0: 'from-story-blue-soft/55 via-[#f4f7ff]/90 to-white/95',
  1: 'from-[#f8f9fc]/95 via-white/95 to-white',
  2: 'from-story-purple-soft/35 via-[#faf9ff]/90 to-white/95',
  3: 'from-story-green-soft/30 via-[#f6fbf8]/90 to-white/95',
}

const GLOW_TONE: Record<number, 'blue' | 'violet' | 'dual' | 'blue'> = {
  0: 'blue',
  1: 'blue',
  2: 'violet',
  3: 'blue',
}

const ILLUSTRATION_HEIGHT = 'h-[208px] md:h-[220px]'
const CONTENT_HEIGHT = 'h-[288px] md:h-[300px]'

export function ProcessCard({ card, index, inView }: ProcessCardProps) {
  const [hovered, setHovered] = useState(false)
  const Illustration = ILLUSTRATIONS[index]
  const story: StoryTone = PROCESS_STORY[index]
  const Icon = ICON_MAP[card.icon]

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const parallaxX = useSpring(mx, { stiffness: 200, damping: 22 })
  const parallaxY = useSpring(my, { stiffness: 200, damping: 22 })

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!hovered) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(px * 6)
    my.set(py * 4)
  }

  const handleLeave = () => {
    setHovered(false)
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      className="group relative z-[1] grid h-full grid-rows-[208px_288px] overflow-hidden rounded-2xl border bg-white/90 backdrop-blur-sm md:grid-rows-[220px_300px]"
      style={{ borderColor: hovered ? `${STORY[story].DEFAULT}28` : 'rgba(255,255,255,0.8)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: hovered ? -5 : 0,
              boxShadow: hovered ? cardShadow.hover : cardShadow.rest,
            }
          : { opacity: 0, y: 20 }
      }
      transition={{
        opacity: { duration: 0.65, delay: 0.25 + index * 0.1, ease: EASE_PREMIUM },
        y: { duration: 0.45, ease: EASE_PREMIUM },
        boxShadow: { duration: 0.45, ease: EASE_PREMIUM },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <CardGlow active={hovered} tone={GLOW_TONE[index]} />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-70 transition-opacity duration-300"
        style={{ backgroundColor: hovered ? STORY[story].muted : `${STORY[story].muted}88` }}
        aria-hidden
      />

      <div
        className={`relative overflow-hidden border-b border-black/[0.04] bg-gradient-to-b ${ILLUSTRATION_BG[index]}`}
      >
        {index === 0 && (
          <div
            className="pointer-events-none absolute -right-8 top-4 h-32 w-32 rounded-full opacity-60 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${STORY.blue.faint} 0%, transparent 70%)`,
              opacity: hovered ? 0.9 : 0.5,
            }}
            aria-hidden
          />
        )}

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(255,255,255,0.92) 0%, transparent 65%)',
          }}
        />

        <motion.div
          className={`relative flex ${ILLUSTRATION_HEIGHT} items-center justify-center px-6 pt-5`}
          style={{ x: parallaxX, y: parallaxY }}
          animate={{
            filter: hovered
              ? 'saturate(1.08) brightness(1.03)'
              : inView
                ? 'saturate(1) brightness(1)'
                : 'saturate(0.95) brightness(0.98)',
          }}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
        >
          <div className="relative h-full w-full max-w-[300px]">
            <Illustration active={hovered} inView={inView} />
          </div>
        </motion.div>
      </div>

      <div
        className={`relative flex flex-col bg-white/80 px-8 pb-10 pt-6 md:px-10 md:pb-11 md:pt-6 ${CONTENT_HEIGHT}`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-[#fafafa] transition-colors duration-300"
            animate={{
              borderColor: hovered ? `${STORY[story].DEFAULT}35` : 'rgba(17,17,17,0.06)',
              backgroundColor: hovered ? STORY[story].soft : '#fafafa',
              boxShadow: hovered ? `0 0 18px ${STORY[story].glow}` : '0 0 0 rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          >
            <Icon
              size={17}
              strokeWidth={1.75}
              style={{ color: hovered ? STORY[story].DEFAULT : `${STORY[story].DEFAULT}99` }}
              aria-hidden
            />
          </motion.div>

          <span
            className="h-px max-w-[48px] flex-1 transition-colors duration-300"
            style={{ backgroundColor: hovered ? STORY[story].muted : 'rgba(17,17,17,0.08)' }}
          />
        </div>

        <h3 className="mt-5 text-[1.3rem] font-bold leading-snug tracking-tight text-text md:text-[1.4rem]">
          {card.title}
        </h3>

        <p className="mt-6 text-[14px] leading-[1.85] text-text/52 md:text-[15px]">{card.description}</p>
      </div>
    </motion.article>
  )
}
