import { motion } from 'framer-motion'
import { WORKSHOP_HOTSPOTS, type HotspotRect } from './workshopData'
import { stepBlend } from './workshopTokens'

interface WorkshopOverlaysProps {
  phase: number
  activeStep: number
  playing: boolean
  micro: number
}

const SPRING = { type: 'spring' as const, stiffness: 65, damping: 26, mass: 0.95 }
const PURPLE = '124, 58, 237'

function ZoneGlow({
  rect,
  strength,
  rounded = 'rounded-md',
}: {
  rect: HotspotRect
  strength: number
  rounded?: string
}) {
  if (strength < 0.02) return null
  return (
    <motion.div
      className={`pointer-events-none absolute ${rounded}`}
      style={rect}
      initial={false}
      animate={{
        opacity: strength,
        boxShadow: `0 0 ${18 + strength * 36}px rgba(${PURPLE}, ${0.08 + strength * 0.18})`,
      }}
      transition={SPRING}
    >
      <div
        className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-story-purple/[0.09] via-story-purple/[0.03] to-transparent"
        style={{ opacity: strength }}
      />
      <div
        className="absolute inset-0 rounded-[inherit] ring-1 ring-story-purple/20"
        style={{ opacity: strength * 0.7 }}
      />
    </motion.div>
  )
}

function ScreenShine({ rect, strength }: { rect: HotspotRect; strength: number }) {
  if (strength < 0.02) return null
  return (
    <motion.div
      className="pointer-events-none absolute overflow-hidden rounded-sm"
      style={rect}
      initial={false}
      animate={{ opacity: strength * 0.55 }}
      transition={SPRING}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

function FloatingPapers({ rect, strength, micro }: { rect: HotspotRect; strength: number; micro: number }) {
  if (strength < 0.05) return null
  const papers = [
    { x: '12%', y: '18%', r: -7, delay: 0 },
    { x: '48%', y: '8%', r: 5, delay: 0.08 },
    { x: '68%', y: '28%', r: -4, delay: 0.14 },
    { x: '30%', y: '52%', r: 6, delay: 0.2 },
  ]
  return (
    <div className="pointer-events-none absolute" style={rect}>
      {papers.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-[14%] w-[22%] rounded-[1px] bg-white/35 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          style={{ left: p.x, top: p.y, rotate: p.r }}
          initial={false}
          animate={{
            opacity: strength * (0.55 + Math.sin(micro * Math.PI * 2 + i) * 0.08),
            y: (1 - strength) * 8 + Math.sin(micro * Math.PI * 2 + p.delay * 10) * 1.5,
          }}
          transition={{ ...SPRING, delay: p.delay }}
        />
      ))}
    </div>
  )
}

function CodeScroll({ rect, strength }: { rect: HotspotRect; strength: number }) {
  if (strength < 0.08) return null
  return (
    <motion.div
      className="pointer-events-none absolute overflow-hidden rounded-sm"
      style={rect}
      initial={false}
      animate={{ opacity: strength * 0.5 }}
      transition={SPRING}
    >
      <motion.div
        className="flex flex-col gap-[3px] px-[12%] py-[8%]"
        animate={{ y: ['0%', '-50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-[2px] rounded-full bg-story-purple/30"
            style={{ width: `${40 + (i % 4) * 12}%`, opacity: 0.35 + (i % 3) * 0.15 }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`b-${i}`}
            className="h-[2px] rounded-full bg-white/25"
            style={{ width: `${35 + (i % 5) * 10}%`, opacity: 0.25 + (i % 2) * 0.1 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

function Cursor({ rect, strength, micro }: { rect: HotspotRect; strength: number; micro: number }) {
  if (strength < 0.15) return null
  const x = 28 + Math.sin(micro * Math.PI * 2) * 22
  const y = 32 + Math.cos(micro * Math.PI * 2 * 0.75) * 16
  return (
    <div className="pointer-events-none absolute" style={rect}>
      <motion.div
        className="absolute"
        animate={{ left: `${x}%`, top: `${y}%`, opacity: strength }}
        transition={{ type: 'spring', stiffness: 55, damping: 20 }}
      >
        <svg viewBox="0 0 12 14" className="h-3.5 w-3.5 drop-shadow-md">
          <path d="M0 0 L0 10 L3 7.5 L5 12 L6 11 L4 6.5 L7.5 6.5 Z" fill="#111" stroke="white" strokeWidth="0.7" />
        </svg>
      </motion.div>
    </div>
  )
}

export function WorkshopOverlays({ phase, playing, micro }: WorkshopOverlaysProps) {
  const s0 = stepBlend(phase, 0)
  const s1 = stepBlend(phase, 1)
  const s2 = stepBlend(phase, 2)
  const s3 = stepBlend(phase, 3)

  const strategyGlow = s0 * (1 - s1 * 0.25)
  const wireframeGlow = s1 * (1 - s2 * 0.2)
  const systemGlow = s2 * (1 - s3 * 0.15)
  const prototypeGlow = s2 * 0.85 + s3 * 0.35
  const launchGlow = s3

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <motion.div
        className="absolute inset-y-0 start-0 w-[28%] bg-gradient-to-r from-story-purple/[0.05] to-transparent"
        animate={{ opacity: strategyGlow * 0.9 }}
        transition={SPRING}
      />
      <ZoneGlow rect={WORKSHOP_HOTSPOTS.strategy} strength={strategyGlow} rounded="rounded-lg" />
      <ZoneGlow rect={WORKSHOP_HOTSPOTS.strategyDesk} strength={strategyGlow * 0.75} />

      <ZoneGlow rect={WORKSHOP_HOTSPOTS.wireframes} strength={wireframeGlow} />
      <ZoneGlow rect={WORKSHOP_HOTSPOTS.wireframeDesk} strength={wireframeGlow * 0.6} />
      <FloatingPapers rect={WORKSHOP_HOTSPOTS.wireframes} strength={wireframeGlow} micro={micro} />

      <ZoneGlow rect={WORKSHOP_HOTSPOTS.designSystem} strength={systemGlow} />
      <ZoneGlow rect={WORKSHOP_HOTSPOTS.prototype} strength={prototypeGlow} rounded="rounded-lg" />
      <ScreenShine rect={WORKSHOP_HOTSPOTS.prototype} strength={prototypeGlow} />

      <ZoneGlow rect={WORKSHOP_HOTSPOTS.mainScreen} strength={launchGlow * 0.95} />
      <ZoneGlow rect={WORKSHOP_HOTSPOTS.laptop} strength={launchGlow * 0.85} />
      <ZoneGlow rect={WORKSHOP_HOTSPOTS.tablet} strength={launchGlow * 0.55} />
      <ScreenShine rect={WORKSHOP_HOTSPOTS.mainScreen} strength={launchGlow} />
      <ScreenShine rect={WORKSHOP_HOTSPOTS.laptop} strength={launchGlow * 0.7} />
      <CodeScroll rect={WORKSHOP_HOTSPOTS.laptop} strength={playing ? launchGlow : launchGlow * 0.5} />
      <Cursor rect={WORKSHOP_HOTSPOTS.mainScreen} strength={launchGlow} micro={micro} />

      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-story-purple/[0.04] via-transparent to-transparent"
        animate={{ opacity: 0.15 + stepBlend(phase, Math.round(phase)) * 0.2 }}
        transition={SPRING}
      />
    </div>
  )
}
