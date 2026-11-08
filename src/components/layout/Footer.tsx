import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  WHATSAPP_URL_SHORT,
} from '../../constants/contact'
import { EASE_PREMIUM } from '../../motion/easing'
import { staggerContainer, staggerItem } from '../../motion/variants'
import { WhatsAppIcon } from '../ContactSection/WhatsAppIcon'
import { GlowOrb } from '../ui/GlowOrb'

const NAV_LINKS = [
  { label: 'פרויקטים', href: '/projects' },
  { label: 'אודות', href: '/about' },
  { label: 'יצירת קשר', href: '/contact' },
  { label: 'קבע פגישה', href: '/contact' },
  { label: 'הצהרת נגישות', href: '/accessibility' },
] as const

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group relative inline-block text-sm text-text/60 transition-colors duration-300 hover:text-text"
    >
      {children}
      <span className="absolute -bottom-0.5 right-0 h-px w-0 bg-text/25 transition-all duration-300 group-hover:w-full" aria-hidden />
    </Link>
  )
}

function ContactLine({
  href,
  children,
  dir,
}: {
  href: string
  children: ReactNode
  dir?: 'ltr' | 'rtl'
}) {
  return (
    <a
      href={href}
      dir={dir}
      className="group relative inline-block text-sm text-text/60 transition-colors duration-300 hover:text-text"
    >
      {children}
      <span className="absolute -bottom-0.5 right-0 h-px w-0 bg-text/25 transition-all duration-300 group-hover:w-full" aria-hidden />
    </a>
  )
}

interface FooterProps {
  showCta?: boolean
}

export function Footer({ showCta = true }: FooterProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.footer
      ref={ref}
      className="relative overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
    >
      <GlowOrb tone="violet" size="lg" opacity={0.03} className="-left-[8%] top-[12%] hidden md:block" aria-hidden />
      <GlowOrb tone="blue" size="md" opacity={0.025} className="-right-[6%] bottom-[30%]" aria-hidden />

      {showCta && (
        <div className="relative mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-text"
            >
              בוא נבנה משהו יוצא דופן.
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-6 max-w-lg text-[0.9375rem] leading-[1.85] text-text/60 md:text-base md:leading-[1.85]"
            >
              אם יש לך רעיון, עסק קיים או אתר שצריך שדרוג,
              <br className="hidden sm:block" />
              אשמח לשמוע ולעזור לך להבין מה הצעד הבא.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg"
                >
                  קבע פגישה
                  <ArrowLeft
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>

              <motion.a
                href={WHATSAPP_URL_SHORT}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="דברו איתי בוואטסאפ — נפתח בחלון חדש"
                className="group inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-7 py-3.5 text-sm font-medium text-text/75 shadow-depth-sm transition-all duration-300 hover:border-[#4D7C5F]/25 hover:text-text hover:shadow-glow-green-soft"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon size={15} className="text-[#5C8A6E]/70 transition-colors duration-300 group-hover:text-[#4D7C5F]" />
                דברו איתי בוואטסאפ
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      )}

      {showCta && (
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
          <div className="h-px bg-black/[0.06]" role="separator" aria-hidden />
        </div>
      )}

      <div
        className={`relative mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16 ${
          showCta ? 'py-20 md:py-24 lg:py-28' : 'pb-20 pt-24 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32'
        }`}
      >
        <motion.div
          className="grid grid-cols-1 gap-14 text-center md:grid-cols-3 md:gap-10 md:text-right"
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start">
            <Link to="/" className="transition-opacity duration-300 hover:opacity-80">
              <span className="text-base font-bold tracking-tight text-text">שקד לוי</span>
            </Link>
            <p className="mt-2 text-sm text-muted">בניית אתרים לעסקים</p>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start">
            <p id="footer-nav-heading" className="text-xs font-semibold tracking-[0.22em] text-muted">
              ניווט
            </p>
            <nav aria-labelledby="footer-nav-heading">
              <ul className="mt-5 flex flex-col items-center gap-3 md:items-start">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <FooterLink to={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start">
            <p id="footer-contact-heading" className="text-xs font-semibold tracking-[0.22em] text-muted">
              יצירת קשר
            </p>
            <ul className="mt-5 flex flex-col items-center gap-3 md:items-start" aria-labelledby="footer-contact-heading">
              <li>
                <ContactLine href={`mailto:${CONTACT_EMAIL}`} dir="ltr">
                  {CONTACT_EMAIL}
                </ContactLine>
              </li>
              <li>
                <ContactLine href={CONTACT_PHONE_HREF} dir="ltr">
                  {CONTACT_PHONE}
                </ContactLine>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-10 md:px-10 lg:px-16 lg:pb-12">
        <div className="h-px bg-black/[0.06]" role="separator" aria-hidden />

        <div className="flex flex-col items-center gap-3 pt-8 text-center text-xs text-muted md:flex-row md:justify-between md:pt-10" dir="ltr">
          <span>© 2026 Shaked Levy</span>
          <span dir="rtl" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link to="/accessibility" className="transition-colors hover:text-text">
              הצהרת נגישות
            </Link>
            <span aria-hidden>·</span>
            <span>נבנה עם React + Vite</span>
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
