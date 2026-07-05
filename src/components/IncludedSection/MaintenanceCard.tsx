import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { EASE_PREMIUM } from '../../motion/easing'
import { CardGlow } from '../ui/CardGlow'
import { AnimatedCheckmark } from './AnimatedCheckmark'
import { PremiumBadge } from './PremiumBadge'
import { MAINTENANCE_SERVICES } from './maintenanceData'

interface MaintenanceCardProps {
  inView: boolean
  delay?: number
}

export function MaintenanceCard({ inView, delay = 0 }: MaintenanceCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-7 shadow-depth-lg md:rounded-[28px] md:p-10 lg:p-12"
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={
        inView
          ? {
              opacity: 1,
              y: hovered ? -3 : 0,
              filter: 'blur(0px)',
              boxShadow: hovered
                ? '0 24px 64px -24px rgba(0,0,0,0.14), 0 0 48px -24px rgba(37,99,235,0.08)'
                : '0 8px 24px -8px rgba(0,0,0,0.1), 0 32px 80px -28px rgba(0,0,0,0.14)',
            }
          : { opacity: 0, y: 20, filter: 'blur(6px)' }
      }
      transition={{
        opacity: { duration: 0.65, delay, ease: EASE_PREMIUM },
        filter: { duration: 0.65, delay, ease: EASE_PREMIUM },
        y: { duration: 0.45, ease: EASE_PREMIUM },
        boxShadow: { duration: 0.45, ease: EASE_PREMIUM },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardGlow active={hovered} tone="blue" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <h3 className="text-[1.25rem] font-bold leading-snug tracking-tight text-text md:text-[1.4rem]">
            ליווי ותחזוקה חודשית
          </h3>
          <PremiumBadge type="recommended" visible={inView} delay={delay + 0.1} />
        </div>

        <p className="mt-3 text-end text-[0.9375rem] leading-[1.75] text-text/55 md:text-base">
          גם אחרי שהאתר באוויר אנחנו ממשיכים לדאוג לו.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4" aria-label="שירותי תחזוקה">
          {MAINTENANCE_SERVICES.map((service, index) => (
            <motion.li
              key={service}
              className="flex list-none items-center justify-end gap-2.5 rounded-xl border border-black/[0.04] bg-secondary/50 px-4 py-3 transition-colors duration-300 group-hover:border-black/[0.06]"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.45, delay: delay + 0.15 + index * 0.06, ease: EASE_PREMIUM }}
            >
              <span className="text-[0.875rem] font-medium text-text/70 md:text-[0.9375rem]">
                {service}
              </span>
              <AnimatedCheckmark active={inView} delay={delay + 0.2 + index * 0.06} />
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 flex justify-end border-t border-black/[0.06] pt-8">
          <Link
            to="/contact?topic=maintenance"
            className="group/btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-7 py-3 text-sm font-semibold text-text shadow-depth-sm transition-all duration-300 hover:border-black/[0.12] hover:shadow-depth-md md:min-h-[50px] md:px-8"
          >
            למידע על תחזוקה חודשית
            <ArrowLeft
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover/btn:-translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
