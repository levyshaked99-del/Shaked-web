import { useState } from 'react'
import { AccordionPanel } from './AccordionPanel'
import { INCLUDED_ITEMS } from './includedItemsData'

interface IncludedAccordionProps {
  inView: boolean
  onActiveChange?: (id: string | null) => void
}

export function IncludedAccordion({ inView, onActiveChange }: IncludedAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    const next = openId === id ? null : id
    setOpenId(next)
    onActiveChange?.(next)
  }

  return (
    <ul className="m-0 p-0" aria-label="שירותים הכלולים בפרויקט">
      {INCLUDED_ITEMS.map((item, index) => (
        <AccordionPanel
          key={item.id}
          id={item.id}
          label={item.label}
          description={item.description}
          badge={item.badge}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
          index={index}
          inView={inView}
          isLast={index === INCLUDED_ITEMS.length - 1}
          variant="included"
        />
      ))}
    </ul>
  )
}
