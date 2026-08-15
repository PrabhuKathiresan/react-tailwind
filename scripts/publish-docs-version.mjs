// Updates versions.json on the gh-pages checkout as part of the docs deploy.
// Usage: node scripts/publish-docs-version.mjs <targetDir> <version> <archive:true|false>
import fs from 'fs'
import path from 'path'

const [, , targetDir, version, archiveFlag] = process.argv

if (!targetDir || !version) {
  console.error('Usage: node publish-docs-version.mjs <targetDir> <version> <archive:true|false>')
  process.exit(1)
}

const archive = archiveFlag === 'true'
const manifestPath = path.join(targetDir, 'versions.json')

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  : { latest: null, versions: [] }

if (archive && !manifest.versions.some((v) => v.version === version)) {
  manifest.versions.push({
    version,
    date: new Date().toISOString().slice(0, 10),
    path: `/react-tailwind/v/${version}/`,
  })
}

// Newest first, comparing numerically by [major, minor, patch].
manifest.versions.sort((a, b) => {
  const pa = a.version.split('.').map(Number)
  const pb = b.version.split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pb[i] - pa[i]
  }
  return 0
})

manifest.latest = version

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`versions.json updated: latest=${version}, archived=${archive}`)
