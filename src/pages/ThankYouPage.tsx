import { Link } from 'react-router-dom'
import { SiteNav } from '../components/layout/SiteNav'
import { Footer } from '../components/layout/Footer'
import { WhatsAppIcon } from '../components/ContactSection/WhatsAppIcon'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { WHATSAPP_URL } from '../constants/contact'
import { usePageMeta } from '../hooks/usePageMeta'

export function ThankYouPage() {
  usePageMeta('thankYou')

  return (
    <>
      <GrainOverlay />
      <div className="relative min-h-screen bg-white">
        <SiteNav fixed />

        <main
          id="main-content"
          tabIndex={-1}
          className="relative mx-auto flex min-h-[70vh] max-w-[560px] flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:px-10 md:pt-32 lg:px-16"
        >
          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-text">
            תודה! הפרטים התקבלו
          </h1>
          <p className="mt-5 text-[0.9375rem] leading-[1.85] text-text/65 md:text-base">
            אחזור אליך בהקדם, בדרך כלל תוך יום עסקים.
          </p>
          <nav className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:flex-row sm:justify-center" aria-label="המשך ניווט">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-depth-md transition-shadow duration-300 hover:shadow-depth-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              חזרה לדף הבית
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-black/[0.1] bg-white px-8 py-3.5 text-sm font-semibold text-text shadow-depth-sm transition-colors duration-300 hover:border-[#4D7C5F]/25 hover:shadow-glow-green-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <WhatsAppIcon size={16} className="text-[#5C8A6E]/80 transition-colors duration-300 group-hover:text-[#4D7C5F]" aria-hidden />
              וואטסאפ
            </a>
          </nav>
        </main>
      </div>
      <Footer showCta={false} />
    </>
  )
}