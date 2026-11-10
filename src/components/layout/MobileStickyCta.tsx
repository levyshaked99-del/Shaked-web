import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '../../constants/contact'
import { EASE_PREMIUM } from '../../motion/easing'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { WhatsAppIcon } from '../ContactSection/WhatsAppIcon'

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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-text text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg"
            >
              <WhatsAppIcon size={18} className="text-white/90" />
              קבלו הדמיה בחינם
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
