import { motion, useInView, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { staggerContainer, staggerItem, staggerItemBlur } from '../../motion/variants'

type StaggerVariant = 'fadeUp' | 'blur'

interface StaggerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: StaggerVariant
  stagger?: number
  delayChildren?: number
  once?: boolean
  margin?: `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`
}

const itemVariants = {
  fadeUp: staggerItem,
  blur: staggerItemBlur,
}

export function Stagger({
  children,
  variant = 'fadeUp',
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  margin = '-60px',
  className,
  ...props
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: StaggerVariant
}

export function StaggerItem({ children, variant = 'fadeUp', className, ...props }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants[variant]} {...props}>
      {children}
    </motion.div>
  )
}
