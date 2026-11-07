import { Check, Lightbulb, PenLine, Rocket, Search, type LucideIcon } from 'lucide-react'
import { EASE_PREMIUM } from '../../motion/easing'
import { ProcessCardMiniIllustration } from './ProcessCardMiniIllustrations'
import type { WhyUsIconId, WhyUsPrinciple } from './whyUsData'

const ICON_MAP: Record<WhyUsIconId, LucideIcon> = {
  search: Search,
  lightbulb: Lightbulb,
  pen: PenLine,
  rocket: Rocket,
}

interface WhyUsProcessCardProps {
  item: WhyUsPrinciple
  stepIndex: number
  isActive: boolean
  onSelect?: () => void
  tabId: string
  panelId: string
  /** Mobile: display-only panel synced to tablist. Desktop: interactive card. */
  variant?: 'interactive' | 'panel'
}

const cardSurface = (isActive: boolean, interactive: boolean) =>
  [
    'group relative flex min-w-0 w-full flex-1 flex-col overflow-hidden rounded-[18px] border bg-white text-start',
    'transition-[border-color,background-color,box-shadow,transform] duration-[550ms]',
    interactive
      ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-story-purple/35 focus-visible:ring-offset-2 active:scale-[0.995]'
      : '',
    isActive
      ? 'border-story-purple/25 bg-story-purple/[0.035] shadow-[0_16px_48px_-20px_rgba(124,58,237,0.22)] ring-1 ring-story-purple/10'
      : 'border-black/[0.06] shadow-[0_4px_28px_-14px_rgba(0,0,0,0.08)]',
    interactive && !isActive ? 'hover:border-black/[0.08]' : '',
  ].join(' ')

export function WhyUsProcessCard({
  item,
  stepIndex,
  isActive,
  onSelect,
  tabId,
  panelId,
  variant = 'interactive',
}: WhyUsProcessCardProps) {
  const Icon = ICON_MAP[item.icon]
  const interactive = variant === 'interactive'
  const showActive = variant === 'panel' ? true : isActive
  const easingStyle = { transitionTimingFunction: `cubic-bezier(${EASE_PREMIUM.join(',')})` as const }

  const body = (
    <>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 lg:px-5 lg:pb-3 lg:pt-5">
        <div className="flex items-start justify-between gap-3">
          <div
            className={[
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-[550ms]',
              showActive
                ? 'border-story-purple/20 bg-story-purple/[0.1]'
                : 'border-story-purple/10 bg-story-purple/[0.06]',
            ].join(' ')}
          >
            <Icon
              size={16}
              strokeWidth={1.75}
              className={showActive ? 'text-story-purple' : 'text-story-purple/70'}
              aria-hidden
            />
          </div>
          <span className="text-[11px] font-semibold tabular-nums tracking-[0.12em] text-text/25 md:text-xs">
            {item.number}
          </span>
        </div>

        <h3 className="mt-3 text-[0.9375rem] font-bold leading-snug tracking-tight text-text md:text-base">
          {item.title}
        </h3>

        <p className="mt-2.5 text-[0.8125rem] leading-[1.75] text-text/50 md:text-sm md:leading-[1.8]">
          {item.description}
        </p>

        <ul className="mt-3 space-y-1.5 lg:mt-4 lg:space-y-2">
          {item.highlights.map((line) => (
            <li key={line} className="flex items-center gap-2 text-[0.75rem] text-text/55 lg:text-[0.8125rem]">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-story-purple/[0.08]">
                <Check className="h-2.5 w-2.5 text-story-purple" strokeWidth={2.5} aria-hidden />
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={[
          'relative mt-auto hidden h-[80px] border-t border-black/[0.04] transition-colors duration-[550ms] lg:block',
          showActive ? 'bg-gradient-to-b from-story-purple/[0.04] to-secondary/30' : 'bg-secondary/25',
        ].join(' ')}
        aria-hidden
      >
        <ProcessCardMiniIllustration stepIndex={stepIndex} />
      </div>
    </>
  )

  if (!interactive) {
    return (
      <div className={cardSurface(showActive, false)} style={easingStyle}>
        {body}
      </div>
    )
  }

  return (
    <button
      type="button"
      id={panelId}
      aria-pressed={isActive}
      aria-labelledby={tabId}
      aria-label={`${item.number} — ${item.title}. ${item.description}`}
      onClick={onSelect}
      className={cardSurface(isActive, true)}
      style={easingStyle}
    >
      {body}
    </button>
  )
}
