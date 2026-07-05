import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger } from './stageMotion'

function PostIt({
  color,
  rotate,
  x,
  y,
  children,
  delay,
}: {
  color: string
  rotate: number
  x: string
  y: string
  children: ReactNode
  delay: number
}) {
  return (
    <motion.div
      className={`absolute w-[72px] rounded-sm px-2 py-1.5 shadow-md ${color}`}
      style={{ left: x, top: y, rotate: `${rotate}deg` }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotate - 8 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ ...stagger(delay, 0.15), type: 'spring', stiffness: 200 }}
    >
      <p className="text-[7px] font-medium leading-snug text-amber-950/75" style={{ fontFamily: 'Georgia, serif' }}>
        {children}
      </p>
    </motion.div>
  )
}

export function StageIdea() {
  return (
    <div className="relative h-full w-full overflow-hidden p-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_55%)]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 280" fill="none" aria-hidden>
        <motion.path
          d="M200 140 L120 80"
          stroke="#8a7355"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d="M200 140 L280 75"
          stroke="#8a7355"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        />
        <motion.path
          d="M200 140 L200 210"
          stroke="#8a7355"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d="M200 140 L290 195"
          stroke="#8a7355"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        />
        <motion.path
          d="M200 140 L95 195"
          stroke="#8a7355"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
        <motion.path
          d="M60 240 H280"
          stroke="#6b5c4a"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        />
        <motion.path
          d="M280 240 L320 240 L310 235 M320 240 L310 245"
          stroke="#6b5c4a"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.4, delay: 1.8 }}
        />
        <motion.rect
          x="155"
          y="115"
          width="90"
          height="58"
          rx="2"
          stroke="#5c4a38"
          strokeWidth="1.4"
          strokeDasharray="5 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ opacity: 0.75, pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.rect
          x="162"
          y="122"
          width="76"
          height="8"
          rx="1"
          fill="#5c4a38"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.15, width: 76 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        {[0, 1, 2].map((i) => (
          <motion.line
            key={i}
            x1="162"
            y1={138 + i * 10}
            x2={220 - i * 15}
            y2={138 + i * 10}
            stroke="#7a6652"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 0.4, delay: 1 + i * 0.12 }}
          />
        ))}
      </svg>

      {[
        { label: 'אתר', x: '44%', y: '44%', delay: 0.5, main: true },
        { label: 'לידים', x: '22%', y: '22%', delay: 0.65 },
        { label: 'אמון', x: '62%', y: '20%', delay: 0.8 },
        { label: 'עיצוב', x: '44%', y: '68%', delay: 0.95 },
        { label: 'המרות', x: '68%', y: '62%', delay: 1.1 },
        { label: 'קהל יעד', x: '16%', y: '62%', delay: 1.25 },
      ].map((node) => (
        <motion.div
          key={node.label}
          className={`absolute flex items-center justify-center rounded-full border ${
            node.main
              ? 'h-10 w-10 border-story-yellow/25 bg-story-yellow-soft/90'
              : 'h-7 w-7 border-story-yellow/15 bg-white/80'
          }`}
          style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...stagger(node.delay, 0.1), type: 'spring', stiffness: 260 }}
        >
          <span className={`${node.main ? 'text-[8px] font-bold' : 'text-[6.5px] font-medium'} text-amber-950/75`}>
            {node.label}
          </span>
        </motion.div>
      ))}

      <PostIt color="bg-story-yellow-soft/95" rotate={-4} x="4%" y="8%" delay={0}>
        🎯 יותר לידים
      </PostIt>
      <PostIt color="bg-story-yellow-soft/90" rotate={3} x="72%" y="6%" delay={1}>
        ✦ בידול מהמתחרים
      </PostIt>
      <PostIt color="bg-story-blue-soft/95" rotate={-2} x="78%" y="38%" delay={2}>
        📱 Mobile first
      </PostIt>
      <PostIt color="bg-story-green-soft/90" rotate={5} x="2%" y="42%" delay={3}>
        ⚡ מהירות טעינה
      </PostIt>

      <motion.div
        className="absolute bottom-[18%] left-[6%] rounded border border-amber-900/15 bg-white/90 px-2.5 py-2 shadow-sm"
        {...fadeUp}
        transition={stagger(4, 0.15)}
      >
        <p className="text-[6px] font-semibold uppercase tracking-wider text-amber-900/40">יעדים עסקיים</p>
        <div className="mt-1 space-y-0.5">
          {['×3 פניות', 'אמון מותג', 'המרה'].map((g, i) => (
            <motion.div
              key={g}
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={stagger(i + 5, 0.1)}
            >
              <span className="text-[6px] text-amber-800/50">✓</span>
              <span className="text-[7px] text-amber-950/70">{g}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[6%] left-[12%] flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.5 }}
      >
        {['כניסה', 'עניין', 'פנייה'].map((step, i) => (
          <motion.span
            key={step}
            className="rounded-full border border-amber-900/20 bg-amber-50/80 px-2 py-0.5 text-[6.5px] text-amber-950/65"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 + i * 0.15 }}
          >
            {step}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[12%] h-10 w-2 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, #f4d03f, #e8c547 45%, #c0392b 72%, #2c3e50)',
          rotate: '135deg',
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
    </div>
  )
}
