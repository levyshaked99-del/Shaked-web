import { Hero } from '../components/Hero/Hero'
import { Footer } from '../components/layout/Footer'
import { WebsiteGrowthSection } from '../components/WebsiteGrowthSection/WebsiteGrowthSection'
import { WhyUsSection } from '../components/WhyUsSection/WhyUsSection'
import { GrainOverlay } from '../components/ui/GrainOverlay'
import { useHashScroll } from '../hooks/useHashScroll'
import { usePageMeta } from '../hooks/usePageMeta'

export function HomePage() {
  usePageMeta('home')
  useHashScroll()

  return (
    <>
      <GrainOverlay />
      <main id="main-content">
        <Hero />
        <WebsiteGrowthSection />
        <WhyUsSection />
      </main>
      <Footer />
    </>
  )
}
