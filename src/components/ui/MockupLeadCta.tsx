import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type MockupLeadCtaProps = {
  /** Full-width bar (mobile sticky) vs inline pill */
  variant?: 'pill' | 'bar'
  className?: string
}

export function MockupLeadCta({ variant = 'pill', className = '' }: MockupLeadCtaProps) {
  const reducedMotion = usePrefersReducedMotion()

  const shared =
    'text-sm font-semibold text-white transition-[transform,box-shadow] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/20 focus-visible:ring-offset-2'

  const pillClass = `cta-invite-pulse group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 shadow-depth-md hover:-translate-y-0.5 hover:shadow-depth-lg md:px-8 md:py-3.5 ${shared}`

  const barClass = `cta-invite-pulse flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-text shadow-depth-md active:scale-[0.99] ${shared}`

  const label = 'קבלו הדמיה בחינם'

  const link = (
    <Link
      to="/contact"
      className={`${variant === 'bar' ? barClass : pillClass} ${className}`}
      aria-label={`${label} — מעבר לטופס יצירת קשר`}
    >
      {label}
      {variant === 'pill' && (
        <ArrowLeft
          size={14}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
          aria-hidden
        />
      )}
    </Link>
  )

  if (reducedMotion || variant === 'bar') {
    return link
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex">
      {link}
    </motion.div>
  )
}