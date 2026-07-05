import { motion, useInView, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { blurReveal, fadeUp } from '../../motion/variants'

type RevealVariant = 'fadeUp' | 'blur'

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  once?: boolean
  margin?: `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`
}

const variants = {
  fadeUp,
  blur: blurReveal,
}

export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  once = true,
  margin = '-60px',
  className,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
