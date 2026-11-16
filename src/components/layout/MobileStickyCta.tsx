import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { MockupLeadCta } from '../ui/MockupLeadCta'

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const hero = document.getElementById('hero')
    const footer = document.querySelector('footer')

    if (!hero) return

    let pastHero = false
    let footerInView = false

    const sync = () => {
      setVisible(pastHero && !footerInView)
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting
        sync()
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        footerInView = entry.isIntersecting
        sync()
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' },
    )

    heroObserver.observe(hero)
    if (footer) footerObserver.observe(footer)

    return () => {
      heroObserver.disconnect()
      footerObserver.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] md:hidden"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          aria-hidden={!visible}
        >
          <div
            className="pointer-events-auto px-3 pb-3"
            style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
          >
            <MockupLeadCta variant="bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
