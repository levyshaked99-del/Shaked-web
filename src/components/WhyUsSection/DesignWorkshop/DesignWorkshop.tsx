import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { WORKSHOP_IMAGE_ALT, WORKSHOP_IMAGE_SRC } from './workshopData'
import { stepBlend } from './workshopTokens'
import { WorkshopOverlays } from './WorkshopOverlays'

interface DesignWorkshopProps {
  activeStep: number
  phase: number
  playing: boolean
}

const SPRING = { type: 'spring' as const, stiffness: 70, damping: 24, mass: 0.9 }

export function DesignWorkshop({ activeStep, phase, playing }: DesignWorkshopProps) {
  const [micro, setMicro] = useState(0)
  const [loaded, setLoaded] = useState(false)

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
  }, [playing, activeStep])

  const active = stepBlend(phase, activeStep)

  return (
    <div className="relative w-full">
      <motion.div
        className="relative w-full overflow-hidden rounded-sm shadow-[0_36px_88px_-32px_rgba(0,0,0,0.14)]"
        animate={{
          filter: `brightness(${0.97 + active * 0.04})`,
        }}
        transition={SPRING}
      >
        {!loaded && (
          <div className="aspect-[16/10] w-full animate-pulse bg-secondary/60" aria-hidden />
        )}
        <img
          src={WORKSHOP_IMAGE_SRC}
          alt={WORKSHOP_IMAGE_ALT}
          className="block w-full select-none"
          onLoad={() => setLoaded(true)}
          draggable={false}
        />

        {loaded && (
          <WorkshopOverlays phase={phase} activeStep={activeStep} playing={playing} micro={micro} />
        )}
      </motion.div>
    </div>
  )
}
