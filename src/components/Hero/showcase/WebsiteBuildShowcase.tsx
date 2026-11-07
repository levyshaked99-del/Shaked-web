import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react'
import { STORY } from '../../../design/storyColors'
import { usePerformanceProfile } from '../../../hooks/usePerformanceProfile'
import { EASE_PREMIUM } from '../../../motion/easing'
import { BrowserFrame } from './BrowserFrame'
import {
  BUILD_STAGES,
  type BuildStageIndex,
  useWebsiteBuildSequence,
} from './useWebsiteBuildSequence'

const PURPLE = STORY.purple

/** Approved illustrative hero — fictional mock only */
const MOCK_HERO_IMAGE_SRC = '/images/hero/mock-interior-architecture.png'

const HERO_IMAGE_OBJECT = { objectPosition: '52% 48%' } as const

function HeroInteriorPhoto({ className = '' }: { className?: string }) {
  return (
    <img
      src={MOCK_HERO_IMAGE_SRC}
      alt=""
      aria-hidden
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={HERO_IMAGE_OBJECT}
      decoding="async"
      draggable={false}
    />
  )
}

/** Shared chrome — keeps stages aligned during crossfades */
function MockChrome({ navFilled }: { navFilled: 'wire' | 'muted' | 'text' }) {
  const immersive = navFilled === 'text'

  return (
    <div
      className={[
        'relative z-20 flex shrink-0 items-center justify-between px-2.5 py-1.5 md:px-3 md:py-2',
        immersive ? 'border-b border-white/10 bg-black/20' : 'border-b border-black/[0.05] bg-white',
      ].join(' ')}
    >
      <div className="flex items-center gap-1.5">
        {navFilled === 'wire' ? (
          <div className="h-3 w-3 rounded border border-dashed border-black/[0.14]" />
        ) : (
          <div className="flex h-3.5 w-3.5 items-center justify-center rounded-md bg-text shadow-sm">
            <span className="text-[5px] font-bold text-white">א</span>
          </div>
        )}
        {navFilled === 'text' ? (
          <span className="text-[6px] font-semibold tracking-wide text-text/55 md:text-[7px]">Studio Mock</span>
        ) : (
          <div
            className={`h-1.5 rounded ${navFilled === 'wire' ? 'w-10 border border-dashed border-black/[0.1]' : 'w-9 bg-black/[0.1]'}`}
          />
        )}
      </div>
      <div className="flex gap-1.5 md:gap-2" aria-hidden>
        {navFilled === 'text'
          ? ['שירותים', 'צור קשר'].map((item) => (
              <span key={item} className="text-[5px] text-text/32 md:text-[6px]">
                {item}
              </span>
            ))
          : [1, 2, 3].map((i) => (
              <div
                key={i}
                className={
                  navFilled === 'wire'
                    ? 'h-1.5 w-5 rounded-full border border-dashed border-black/[0.1]'
                    : 'h-1.5 w-4 rounded-full bg-black/[0.08]'
                }
              />
            ))}
      </div>
    </div>
  )
}

function StructureMock() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
        aria-hidden
      />
      <MockChrome navFilled="wire" />
      <div className="relative flex min-h-0 flex-1 flex-col p-2.5 md:p-3">
        <div
          className="relative flex-1 rounded-lg border border-dashed p-2 md:p-2.5"
          style={{ borderColor: PURPLE.muted }}
        >
          <div className="h-1.5 w-12 rounded border border-dashed border-black/[0.1]" />
          <div className="mt-2 space-y-1.5">
            <div className="h-2.5 w-[78%] rounded border border-dashed border-black/[0.11]" />
            <div className="h-2 w-[52%] rounded border border-dashed border-black/[0.09]" />
          </div>
          <div className="mt-2.5 flex gap-2">
            <div className="h-3.5 flex-1 rounded-md border border-dashed border-black/[0.1]" />
            <div className="h-3.5 w-[38%] rounded-md border border-dashed border-black/[0.08]" />
          </div>
          <div className="mt-2.5 grid flex-1 grid-cols-[1.1fr_0.9fr] gap-2">
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded border border-dashed border-black/[0.08]" />
              <div className="h-1.5 w-[85%] rounded border border-dashed border-black/[0.07]" />
              <div className="mt-2 h-4 w-16 rounded-full border border-dashed border-black/[0.1]" />
            </div>
            <div className="rounded-md border border-dashed border-black/[0.1] bg-black/[0.02]" />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 md:mt-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 rounded-md border border-dashed border-black/[0.09] md:h-10" />
          ))}
        </div>
      </div>
    </div>
  )
}

