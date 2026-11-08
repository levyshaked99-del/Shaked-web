import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const srcDir = join(root, 'src')
const publicDir = join(root, 'public')
const distDir = join(root, 'dist')

const ASSET_RE = /['"`](\/(?!\/)[^'"`?\s#]+\.(?:png|webp|jpg|jpeg|svg|gif))['"`]/g

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(tsx?|jsx?|css)$/.test(name)) out.push(p)
  }
  return out
}

const refs = new Set()
for (const file of walk(srcDir)) {
  const text = readFileSync(file, 'utf8')
  for (const m of text.matchAll(ASSET_RE)) refs.add(m[1])
}

const missingPublic = []
const missingDist = []
for (const ref of [...refs].sort()) {
  const rel = ref.slice(1)
  if (!existsSync(join(publicDir, rel))) missingPublic.push(ref)
  if (existsSync(distDir) && !existsSync(join(distDir, rel))) missingDist.push(ref)
}

console.log('Referenced public assets:', refs.size)
if (missingPublic.length) {
  console.error('Missing in public/:')
  missingPublic.forEach((p) => console.error(' -', p))
  process.exit(1)
}
if (existsSync(distDir) && missingDist.length) {
  console.error('Missing in dist/ (after build):')
  missingDist.forEach((p) => console.error(' -', p))
  process.exit(1)
}
console.log('All referenced assets exist in public/' + (existsSync(distDir) ? ' and dist/.' : '.'))
