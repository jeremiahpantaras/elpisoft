// Optimises the hero portraits: `npm run portraits`
//
//   put the downloaded originals (jpg / png / webp) in   src/assets/portraits/source/   (not committed)
//   this writes at most five 480px-wide WebP files to    src/assets/portraits/01-….webp  (committed, bundled)
//
// ClientProof picks up whatever optimised files exist. Record each photo's source and licence in
// src/assets/portraits/CREDITS.md. See docs/social-proof.md. Needs the `cwebp` tool (macOS: brew install webp).
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const dir = path.join(process.cwd(), 'src', 'assets', 'portraits')
const sourceDir = path.join(dir, 'source')
const originals = fs.existsSync(sourceDir)
  ? fs.readdirSync(sourceDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
  : []

if (originals.length === 0) {
  console.error(`No images found in ${path.relative(process.cwd(), sourceDir)}. Add 1 to 5 portraits there first.`)
  process.exit(1)
}
if (spawnSync('cwebp', ['-version']).error) {
  console.error('cwebp is not installed. macOS: brew install webp   (Linux: apt install webp)')
  process.exit(1)
}

// Start clean so removed originals do not leave stale outputs behind.
for (const f of fs.readdirSync(dir)) if (/^\d{2}-.*\.webp$/.test(f)) fs.unlinkSync(path.join(dir, f))

originals.slice(0, 5).forEach((file, i) => {
  const slug = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'portrait'
  const out = path.join(dir, `${String(i + 1).padStart(2, '0')}-${slug}.webp`)
  const r = spawnSync('cwebp', ['-quiet', '-q', '82', '-m', '6', '-resize', '480', '0', path.join(sourceDir, file), '-o', out])
  if (r.status !== 0) {
    console.error(`Failed to convert ${file}: ${r.stderr?.toString().trim()}`)
    process.exit(1)
  }
  console.log(`${file}  ->  ${path.relative(process.cwd(), out)}  (${(fs.statSync(out).size / 1024).toFixed(1)} kB)`)
})
if (originals.length > 5) console.log(`Note: only the first 5 of ${originals.length} files are used.`)
