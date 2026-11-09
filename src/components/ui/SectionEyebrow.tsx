import type { ReactNode } from 'react'

const EYEBROW_CLASS =
  'text-xs font-semibold tracking-[0.22em] text-story-purple/75'

type SectionEyebrowProps = {
  children: ReactNode
  /** Use `span` when the eyebrow sits inline in a flex row (e.g. with a step counter). */
  as?: 'p' | 'span'
  className?: string
  lang?: string
}

export function SectionEyebrow({ children, as: Tag = 'p', className, lang }: SectionEyebrowProps) {
  return (
    <Tag lang={lang} className={[EYEBROW_CLASS, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
