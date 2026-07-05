import type { StoryTone } from '../../design/storyColors'
import { STORY } from '../../design/storyColors'

interface StoryDotProps {
  tone: StoryTone
  size?: 'xs' | 'sm'
  className?: string
}

export function StoryDot({ tone, size = 'xs', className = '' }: StoryDotProps) {
  const sizeClass = size === 'xs' ? 'h-1.5 w-1.5' : 'h-2 w-2'
  return (
    <span
      className={`inline-block shrink-0 rounded-full ${sizeClass} ${className}`}
      style={{ backgroundColor: STORY[tone].DEFAULT }}
      aria-hidden
    />
  )
}

interface StoryLineProps {
  tone: StoryTone
  className?: string
}

export function StoryLine({ tone, className = '' }: StoryLineProps) {
  return (
    <span
      className={`inline-block h-px ${className}`}
      style={{ backgroundColor: STORY[tone].muted }}
      aria-hidden
    />
  )
}

interface StoryTagProps {
  tone: StoryTone
  children: React.ReactNode
  className?: string
}

export function StoryTag({ tone, children, className = '' }: StoryTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none ${className}`}
      style={{
        color: STORY[tone].DEFAULT,
        backgroundColor: STORY[tone].faint,
        border: `1px solid ${STORY[tone].muted.replace('0.45', '0.15')}`,
      }}
    >
      {children}
    </span>
  )
}
