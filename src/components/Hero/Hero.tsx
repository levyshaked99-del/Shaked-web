import { motion } from 'framer-motion'
import { GlowOrb } from '../ui/GlowOrb'
import { HeroContent } from './HeroContent'
import { HeroNav } from './HeroNav'
import { HeroShowcase } from './HeroShowcase'

export function Hero() {
  return (
    <motion.section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-white"
      aria-label="דף הבית"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <GlowOrb
        tone="blue"
        size="xl"
        opacity={0.06}
        className="-right-[15%] top-[10%] max-md:hidden"
      />
      <GlowOrb
        tone="violet"
        size="lg"
        opacity={0.04}
        className="-left-[10%] top-[40%] max-md:hidden"
      />
      <GlowOrb tone="dual" size="md" opacity={0.05} className="right-[20%] bottom-[15%] hidden lg:block" />

      <div
        className="pointer-events-none absolute inset-0 bg-radial-light"
        aria-hidden
      />

      <HeroNav />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:min-h-screen lg:grid-cols-[64%_36%] lg:items-center lg:[direction:ltr]">
        <div className="relative order-2 overflow-hidden px-2 pb-3 pt-4 md:px-2 md:pb-6 md:pt-6 lg:order-none lg:col-start-1 lg:flex lg:min-h-screen lg:items-center lg:justify-center lg:overflow-visible lg:py-12">
          <HeroShowcase />
        </div>

        <div className="relative order-1 lg:order-none lg:col-start-2" dir="rtl">
          <HeroContent />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-border p-1">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-brand/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-xs text-muted">גלול למטה</span>
      </motion.div>

    </motion.section>
  )
}
