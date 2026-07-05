import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccordionPanel } from '../../IncludedSection/AccordionPanel'
import { SERVICES_FAQ_ITEMS } from './servicesFaqData'

interface ServicesFaqAccordionProps {
  inView: boolean
}

export function ServicesFaqAccordion({ inView }: ServicesFaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <motion.div
      className="overflow-hidden rounded-[28px] border border-black/[0.05] bg-white px-5 py-2 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.06)] md:rounded-[30px] md:px-10 md:py-4 lg:px-12"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <ul className="m-0 p-0" aria-label="שאלות נפוצות">
        {SERVICES_FAQ_ITEMS.map((item, index) => (
          <AccordionPanel
            key={item.id}
            id={item.id}
            label={item.question}
            description={item.answer}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
            index={index}
            inView={inView}
            isLast={index === SERVICES_FAQ_ITEMS.length - 1}
            variant="faq"
          />
        ))}
      </ul>
    </motion.div>
  )
}