const HERO_SCRIM_POLISH =
  'linear-gradient(to top, rgba(14,13,11,0.78) 0%, rgba(14,13,11,0.38) 40%, transparent 68%)'

function DesignMock({ instant }: { instant: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-secondary/40" dir="rtl">
      <MockChrome navFilled="muted" />

      <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 md:gap-2.5 md:p-3">
        <div className="grid min-h-0 flex-1 grid-cols-[1.05fr_0.95fr] items-stretch gap-2 md:gap-2.5">
          <div
            className="relative flex flex-col justify-center rounded-lg border-2 bg-white p-2 text-right md:p-2.5"
            style={{ borderColor: PURPLE.muted, boxShadow: `0 0 0 1px ${PURPLE.faint}` }}
          >
            <span className="text-[4.5px] font-medium tracking-wide text-text/35 md:text-[5px]" aria-hidden>
              Hero · כותרת
            </span>
            <span
              className="mt-0.5 text-[5px] font-semibold tracking-[0.12em] md:text-[6px]"
              style={{ color: PURPLE.DEFAULT }}
            >
              עיצוב
            </span>
            <h3 className="mt-1 text-[10px] font-bold leading-tight text-text md:text-[11px]">אתר מדויק</h3>
            <p className="mt-1 max-w-full text-[5px] leading-snug text-text/50 md:text-[6px]">
              מסר קצר שמסביר את הערך.
            </p>
            <div className="mt-1 h-1 w-[38%] rounded bg-black/[0.06] ms-auto" aria-hidden />
            <div
              className="mt-2 inline-flex w-fit items-center rounded-full border border-dashed px-2.5 py-0.5 text-[5px] font-semibold md:text-[6px]"
              style={{ borderColor: PURPLE.muted, color: PURPLE.DEFAULT, backgroundColor: PURPLE.faint }}
            >
              צור קשר
            </div>
            <div className="mt-2 flex items-center justify-end gap-1 border-t border-dashed border-black/[0.07] pt-1.5" aria-hidden>
              <span className="rounded border border-dashed border-black/[0.1] px-1 py-0.5 text-[4px] text-text/40">
                16px
              </span>
              <span className="h-2 w-2 rounded-full border border-black/[0.08]" style={{ backgroundColor: PURPLE.soft }} />
              <span className="h-2 w-2 rounded-full bg-text/80" />
              <span className="h-2 w-2 rounded-full bg-secondary" />
            </div>
          </div>

          <div
            className="relative min-h-[72px] overflow-hidden rounded-lg border-2 bg-white md:min-h-[84px]"
            style={{ borderColor: PURPLE.muted }}
          >
            <motion.div
              className="absolute inset-0"
              initial={instant ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 0.72, scale: 1.04 }}
              transition={{ duration: instant ? 0 : 1.05, ease: EASE_PREMIUM }}
            >
              <img
                src={MOCK_HERO_IMAGE_SRC}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                style={HERO_IMAGE_OBJECT}
                decoding="async"
                draggable={false}
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-white/35" aria-hidden />
            <div className="pointer-events-none absolute inset-1.5 rounded-md border border-dashed border-black/[0.14]" aria-hidden />
            <div
              className="pointer-events-none absolute end-1 top-1 h-1.5 w-1.5 rounded-sm border border-white/80"
              style={{ backgroundColor: PURPLE.DEFAULT, opacity: 0.7 }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-1 start-1 h-1.5 w-1.5 rounded-sm border border-white/80"
              style={{ backgroundColor: PURPLE.DEFAULT, opacity: 0.7 }}
              aria-hidden
            />
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-1.5 md:gap-2">
          {[
            { label: 'תוכן', tint: false },
            { label: 'מבנה', tint: true },
            { label: 'חוויה', tint: false },
          ].map(({ label, tint }) => (
            <div
              key={label}
              className={[
                'rounded-md border p-1.5 text-center md:p-2',
                tint ? 'border-black/[0.08] bg-white' : 'border-dashed border-black/[0.1] bg-white/80',
              ].join(' ')}
              style={tint ? { boxShadow: `inset 0 0 0 1px ${PURPLE.faint}` } : undefined}
            >
              <div className="mx-auto mb-1 h-1 w-3 rounded bg-black/[0.1]" aria-hidden />
              <span className="text-[4.5px] font-medium text-text/60 md:text-[5px]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PolishMock({ instant, transitionMs, polishActive }: { instant: boolean; transitionMs: number; polishActive: boolean }) {
  const settle = instant ? 0 : transitionMs / 1000

  return (
    <div className="absolute inset-0 flex flex-col bg-[#1a1816]" dir="rtl">
      <MockChrome navFilled="text" />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <HeroInteriorPhoto />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: HERO_SCRIM_POLISH }}
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col justify-end px-3 pb-3.5 pt-1 md:px-3.5 md:pb-4">
          <motion.div
            key={polishActive ? 'polish-headline-active' : 'polish-headline-idle'}
            className="text-right"
            initial={instant ? false : { opacity: 0.9, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: instant ? 0 : settle * 0.85, ease: EASE_PREMIUM }}
          >
            <h3 className="text-[15px] font-extrabold leading-[0.94] tracking-[-0.04em] text-white md:text-[16px]">
              אתר{' '}
              <span className="font-semibold text-white/88">מוכן</span>
            </h3>
            <div className="mt-3 inline-flex items-center rounded-full bg-accent px-3.5 py-1 text-[6px] font-semibold text-white shadow-depth-sm md:px-4 md:py-1.5 md:text-[7px]">
              צור קשר
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function SiteBuildMock({
  stageIndex,
  loopBlend,
  isLoopBlending,
  transitionMs,
  instant,
}: {
  stageIndex: BuildStageIndex
  loopBlend: number
  isLoopBlending: boolean
  transitionMs: number
  instant: boolean
}) {
  const t = instant ? 0 : transitionMs / 1000
  const structureOpacity = stageIndex === 0 ? 1 : isLoopBlending ? loopBlend : 0
  const designOpacity = stageIndex === 1 ? 1 : 0
  const polishOpacity = stageIndex === 2 ? (isLoopBlending ? 1 - loopBlend : 1) : 0

  const layerTransition = {
    duration: t,
    ease: EASE_PREMIUM,
  }

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ opacity: polishOpacity }}
        transition={{ ...layerTransition, ease: EASE_PREMIUM }}
        aria-hidden={polishOpacity < 0.05}
      >
        <PolishMock
          instant={instant}
          transitionMs={transitionMs}
          polishActive={stageIndex === 2 && !isLoopBlending}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-20"
        animate={{ opacity: designOpacity }}
        transition={{ ...layerTransition, delay: instant ? 0 : stageIndex === 1 ? 0.04 : 0 }}
        aria-hidden={designOpacity < 0.05}
      >
        <DesignMock instant={instant} />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-30"
        animate={{ opacity: structureOpacity }}
        transition={layerTransition}
        aria-hidden={structureOpacity < 0.05}
      >
        <StructureMock />
      </motion.div>
    </div>
  )
}

function GhostFrame({ offsetClass }: { offsetClass: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden opacity-[0.2] lg:block ${offsetClass}`}
      aria-hidden
    >
      <div className="h-full w-full rounded-2xl border border-black/[0.06] bg-white shadow-depth-sm md:rounded-[20px]" />
    </div>
  )
}

export function WebsiteBuildShowcase() {
  const { enableHeavyEffects, prefersReducedMotion, isMobile } = usePerformanceProfile()
  const [pausedHover, setPausedHover] = useState(false)
  const [pausedFocus, setPausedFocus] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [liveAnnouncement, setLiveAnnouncement] = useState('')
  const regionRef = useRef<HTMLDivElement>(null)
  const prevStageRef = useRef<BuildStageIndex | null>(null)

  const {
    stageIndex,
    goToStage,
    loopBlend,
    isLoopBlending,
    announceText,
    transitionMs,
  } = useWebsiteBuildSequence({
    prefersReducedMotion,
    isMobile,
    pausedHover,
    pausedFocus,
  })

  useEffect(() => {
    if (prevStageRef.current === stageIndex && !isLoopBlending) return
    if (!isLoopBlending) {
      prevStageRef.current = stageIndex
      setLiveAnnouncement(announceText)
    }
  }, [stageIndex, announceText, isLoopBlending])

  useEffect(() => {
    if (!enableHeavyEffects || prefersReducedMotion) return

    const el = regionRef.current
    if (!el) return

    const onMove = (event: PointerEvent) => {
      if (pausedHover || pausedFocus) return
      const rect = el.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      setParallax({ x: nx * 10, y: ny * 6 })
    }

    const onLeave = () => setParallax({ x: 0, y: 0 })

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [enableHeavyEffects, prefersReducedMotion, pausedHover, pausedFocus])

  const onFocusCapture = useCallback(() => setPausedFocus(true), [])
  const onBlurCapture = useCallback((event: FocusEvent) => {
    if (!regionRef.current?.contains(event.relatedTarget as Node)) {
      setPausedFocus(false)
    }
  }, [])

  const instant = prefersReducedMotion

  return (
    <div
      ref={regionRef}
      className="hero-build-showcase relative w-full min-w-0"
      role="region"
      aria-label="תצוגת בניית אתר"
      onMouseEnter={() => setPausedHover(true)}
      onMouseLeave={() => setPausedHover(false)}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
    >
      <span className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </span>

      <motion.div
        className="relative"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.25, ease: EASE_PREMIUM }}
        style={
          enableHeavyEffects
            ? { transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }
            : undefined
        }
      >
        <div
          className="pointer-events-none absolute -inset-4 rounded-[28px] opacity-80 md:-inset-8 lg:-inset-10"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 45%, ${PURPLE.faint}, transparent 70%)`,
          }}
          aria-hidden
        />

        <div className="relative lg:[perspective:1200px]">
          <GhostFrame offsetClass="translate-x-3 translate-y-4 -rotate-[1deg]" />
          <GhostFrame offsetClass="-translate-x-2 translate-y-2 rotate-[0.5deg]" />

          <div className="relative lg:[transform:rotateY(-2deg)_rotateX(1deg)]">
            <BrowserFrame>
              <SiteBuildMock
                stageIndex={stageIndex}
                loopBlend={loopBlend}
                isLoopBlending={isLoopBlending}
                transitionMs={transitionMs}
                instant={instant}
              />
            </BrowserFrame>
          </div>
        </div>
      </motion.div>

      <div
        className="mt-2 flex items-center justify-center gap-1 md:mt-3 md:gap-2"
        role="group"
        aria-label="שלבי בניית האתר"
        dir="rtl"
      >
        {BUILD_STAGES.map((stage) => {
          const active = stage.id === stageIndex

          return (
            <button
              key={stage.id}
              type="button"
              aria-current={active ? 'step' : undefined}
              onClick={() => goToStage(stage.id as BuildStageIndex)}
              className={[
                'relative rounded-full px-2.5 py-0.5 text-[11px] transition-colors md:px-3 md:py-1 md:text-xs',
                active ? 'font-semibold text-text' : 'font-medium text-text/45 hover:text-text/65',
              ].join(' ')}
            >
              {active && (
                <span
                  className="absolute inset-x-2 -bottom-0.5 h-px md:inset-x-2.5"
                  style={{ backgroundColor: PURPLE.DEFAULT, opacity: 0.55 }}
                  aria-hidden
                />
              )}
              {stage.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
