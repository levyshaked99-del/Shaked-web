import { motion } from 'framer-motion'
import { EASE_PREMIUM } from '../../motion/easing'

export function ProjectsIntro() {
  return (
    <section className="relative flex min-h-screen snap-start snap-always items-center px-6 py-28 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.p
          className="text-sm font-medium tracking-wide text-muted"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
        >
          פרויקטים נבחרים
        </motion.p>
        <motion.h1
          className="mt-4 max-w-[720px] text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM, delay: 0.08 }}
        >
          כל עסק צריך
          <br />
          אתר שונה.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-[520px] text-base leading-[1.75] text-text/55 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.16 }}
        >
          כל פרויקט נבנה סביב הקהל, המטרות והאופי של העסק.
        </motion.p>
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          aria-hidden
        >
          <motion.div
            className="h-8 w-5 rounded-full border border-border p-1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="mx-auto h-1 w-1 rounded-full bg-text/40"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-xs">גלול</span>
        </motion.div>
      </div>
    </section>
  )
}
