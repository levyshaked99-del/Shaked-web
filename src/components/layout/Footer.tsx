import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  WHATSAPP_URL,
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
      className="group relative inline-flex max-md:min-h-11 max-md:items-center max-md:justify-center max-md:py-2 text-sm text-text/60 transition-colors duration-300 hover:text-text"
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
      className="group relative inline-flex max-md:min-h-11 max-md:items-center max-md:justify-center max-md:py-2 text-sm text-text/60 transition-colors duration-300 hover:text-text"
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
      <GlowOrb
        tone="blue"
        size="md"
        opacity={0.025}
        className="-right-[6%] bottom-[30%] hidden md:block"
        aria-hidden
      />

      {showCta && (
        <div
          id="footer-cta"
          className="relative mx-auto max-w-[1100px] px-6 py-16 md:px-10 md:py-32 lg:px-16 lg:py-40"
        >
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
              רוצים לראות איך האתר שלכם ייראה?
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-6 max-w-lg text-[0.9375rem] leading-[1.85] text-text/60 md:text-base md:leading-[1.85]"
            >
              שלחו הודעה, ותקבלו הדמיה של דף הבית, בחינם וללא התחייבות.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
            >
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="קבלו הדמיה בחינם — נפתח בוואטסאפ בחלון חדש"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon size={15} className="text-white/90" />
                קבלו הדמיה בחינם
              </motion.a>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-7 py-3.5 text-sm font-medium text-text/75 shadow-depth-sm transition-all duration-300 hover:border-black/[0.14] hover:text-text hover:shadow-depth-md"
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
          showCta ? 'py-12 md:py-24 lg:py-28' : 'pb-20 pt-24 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32'
        }`}
      >
        <motion.div
          className="flex flex-col gap-10 text-center md:grid md:grid-cols-3 md:gap-10 md:text-right"
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:flex-col md:items-start"
          >
            <Link to="/" className="transition-opacity duration-300 hover:opacity-80">
              <span className="text-base font-bold tracking-tight text-text">שקד לוי</span>
            </Link>
            <span className="text-muted md:hidden" aria-hidden>
              ·
            </span>
            <p className="text-sm text-muted md:mt-2">אתרים לעולם העיצוב והשיפוצים</p>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start">
            <p
              id="footer-nav-heading"
              className="hidden text-xs font-semibold tracking-[0.22em] text-muted md:block"
            >
              ניווט
            </p>
            <nav aria-labelledby="footer-nav-heading">
              <ul className="grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-1 md:mt-5 md:flex md:max-w-none md:flex-col md:items-start md:gap-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label} className="flex min-h-11 items-center justify-center md:min-h-0 md:justify-start">
                    <FooterLink to={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start">
            <p
              id="footer-contact-heading"
              className="text-xs font-semibold tracking-[0.22em] text-muted md:block"
            >
              יצירת קשר
            </p>
            <ul
              className="mt-4 flex flex-col items-center gap-3 md:mt-5 md:items-start"
              aria-labelledby="footer-contact-heading"
            >
              <li className="flex min-h-11 items-center md:min-h-0">
                <ContactLine href={`mailto:${CONTACT_EMAIL}`} dir="ltr">
                  {CONTACT_EMAIL}
                </ContactLine>
              </li>
              <li className="flex min-h-11 items-center md:min-h-0">
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
            <Link to="/accessibility" className="transition-colors hover:text-text" dir="rtl">
              הצהרת נגישות
            </Link>
        </div>
      </div>
    </motion.footer>
  )
}
