import { motion } from 'framer-motion'
import { fadeUp, stagger } from './stageMotion'

const colors = [
  { name: 'Primary', hex: '#111111' },
  { name: 'Accent', hex: '#2563EB' },
  { name: 'Surface', hex: '#F7F7F7' },
  { name: 'White', hex: '#FFFFFF' },
]

export function StageDesign() {
  return (
    <div className="flex h-full overflow-hidden" dir="ltr">
      {/* Figma sidebar — layers */}
      <motion.div
        className="flex w-[22%] shrink-0 flex-col border-r border-black/[0.06] bg-[#f5f5f5]"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="border-b border-black/[0.06] px-2 py-1.5">
          <span className="text-[6px] font-semibold text-text/40">Layers</span>
        </div>
        {['🖼 Frame / Homepage', '▸ Header', '▸ Hero', '▸ Components', '▸ Footer'].map((layer, i) => (
          <motion.div
            key={layer}
            className={`truncate px-2 py-1 text-[6px] ${i === 0 ? 'bg-blue-500/10 font-medium text-blue-600' : 'text-text/45'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            {layer}
          </motion.div>
        ))}
      </motion.div>

      {/* Canvas */}
      <div className="relative flex min-w-0 flex-1 flex-col bg-[#ececec] p-2">
        <motion.div
          className="relative flex-1 overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-lg"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {/* Composed UI preview */}
          <div className="border-b border-black/[0.05] px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-[#111]" />
                <span className="text-[7px] font-bold tracking-wide text-text">BRAND</span>
              </div>
              <div className="flex gap-2">
                {['Home', 'Work', 'Contact'].map((l) => (
                  <span key={l} className="text-[5.5px] text-text/35">{l}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3">
            <motion.div
              className="text-[11px] font-bold leading-tight text-text"
              {...fadeUp}
              transition={stagger(2, 0.12)}
            >
              Premium
              <br />
              Digital Experience
            </motion.div>
            <motion.p
              className="mt-1 max-w-[70%] text-[6px] leading-relaxed text-text/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Crafted typography, color & components
            </motion.p>

            <div className="mt-2 flex gap-1.5">
              <motion.div
                className="rounded-full bg-[#111] px-2.5 py-1 text-[5.5px] font-medium text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={stagger(3, 0.12)}
              >
                Primary
              </motion.div>
              <motion.div
                className="rounded-full border border-text/15 px-2.5 py-1 text-[5.5px] font-medium text-text/60"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={stagger(4, 0.12)}
              >
                Secondary
              </motion.div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {[1, 2].map((c) => (
                <motion.div
                  key={c}
                  className="rounded-lg border border-black/[0.05] bg-[#fafafa] p-2 shadow-sm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(c + 4, 0.12)}
                >
                  <div className="h-6 rounded bg-gradient-to-br from-[#e8e8e8] to-[#f4f4f4]" />
                  <div className="mt-1.5 h-1 w-3/4 rounded bg-text/15" />
                  <div className="mt-0.5 h-1 w-1/2 rounded bg-text/08" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Design tokens panel */}
      <motion.div
        className="flex w-[26%] shrink-0 flex-col border-l border-black/[0.06] bg-white"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="border-b border-black/[0.06] px-2 py-1.5">
          <span className="text-[6px] font-semibold text-text/40">Design Tokens</span>
        </div>

        <div className="border-b border-black/[0.06] p-2">
          <span className="text-[5.5px] font-semibold uppercase tracking-wider text-text/35">Colors</span>
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            {colors.map((c, i) => (
              <motion.div
                key={c.name}
                className="flex items-center gap-1 rounded border border-black/[0.05] p-1"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={stagger(i, 0.1)}
              >
                <div className="h-4 w-4 rounded border border-black/10" style={{ background: c.hex }} />
                <div>
                  <p className="text-[5px] font-medium text-text/55">{c.name}</p>
                  <p className="text-[4.5px] text-text/30">{c.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-b border-black/[0.06] p-2">
          <span className="text-[5.5px] font-semibold uppercase tracking-wider text-text/35">Typography</span>
          <motion.div className="mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p className="text-[13px] font-bold leading-none text-text">Aa</p>
            <p className="mt-0.5 text-[6px] text-text/45">Heebo · 700</p>
            <p className="text-[6px] text-text/35">32 / 40 · Heading</p>
            <p className="mt-1 text-[7px] text-text/50">Body 16 / 24</p>
          </motion.div>
        </div>

        <div className="p-2">
          <span className="text-[5.5px] font-semibold uppercase tracking-wider text-text/35">Components</span>
          <div className="mt-1.5 space-y-1">
            <motion.div
              className="rounded-md bg-[#111] py-1 text-center text-[5.5px] font-medium text-white"
              initial={{ width: '60%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              Button / Primary
            </motion.div>
            <motion.div
              className="rounded-md border border-text/15 py-1 text-center text-[5.5px] text-text/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Button / Ghost
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
