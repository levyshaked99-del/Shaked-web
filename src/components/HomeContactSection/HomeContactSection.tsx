import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ContactForm } from '../ContactSection/ContactForm'
import { ContactInfoCard } from '../ContactSection/ContactInfoCard'
import { Reveal } from '../ui/Reveal'
import { SectionShell } from '../ui/SectionShell'
import { LaunchPricingBadge } from '../ui/LaunchPricingBadge'
import { TrustSignals } from '../ui/TrustSignals'

export function HomeContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionShell ref={ref} id="contact" tone="soft">
      <Reveal variant="blur" className="text-center">
        <LaunchPricingBadge visible={inView} showSubtext className="mx-auto mb-6 md:mb-8" />
        <h2 className="mx-auto max-w-[720px] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-text">
          בואו נבנה את האתר הבא שלכם
        </h2>
        <p className="mx-auto mt-5 max-w-[580px] text-base leading-[1.75] text-text/60 md:text-lg">
          השאירו פרטים ונחזור אליכם לשיחת אפיון ללא התחייבות.
        </p>
      </Reveal>

      <TrustSignals inView={inView} delay={0.15} className="mt-10 md:mt-12" compact />

      <div className="mt-14 grid grid-cols-1 items-start gap-12 md:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1">
          <ContactInfoCard />
        </div>
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <ContactForm />
        </div>
      </div>
    </SectionShell>
  )
}
