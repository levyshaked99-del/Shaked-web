import { motion } from 'framer-motion'
import { EASE_PREMIUM } from '../../motion'
import { CardGlow } from '../ui/CardGlow'

interface ValueClosingProps {
  inView: boolean
}

export function ValueClosing({ inView }: ValueClosingProps) {
  return (
    <motion.div
      className="relative mx-auto mt-20 max-w-[800px] text-center md:mt-28 lg:mt-32"
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.85, delay: 0.5, ease: EASE_PREMIUM }}
    >
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-24 w-px -translate-x-1/2"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(22,163,74,0.12))',
        }}
      />

      <div className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white px-8 py-14 shadow-depth-md md:px-16 md:py-16">
        <CardGlow tone="dual" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.03) 0%, transparent 65%)',
          }}
        />

        <motion.p
          className="text-base leading-relaxed text-text/50 md:text-lg"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.6, ease: EASE_PREMIUM }}
        >
          בסוף,
          <br />
          האתר שלך צריך לעשות דבר אחד:
        </motion.p>

        <motion.h3
          className="mx-auto mt-6 max-w-[520px] text-[clamp(1.65rem,3.2vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-text"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.7, ease: EASE_PREMIUM }}
        >
          לגרום לאנשים
          <br />
          לבחור בך.
        </motion.h3>

        <motion.div
          className="mx-auto mt-8 h-px w-12"
          style={{ backgroundColor: 'rgba(22,163,74,0.35)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.95, duration: 0.6, ease: EASE_PREMIUM }}
        />
      </div>
    </motion.div>
  )
}
