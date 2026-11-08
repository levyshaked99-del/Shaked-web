import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_PREMIUM } from '../../motion/easing'
import { createFocusTrap } from './projectModalFocus'
import type { Project } from './projectsData'

interface ProjectDetailsModalProps {
  project: Project | null
  onClose: () => void
  returnFocusEl: HTMLElement | null
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-black/[0.06] pt-8 first:border-t-0 first:pt-0">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-story-purple/55">{title}</h3>
      <div className="mt-4 text-[0.9375rem] leading-[1.85] text-text/60">{children}</div>
    </section>
  )
}

export function ProjectDetailsModal({ project, onClose, returnFocusEl }: ProjectDetailsModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const open = project !== null

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let releaseTrap: () => void = () => {}
    const raf = window.requestAnimationFrame(() => {
      if (panelRef.current) {
        releaseTrap = createFocusTrap(panelRef.current, onClose)
      }
      closeRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(raf)
      document.body.style.overflow = previousOverflow
      releaseTrap()
      returnFocusEl?.focus()
    }
  }, [open, onClose, returnFocusEl])

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.55, ease: EASE_PREMIUM }

  const content = (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          role="presentation"
        >
          <motion.div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] flex max-h-[min(96dvh,900px)] w-full max-w-[800px] flex-col overflow-hidden rounded-t-[20px] border border-black/[0.07] bg-white shadow-[0_32px_80px_-24px_rgba(0,0,0,0.2)] sm:max-h-[min(88vh,900px)] sm:rounded-[24px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.99 }}
            transition={transition}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-black/[0.05] px-6 py-5 md:px-10 md:py-7">
              <div className="min-w-0 text-start">
                <span className="inline-flex rounded-full border border-story-purple/12 bg-story-purple-soft/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-story-purple/70">
                  {project.conceptLabel}
                </span>
                <h2 id={titleId} className="mt-4 text-2xl font-bold tracking-tight text-text md:text-[1.75rem]">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-text/50">{project.industryLine}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted">{project.industryEn}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-text/55 transition-colors duration-300 hover:border-black/[0.12] hover:text-text"
                aria-label="סגור"
              >
                <X size={18} strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-6 py-8 md:px-10 md:py-10">
              <p className="text-[12px] leading-relaxed text-story-purple/65">{project.caseStudy.disclaimer}</p>

              <div className="mt-10 space-y-0">
                <ModalSection title="קונספט וכיוון יצירתי">
                  <p className="text-text/65">{project.caseStudy.conceptRationale}</p>
                </ModalSection>

                <ModalSection title="מטרות האתר">
                  <ul className="list-none space-y-3">
                    {project.caseStudy.objectives.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-story-purple/45" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </ModalSection>

                <ModalSection title="החלטות UX/UI">
                  <ul className="list-none space-y-3">
                    {project.caseStudy.uxDecisions.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-story-purple/45" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </ModalSection>

                {project.caseStudy.verifiedImplementation &&
                  project.caseStudy.verifiedImplementation.length > 0 && (
                    <ModalSection title="טכנולוגיות ויישום מאומתים">
                      <ul className="list-none space-y-2 text-text/55">
                        {project.caseStudy.verifiedImplementation.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </ModalSection>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null
  return createPortal(content, document.body)
}
