import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { SiteNav } from '../components/layout/SiteNav'
import { Footer } from '../components/layout/Footer'
import { GlowOrb } from '../components/ui/GlowOrb'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { usePageMeta } from '../hooks/usePageMeta'
import { EASE_PREMIUM } from '../motion/easing'
import { fadeUp, staggerContainer, staggerItem } from '../motion/variants'

const PARAGRAPHS = [
  'אני בונה אתרים לעסקים שרוצים להיראות מקצועיים יותר, לבנות אמון ולהפוך יותר מבקרים ללקוחות.',
  'אני מאמין שאתר טוב הוא לא רק עיצוב יפה. הוא צריך לשרת מטרה עסקית ברורה ולעזור לעסק לצמוח.',
  'לכן כל פרויקט מתחיל בהבנת העסק, הלקוחות והמטרות שלו — ורק אחר כך עוברים לעיצוב ופיתוח.',
] as const

const fadeUpSoft = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
}

export function AboutPage() {
  usePageMeta('about')

  return (
    <>
      <GrainOverlay />
      <div className="relative min-h-screen overflow-hidden bg-white">
        <GlowOrb tone="blue" size="lg" opacity={0.04} className="-left-[10%] top-[20%] hidden md:block" aria-hidden />
        <GlowOrb tone="violet" size="md" opacity={0.03} className="-right-[8%] bottom-[15%]" aria-hidden />

        <SiteNav />

        <main id="main-content" className="relative mx-auto flex min-h-screen max-w-[1100px] items-center px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-16 lg:pb-20 lg:pt-36">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Portrait — first on mobile, visual right on desktop (RTL col 1) */}
            <motion.div
              className="order-1 lg:col-start-1 lg:row-start-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE_PREMIUM }}
            >
              <motion.div
                className="group relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-[#f8f8f8] to-[#f2f2f2] shadow-depth-md lg:mx-0 lg:max-w-none"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                role="img"
                aria-label="תמונת פרופיל — שקד לוי"
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 55% at 50% 35%, rgba(255,255,255,0.9) 0%, transparent 70%)',
                  }}
                />
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-black/[0.06] bg-white/80 shadow-depth-sm">
                    <User size={36} strokeWidth={1.25} className="text-text/25" aria-hidden />
                  </div>
                  <span className="text-sm text-muted" aria-hidden>תמונת פרופיל</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Content — second on mobile, visual left on desktop (RTL col 2) */}
            <motion.div
              className="order-2 lg:col-start-2 lg:row-start-1"
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={fadeUpSoft}
                className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-text"
              >
                נעים להכיר, אני שקד.
              </motion.h1>

              <div className="mt-8 max-w-[550px] space-y-5">
                {PARAGRAPHS.map((paragraph) => (
                  <motion.p
                    key={paragraph}
                    variants={staggerItem}
                    className="text-[0.9375rem] leading-[1.85] text-text/65 md:text-base md:leading-[1.85]"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.p
                variants={fadeUp}
                className="mt-10 text-[0.9375rem] font-medium tracking-wide text-text/45"
              >
                — שקד לוי
              </motion.p>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
