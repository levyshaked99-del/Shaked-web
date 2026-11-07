import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SiteNav } from '../components/layout/SiteNav'
import { Footer } from '../components/layout/Footer'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { GlowOrb } from '../components/ui/GlowOrb'
import { LaunchPricingBadge } from '../components/ui/LaunchPricingBadge'
import { PAGE_SEO } from '../constants/seo'
import { getService } from '../data/servicesData'
import { staggerContainer, staggerItem } from '../motion/variants'

const SERVICE_SEO: Record<string, keyof typeof PAGE_SEO> = {
  brand: 'serviceBrand',
  landing: 'serviceLanding',
  premium: 'servicePremium',
}

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  useEffect(() => {
    if (!service) return
    const seoKey = SERVICE_SEO[service.slug]
    const seo = seoKey ? PAGE_SEO[seoKey] : PAGE_SEO.home
    document.title = seo.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', seo.description)
  }, [service])

  if (!service) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <GrainOverlay />
      <div className="relative min-h-screen bg-white">
        <GlowOrb tone="blue" size="lg" opacity={0.03} className="-left-[8%] top-[15%] hidden md:block" aria-hidden />

        <SiteNav />

        <main id="main-content" className="relative mx-auto max-w-[900px] px-6 pb-20 pt-28 md:px-10 md:pt-32 lg:px-16 lg:pt-36">
          <motion.div variants={staggerContainer(0.08, 0.05)} initial="hidden" animate="visible">
            <motion.div variants={staggerItem}>
              <Link
                to="/#packages"
                className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-text/45 transition-colors hover:text-text/70"
              >
                <ArrowLeft
                  size={14}
                  strokeWidth={2}
                  className="transition-transform group-hover:-translate-x-0.5"
                  aria-hidden
                />
                חזרה לסוגי אתרים
              </Link>
            </motion.div>

            <motion.div variants={staggerItem} className="mb-8">
              <LaunchPricingBadge showSubtext />
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-text"
            >
              {service.title}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-base leading-[1.85] text-text/60 md:text-lg"
            >
              {service.subtitle}
            </motion.p>

            <motion.div variants={staggerItem} className="mt-10 border-y border-black/[0.06] py-8">
              <p className="text-[1.75rem] font-bold tracking-tight text-text md:text-2xl">{service.price}</p>
              <p className="mt-2 text-sm text-text/45">{service.priceNote}</p>
            </motion.div>

            <motion.section variants={staggerItem} className="mt-16">
              <h2 className="text-lg font-bold tracking-tight text-text md:text-xl">למי זה מתאים</h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.85] text-text/55 md:text-base">{service.idealFor}</p>
            </motion.section>

            <motion.section variants={staggerItem} className="mt-16">
              <h2 className="text-lg font-bold tracking-tight text-text md:text-xl">מה כלול</h2>
              <ul className="mt-6 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start justify-end gap-3 text-end">
                    <span className="text-[0.9375rem] leading-[1.75] text-text/60 md:text-base">{item}</span>
                    <Check size={16} strokeWidth={2} className="mt-1 shrink-0 text-story-green" aria-hidden />
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="mt-16">
              <h2 className="text-lg font-bold tracking-tight text-text md:text-xl">תהליך העבודה</h2>
              <ol className="mt-6 space-y-3">
                {service.process.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center justify-end gap-4 border-b border-black/[0.04] pb-3 text-end last:border-0"
                  >
                    <span className="text-[0.9375rem] text-text/60">{step}</span>
                    <span className="text-xs font-semibold tabular-nums tracking-widest text-text/25">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.section>

            <motion.section variants={staggerItem} className="mt-20 border border-black/[0.06] px-8 py-10 text-center md:px-12 md:py-14">
              <h2 className="text-[clamp(1.25rem,2.5vw,1.65rem)] font-bold tracking-tight text-text">
                מוכנים להתחיל?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-text/55">
                השאירו פרטים ונחזור אליכם תוך 24 שעות לשיחת אפיון ללא התחייבות.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-accent px-9 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-depth-lg"
              >
                קבלו הצעת מחיר
                <ArrowLeft
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </motion.section>
          </motion.div>
        </main>

        <Footer showCta={false} />
      </div>
    </>
  )
}
