import { motion } from 'framer-motion'
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

        <main id="main-content" className="relative mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-16 lg:pb-20 lg:pt-36">
          <motion.div
            className="w-full max-w-[640px] text-center"
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

            <div className="mx-auto mt-8 max-w-[550px] space-y-5">
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
        </main>
      </div>
      <Footer />
    </>
  )
}
