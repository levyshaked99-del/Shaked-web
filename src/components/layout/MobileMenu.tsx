import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { EASE_PREMIUM } from '../../motion/easing'
import { staggerContainer, staggerItem } from '../../motion/variants'
import { getNavClickHandler, isNavLinkActive, MOBILE_NAV_LINKS } from './navLinks'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  menuButtonId: string
}

export function MobileMenu({ open, onClose, menuButtonId }: MobileMenuProps) {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useFocusTrap(panelRef, open, onClose)

  useEffect(() => {
    if (!open) return
    const { style } = document.documentElement
    const prevHtmlOverflow = style.overflow
    const prevBodyOverflow = document.body.style.overflow
    style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
    }
  }, [open])

  useEffect(() => {
    if (open) return
    const menuButton = document.getElementById(menuButtonId)
    menuButton?.focus()
  }, [open, menuButtonId])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] overflow-hidden lg:hidden">
          <motion.button
            type="button"
            aria-label="סגור תפריט"
            className="absolute inset-0 bg-black/[0.18] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 left-0 flex w-full max-w-full flex-col bg-white shadow-depth-lg will-change-transform"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          >
            <div className="flex items-center justify-between px-6 pb-2 pt-6">
              <span id={titleId} className="text-xs font-semibold tracking-[0.22em] text-muted">
                תפריט
              </span>
              <button
                type="button"
                aria-label="סגור תפריט"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] text-text/60 transition-colors duration-300 hover:border-black/[0.12] hover:bg-black/[0.03] hover:text-text"
                onClick={onClose}
              >
                <X size={18} strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            <motion.nav
              aria-label="ניווט ראשי"
              className="flex flex-1 flex-col justify-center px-8 pb-24 pt-8"
              variants={staggerContainer(0.07, 0.12)}
              initial="hidden"
              animate="visible"
            >
              <ul className="space-y-7">
                {MOBILE_NAV_LINKS.map((item) => {
                  const active = isNavLinkActive(pathname, hash, item.href, item.label)
                  const isHighlight = 'highlight' in item && item.highlight
                  const onContactPage = pathname === '/contact'

                  return (
                    <motion.li key={item.label} variants={staggerItem}>
                      <Link
                        to={item.href}
                        onClick={(event) => {
                          const handler = getNavClickHandler(item.href, pathname, navigate)
                          handler?.(event)
                          onClose()
                        }}
                        aria-current={active ? 'page' : undefined}
                        className={`group relative block py-1 transition-colors duration-300 ${
                          isHighlight && onContactPage
                            ? 'text-text'
                            : isHighlight && !active
                              ? 'text-text/85'
                              : active
                                ? 'text-text'
                                : 'text-text/60 hover:text-text/80'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mobile-nav-indicator"
                            className="absolute -right-4 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-brand to-brand-violet"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            aria-hidden
                          />
                        )}
                        <span
                          className={`block text-[clamp(1.65rem,6vw,2rem)] font-bold leading-tight tracking-tight ${
                            isHighlight ? 'font-extrabold' : ''
                          }`}
                        >
                          {item.label}
                        </span>
                        {isHighlight && (
                          <span className="mt-1 block text-xs font-medium text-muted">
                            פגישת אפיון ללא התחייבות
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.nav>

            <div className="border-t border-black/[0.06] px-8 py-6">
              <p className="text-center text-xs text-muted">שקד לוי · אתרים לעולם העיצוב והשיפוצים</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
