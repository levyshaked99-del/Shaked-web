import { motion } from 'framer-motion'
import { ArrowLeft, Layers, LayoutGrid, Monitor } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EASE_PREMIUM } from '../../motion/easing'
import { PROJECTS } from './projectsData'

const STATS = [
  { value: String(PROJECTS.length).padStart(2, '0'), label: 'פרויקטי קונספט', icon: LayoutGrid },
  { value: String(PROJECTS.length).padStart(2, '0'), label: 'תחומי עסקים', icon: Layers },
  { value: null, label: 'עיצוב ופיתוח', sub: 'UI/UX & Web Development', icon: Monitor },
] as const

export function ProjectsHero() {
  return (
    <section className="relative px-6 pb-6 pt-28 text-center md:px-10 md:pb-7 md:pt-32 lg:px-16 lg:pb-8 lg:pt-36">
      <div className="mx-auto max-w-[820px]">
        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-story-purple"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
        >
          PORTFOLIO
        </motion.p>
        <motion.h1
          className="mt-5 text-[clamp(2.15rem,4.5vw,3.35rem)] font-extrabold leading-[1.08] tracking-tight text-text"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM, delay: 0.06 }}
        >
          פרויקטים נבחרים
        </motion.h1>
        <motion.p
          className="mx-auto mt-5 max-w-[620px] text-[0.9375rem] leading-[1.85] text-text/60 md:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.12 }}
        >
          מבחר פרויקטי קונספט המדגימים את הגישה שלנו לאסטרטגיה, עיצוב חוויית משתמש ופיתוח אתרים לעסקים.
        </motion.p>

        <motion.div
          className="mx-auto mt-8 max-w-2xl border-t border-black/[0.05] pt-6 md:mt-9 md:pt-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.2, ease: EASE_PREMIUM }}
          aria-label="נתוני תקציר"
        >
          <div className="flex flex-wrap items-center justify-center gap-y-4 text-text/65 md:flex-nowrap md:justify-between md:gap-0">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={`flex min-w-[9rem] flex-1 items-center justify-center gap-2 px-3 text-xs md:min-w-0 md:text-[13px] ${
                    i > 0 ? 'border-s border-black/[0.06]' : ''
                  }`}
                >
                  <Icon size={14} strokeWidth={1.5} className="shrink-0 text-story-purple/40" aria-hidden />
                  <div className="text-start leading-snug">
                    {stat.value && (
                      <span className="me-1.5 font-semibold tabular-nums text-text/70">{stat.value}</span>
                    )}
                    <span>{stat.label}</span>
                    {'sub' in stat && stat.sub && (
                      <span className="mt-0.5 block text-[10px] tracking-wide text-text/65">{stat.sub}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function ProjectsClosing() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1240px] rounded-[24px] bg-story-purple-soft px-8 py-14 text-center md:px-14 md:py-16 lg:py-20">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-text">
          הפרויקט הבא יכול להיות שלך.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-[1.85] text-text/65 md:text-base">
          בוא נדבר על העסק שלך ונבנה לו נוכחות דיגיטלית מדויקת, מעוצבת ומכוונת תוצאות.
        </p>
        <Link
          to="/contact"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg"
        >
          בואו נדבר
          <ArrowLeft size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
