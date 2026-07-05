import { motion } from 'framer-motion'
import { JOURNEY_STORY, STORY, type StoryTone } from '../../../design/storyColors'
import { JOURNEY_STAGES } from './journeyConfig'

interface JourneyTimelineProps {
  activeIndex: number
  onSelect: (index: number) => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

function stageColor(index: number, isActive: boolean, isPast: boolean): StoryTone | null {
  if (isActive || isPast) return JOURNEY_STORY[index]
  return null
}

export function JourneyTimeline({
  activeIndex,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: JourneyTimelineProps) {
  const progress = activeIndex / (JOURNEY_STAGES.length - 1)
  const activeTone = JOURNEY_STORY[activeIndex]

  return (
    <div
      className="relative flex w-[132px] shrink-0 flex-col py-0.5 md:w-[168px] md:py-1 lg:w-[188px]"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="absolute bottom-2 top-2 right-[7px] w-px bg-black/[0.07] md:bottom-3 md:top-3 md:right-[9px]" aria-hidden />

      <motion.div
        className="absolute right-[7px] top-2 w-px origin-top md:right-[9px] md:top-3"
        initial={false}
        animate={{ scaleY: progress }}
        style={{
          height: 'calc(100% - 1rem)',
          backgroundColor: STORY[activeTone].DEFAULT,
          opacity: 0.55,
        }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        aria-hidden
      />

      <ul className="relative flex flex-col gap-0.5 md:gap-1" aria-label="שלבי התהליך">
        {JOURNEY_STAGES.map((stage, index) => {
          const isActive = index === activeIndex
          const isPast = index < activeIndex
          const tone = JOURNEY_STORY[index]
          const color = stageColor(index, isActive, isPast)

          return (
            <li key={stage.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                className="group w-full rounded-lg py-1.5 pl-1.5 pr-0.5 text-right transition-colors hover:bg-black/[0.02] md:py-2 md:pl-2 md:pr-1"
                aria-current={isActive ? 'step' : undefined}
              >
                <div className="flex items-center justify-end gap-2 md:gap-3">
                  <div className="flex items-baseline justify-end gap-1 md:gap-1.5">
                    <span
                      className="text-[10px] font-medium tabular-nums tracking-[0.08em] transition-colors duration-300 md:text-[11px] md:tracking-[0.1em]"
                      style={{
                        color: isActive
                          ? STORY[tone].DEFAULT
                          : isPast
                            ? `${STORY[tone].DEFAULT}80`
                            : 'rgba(17,17,17,0.28)',
                      }}
                    >
                      {stage.stage}
                    </span>
                    <span
                      className={`text-[11px] transition-colors duration-300 md:text-[13px] ${
                        isActive
                          ? 'font-semibold text-text'
                          : 'text-text/40 group-hover:text-text/55'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>

                  <div className="relative flex h-4 w-4 shrink-0 items-center justify-center md:h-5 md:w-5">
                    {isActive && color && (
                      <motion.div
                        layoutId="timeline-glow"
                        className="absolute inset-[-4px] rounded-full"
                        style={{ backgroundColor: STORY[tone].faint }}
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      />
                    )}
                    <motion.div
                      className="relative rounded-full border-2"
                      initial={false}
                      animate={{
                        width: isActive ? 12 : 7,
                        height: isActive ? 12 : 7,
                        backgroundColor: isActive
                          ? STORY[tone].DEFAULT
                          : isPast
                            ? `${STORY[tone].DEFAULT}59`
                            : 'transparent',
                        borderColor: isActive
                          ? STORY[tone].DEFAULT
                          : isPast
                            ? `${STORY[tone].DEFAULT}40`
                            : 'rgba(17,17,17,0.12)',
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
