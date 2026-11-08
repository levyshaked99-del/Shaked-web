import { motion } from 'framer-motion'
import { ArrowLeft, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MobileMenu } from './MobileMenu'
import { DESKTOP_NAV_LINKS, getNavClickHandler } from './navLinks'

interface SiteNavProps {
  animate?: boolean
  fixed?: boolean
}

export function SiteNav({ animate = true, fixed = false }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonId = 'mobile-menu-button'
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname !== '/' || hash !== '#hero') return
    const timer = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 120)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  useEffect(() => {
    if (!fixed) return

    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [fixed])

  return (
    <>
      <motion.header
        className={[
          'inset-x-0 top-0 z-50 w-full px-6 py-5 md:px-10 lg:px-16',
          fixed ? 'fixed left-0 right-0' : 'absolute',
          fixed
            ? scrolled
              ? 'border-b border-black/[0.06] bg-white/82 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150'
              : 'border-b border-transparent bg-transparent'
            : '',
          fixed ? 'transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out' : '',
        ].join(' ')}
        initial={animate ? { opacity: 0, y: -12, filter: 'blur(6px)' } : false}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 shrink flex-col transition-opacity duration-300 hover:opacity-80">
            <span className="text-base font-bold tracking-tight text-text">שקד לוי</span>
            <span className="hidden min-[400px]:block text-xs text-muted">בניית אתרים לעסקים</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="ניווט ראשי">
            {DESKTOP_NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                onClick={getNavClickHandler(href, pathname, navigate)}
                className="group relative text-sm text-text/70 transition-colors duration-300 hover:text-text"
              >
                {label}
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-brand to-brand-violet transition-all duration-300 group-hover:w-full" aria-hidden />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <button
              id={menuButtonId}
              type="button"
              aria-label="פתח תפריט"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-panel"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] text-text/70 transition-all duration-300 hover:border-black/[0.12] hover:bg-black/[0.03] hover:text-text lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} strokeWidth={1.75} aria-hidden />
            </button>

            <Link
              to="/contact"
              className="group flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-depth-sm transition-shadow duration-300 hover:shadow-depth-md sm:px-5"
            >
              בואו נדבר
              <ArrowLeft
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuButtonId={menuButtonId}
      />
    </>
  )
}
