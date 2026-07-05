import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { stagger } from './stageMotion'

const files = [
  { name: 'shaked-web', indent: 0, icon: '📁' },
  { name: 'src/', indent: 1, icon: '📁' },
  { name: 'components/', indent: 2, icon: '📁' },
  { name: 'Hero.tsx', indent: 3, active: true },
  { name: 'HeroContent.tsx', indent: 3 },
  { name: 'app/', indent: 1, icon: '📁' },
  { name: 'page.tsx', indent: 2 },
]

const fullCode = [
  { parts: [{ t: "'use client'", c: 'text-[#6a9955]' }] },
  { parts: [] },
  { parts: [{ t: 'import', c: 'text-[#c586c0]' }, { t: ' { Hero } ', c: 'text-[#d4d4d4]' }, { t: 'from', c: 'text-[#c586c0]' }, { t: " '@/components/Hero'", c: 'text-[#ce9178]' }] },
  { parts: [] },
  { parts: [{ t: 'export', c: 'text-[#c586c0]' }, { t: ' default function ', c: 'text-[#d4d4d4]' }, { t: 'Page', c: 'text-[#dcdcaa]' }, { t: '() {', c: 'text-[#d4d4d4]' }] },
  { parts: [{ t: '  return', c: 'text-[#c586c0]' }, { t: ' (', c: 'text-[#d4d4d4]' }] },
  { parts: [{ t: '    <Hero', c: 'text-[#4ec9b0]' }, { t: ' journey', c: 'text-[#9cdcfe]' }, { t: ' />', c: 'text-[#4ec9b0]' }] },
  { parts: [{ t: '  )', c: 'text-[#d4d4d4]' }] },
  { parts: [{ t: '}', c: 'text-[#d4d4d4]' }] },
]

const terminalLines = [
  { text: '$ git commit -m "feat: hero journey"', delay: 0.3 },
  { text: '[main a3f2c1] feat: hero journey', delay: 0.9 },
  { text: '$ npm run build', delay: 1.4 },
  { text: '▸ Compiling...', delay: 1.9 },
  { text: '✓ Compiled successfully', delay: 2.5, success: true },
  { text: '✓ Ready in 1.2s', delay: 3, success: true },
]

export function StageDevelopment() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const typingTarget = '    <Hero journey />'

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((v) => Math.min(v + 1, fullCode.length))
    }, 280)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (visibleLines < 7) return
    const interval = setInterval(() => {
      setTypedChars((c) => Math.min(c + 1, typingTarget.length))
    }, 45)
    return () => clearInterval(interval)
  }, [visibleLines])

  return (
    <div className="flex h-full flex-col" dir="ltr">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#252526] px-2 py-1">
        <div className="h-[8px] w-[8px] rounded-full bg-[#ff5f57]" />
        <div className="h-[8px] w-[8px] rounded-full bg-[#febc2e]" />
        <div className="h-[8px] w-[8px] rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[7px] text-white/35">Visual Studio Code — shaked-web</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Explorer */}
        <motion.div
          className="w-[28%] shrink-0 border-r border-white/[0.06] bg-[#252526] py-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="px-2 text-[6px] font-semibold uppercase tracking-wider text-white/25">Explorer</span>
          {files.map((f, i) => (
            <motion.div
              key={f.name}
              className={`truncate py-0.5 font-mono text-[6.5px] ${
                f.active ? 'bg-[#37373d] text-[#4ec9b0]' : 'text-white/40'
              }`}
              style={{ paddingLeft: `${8 + f.indent * 10}px` }}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={stagger(i, 0.05)}
            >
              {f.icon ? `${f.icon} ` : '  '}{f.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Editor */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#1e1e1e]">
          <div className="flex items-center border-b border-white/[0.06] bg-[#2d2d2d]">
            <div className="border-r border-white/[0.06] px-3 py-1 text-[6.5px] text-white/70">Hero.tsx</div>
            <div className="px-3 py-1 text-[6.5px] text-white/30">page.tsx</div>
          </div>
          <div className="flex-1 overflow-hidden py-2 pl-3 font-mono">
            {fullCode.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="flex leading-[15px]">
                <span className="mr-3 w-3 text-right text-[6px] text-white/20">{i + 1}</span>
                <div>
                  {i === 6 ? (
                    <span className="text-[7px]">
                      <span className="text-[#4ec9b0]">{typingTarget.slice(0, Math.min(typedChars, 9))}</span>
                      {typedChars > 9 && (
                        <span className="text-[#7C3AED]">{typingTarget.slice(9, typedChars)}</span>
                      )}
                      {typedChars < typingTarget.length && (
                        <motion.span
                          className="inline-block h-[10px] w-px bg-white/70"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                    </span>
                  ) : (
                    line.parts.map((p, j) => (
                      <span key={j} className={`text-[7px] ${p.c}`}>{p.t}</span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal + Git */}
      <div className="border-t border-white/[0.06] bg-[#141414]">
        <div className="flex items-center gap-2 border-b border-white/[0.04] px-2 py-0.5">
          {['TERMINAL', 'GIT', 'PROBLEMS'].map((tab, i) => (
            <span key={tab} className={`text-[5.5px] ${i === 0 ? 'text-white/60' : 'text-white/25'}`}>{tab}</span>
          ))}
        </div>
        <div className="space-y-0.5 px-2 py-1.5 font-mono">
          {terminalLines.map((line) => (
            <motion.div
              key={line.text}
              className={`text-[6px] ${line.success ? 'text-[#16A34A]' : 'text-white/40'}`}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: line.delay, duration: 0.3 }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
