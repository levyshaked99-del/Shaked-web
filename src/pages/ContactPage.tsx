import { motion } from 'framer-motion'
import { ContactForm } from '../components/ContactSection/ContactForm'
import { ContactInfoCard } from '../components/ContactSection/ContactInfoCard'
import { ContactTimeline } from '../components/ContactSection/ContactTimeline'
import { SiteNav } from '../components/layout/SiteNav'
import { Footer } from '../components/layout/Footer'
import { GlowOrb } from '../components/ui/GlowOrb'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { usePageMeta } from '../hooks/usePageMeta'
import { staggerContainer, staggerItemBlur } from '../motion/variants'

export function ContactPage() {
  usePageMeta('contact')
  return (
    <>
      <GrainOverlay />
      <div className="relative min-h-screen bg-white">
        <GlowOrb tone="blue" size="lg" opacity={0.035} className="-left-[8%] top-[18%] hidden md:block" aria-hidden />
        <GlowOrb tone="violet" size="md" opacity={0.025} className="-right-[6%] top-[45%]" aria-hidden />

        <SiteNav fixed />

        <main id="main-content" className="relative mx-auto max-w-[1100px] px-6 pb-8 pt-28 md:px-10 md:pt-32 lg:px-16 lg:pt-36">
          <motion.div
            className="max-w-2xl"
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={staggerItemBlur}
              className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-text"
            >
              בוא נדבר על הפרויקט הבא שלך.
            </motion.h1>

            <motion.p
              variants={staggerItemBlur}
              className="mt-6 max-w-lg text-[0.9375rem] leading-[1.85] text-text/60 md:text-base md:leading-[1.85]"
            >
              אם יש לך רעיון,
              <br />
              עסק קיים
              <br />
              או אתר שצריך שדרוג,
              <br />
              <span className="text-text/75">אשמח לשמוע ולעזור לך להבין מה הצעד הבא.</span>
            </motion.p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1">
              <ContactInfoCard />
            </div>

            <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
              <ContactForm />
            </div>
          </div>

          <ContactTimeline />
        </main>
      </div>
      <Footer />
    </>
  )
}
