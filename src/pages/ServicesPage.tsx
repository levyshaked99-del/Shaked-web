import { Footer } from '../components/layout/Footer'
import { SiteNav } from '../components/layout/SiteNav'
import { ServicesFaqSection } from '../components/ServicesPage/ServicesFaqSection'
import { ServicesMonthlyServicesSection } from '../components/ServicesPage/ServicesMonthlyServicesSection'
import { ServicesWebsiteFitSection } from '../components/ServicesPage/ServicesWebsiteFitSection'
import { GlowOrb } from '../components/ui/GlowOrb'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { usePageMeta } from '../hooks/usePageMeta'

export function ServicesPage() {
  usePageMeta('services')

  return (
    <>
      <GrainOverlay />
      <div className="relative bg-white">
        <GlowOrb tone="blue" size="lg" opacity={0.04} className="-left-[10%] top-[12%] hidden md:block" aria-hidden />
        <GlowOrb tone="violet" size="md" opacity={0.03} className="-right-[8%] top-[38%]" aria-hidden />

        <SiteNav />

        <main id="main-content" className="scroll-smooth">
          <ServicesWebsiteFitSection />
          <ServicesMonthlyServicesSection />
          <ServicesFaqSection />
        </main>
      </div>
      <Footer showCta={false} />
    </>
  )
}
