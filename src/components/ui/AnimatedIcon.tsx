import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { StoryTone } from '../../design/storyColors'
import { STORY } from '../../design/storyColors'
import { EASE_PREMIUM } from '../../motion/easing'

interface AnimatedIconProps {
  icon: LucideIcon
  active?: boolean
  size?: number
  className?: string
  tone?: StoryTone
}

export function AnimatedIcon({
  icon: Icon,
  active = false,
  size = 22,
  className = '',
  tone,
}: AnimatedIconProps) {
  const color = tone ? STORY[tone].DEFAULT : undefined

  return (
    <motion.span
      className="inline-flex items-center justify-center"
      animate={{
        scale: active ? 1.1 : 1,
        rotate: active ? 4 : 0,
        y: active ? -1 : 0,
      }}
      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
    >
      <Icon
        size={size}
        strokeWidth={1.75}
        className={`transition-colors duration-300 ${
          tone ? '' : active ? 'text-brand' : 'text-text/40'
        } ${className}`}
        style={tone ? { color: active ? color : `${color}99` } : undefined}
      />
    </motion.span>
  )
}
