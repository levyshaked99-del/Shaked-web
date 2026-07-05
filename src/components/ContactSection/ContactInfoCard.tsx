import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'
import { Reveal } from '../ui/Reveal'
import { CONTACT_INFO } from './contactTimelineData'

const ICONS = {
  phone: Phone,
  clock: Clock,
  map: MapPin,
  mail: Mail,
} as const

const cardRestShadow =
  '0 2px 8px -2px rgba(0,0,0,0.04), 0 8px 28px -8px rgba(0,0,0,0.06)'
const cardHoverShadow =
  '0 8px 24px -8px rgba(0,0,0,0.08), 0 24px 56px -16px rgba(0,0,0,0.1)'

export function ContactInfoCard() {
  return (
    <Reveal variant="blur" delay={0.1}>
      <motion.div
        className="group/card relative overflow-hidden rounded-2xl border border-black/[0.05] bg-gradient-to-b from-[#fafafa] to-white p-8 md:p-10 lg:p-11"
        style={{ boxShadow: cardRestShadow }}
        whileHover={{ y: -5, boxShadow: cardHoverShadow }}
        transition={{ duration: 0.45, ease: EASE_PREMIUM }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"
          aria-hidden
        />

        <p className="text-xs font-semibold tracking-[0.22em] text-muted">מה מחכה לך</p>
        <p className="mt-3 max-w-[260px] text-lg font-bold leading-snug tracking-tight text-text">
          התחלה פשוטה, בלי התחייבות.
        </p>

        <ul className="mt-11 space-y-7 md:space-y-8">
          {CONTACT_INFO.map((item) => {
            const { icon, label } = item
            const href = 'href' in item ? item.href : undefined
            const isWhatsApp = 'whatsapp' in item && item.whatsapp
            const Icon = ICONS[icon]

            const iconShell = (
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white transition-all duration-300 ${
                  isWhatsApp
                    ? 'border-black/[0.06] shadow-depth-sm group-hover/row:scale-105 group-hover/row:border-[#4D7C5F]/20 group-hover/row:shadow-[0_0_22px_-4px_rgba(77,124,95,0.22)]'
                    : 'border-black/[0.05] shadow-[0_1px_4px_-1px_rgba(0,0,0,0.04)] group-hover/row:scale-[1.03] group-hover/row:border-black/[0.08] group-hover/row:shadow-depth-sm'
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={1.75}
                  aria-hidden
                  className={`transition-all duration-300 ${
                    isWhatsApp
                      ? 'text-text/45 group-hover/row:text-[#4D7C5F]'
                      : 'text-text/40 group-hover/row:text-text/55 group-hover/row:-translate-y-px'
                  }`}
                />
              </span>
            )

            const labelEl = (
              <span
                className={`text-[0.9375rem] leading-relaxed transition-colors duration-300 ${
                  isWhatsApp ? 'text-text/70 group-hover/row:text-text/85' : 'text-text/65 group-hover/row:text-text/75'
                }`}
              >
                {label}
              </span>
            )

            if (href && isWhatsApp) {
              return (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="שיחת אפיון ללא התחייבות — שלח הודעה בוואטסאפ, נפתח בחלון חדש"
                    className="group/row relative flex cursor-pointer items-center gap-5"
                  >
                    {iconShell}
                    {labelEl}
                  </a>
                </li>
              )
            }

            if (href) {
              return (
                <li key={label}>
                  <a
                    href={href}
                    className="group/row flex items-center gap-5 transition-colors duration-300"
                    dir="ltr"
                  >
                    {iconShell}
                    {labelEl}
                  </a>
                </li>
              )
            }

            return (
              <li key={label}>
                <div className="group/row flex items-center gap-5">{iconShell}{labelEl}</div>
              </li>
            )
          })}
        </ul>
      </motion.div>
    </Reveal>
  )
}
