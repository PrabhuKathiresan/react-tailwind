// src/utils/generateDocs.ts
import fs from 'fs'
import path from 'path'
import { withDefaultConfig } from 'react-docgen-typescript'

const SRC_DIR = path.resolve(process.cwd(), '../src/components')
const OUT_DIR = path.resolve(process.cwd(), 'src/data/components')

// Create output folder
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

// Configure parser
const parser = withDefaultConfig({
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
})

/** Recursively read all TSX files */
function getAllTSXFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) return getAllTSXFiles(file)
    if (file.endsWith('.tsx')) return [file]
    return []
  })
}

const files = getAllTSXFiles(SRC_DIR)
console.log(`🔍 Found ${files.length} component files.`)

/**
 * Extract prop table in friendly format
 * Returns ONLY custom component props,
 * filtering out inherited DOM + React props.
 */
export function extractProps(props: any) {
  return Object.entries(props ?? {})
    .filter(([_, prop]: any) => {
      const parentFile = prop.parent?.fileName ?? ''

      // ❌ Skip DOM / React inherited props from node_modules
      if (parentFile.includes('node_modules')) return false

      // ❌ Skip React HTML attributes
      if (prop.declarations?.some((d: any) => d?.fileName?.includes('node_modules'))) {
        return false
      }

      // ❌ Skip built-in common props
      const skipList = new Set([
        'children',
        'className',
        'style',
        'id',
        'ref',
        'key',
        'name',
        'value',
        'defaultValue',
        'type', // often inherited
        'onClick',
        'onChange',
        'onBlur',
        'onFocus',
        'onKeyDown',
        'onKeyUp',
        'tabIndex',
        'disabled',
        'role',
        'title',
        'aria-*',
        'data-*',
      ])

      // direct skip if exact match
      if (skipList.has(prop.name)) return false

      // wildcard skip (aria-*, data-*)
      const lower = prop.name.toLowerCase()
      if (lower.startsWith('aria-') || lower.startsWith('data-')) return false

      return true
    })
    .map(([name, prop]: any) => {
      const type = prop.type?.name ?? 'unknown'
      const raw = prop.type?.raw ?? prop.type?.name ?? ''

      let enumValues: string[] | null = null

      // Extract enum values
      if (type === 'enum' && Array.isArray(prop.type.value)) {
        enumValues = prop.type.value.map((v: any) =>
          String(v.value).replace(/^['"`](.*)['"`]$/, '$1'),
        )
      }

      // Extract unions
      if (type === 'union' && Array.isArray(prop.type.value)) {
        enumValues = prop.type.value.map((v: any) =>
          String(v.value ?? v).replace(/^['"`](.*)['"`]$/, '$1'),
        )
      }

      return {
        name,
        type,
        raw,
        enumValues,
        required: prop.required ?? false,
        defaultValue: prop.defaultValue?.value ?? null,
        description: prop.description ?? '',
      }
    })
}

/**
 * Write JSON file safely
 */
function writeJSON(outPath: string, data: any) {
  const folder = path.dirname(outPath)
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2))
}

/**
 * MAIN LOOP
 */
for (const file of files) {
  console.log(`📄 Parsing: ${file}`)
  const base = path.basename(file).toLowerCase()

  // Skip barrels and type-barrels
  if (base === 'index.ts' || base === 'index.types.ts') {
    console.log(`⏭️  Skipping index file: ${file}`)
    continue
  }

  try {
    const docs = parser.parse(file)
    if (!docs.length) {
      console.warn(`⚠️ No components found in ${file}`)
      continue
    }

    for (const doc of docs) {
      const componentName = doc.displayName || path.basename(file, '.tsx')

      const outFolder = path.join(OUT_DIR, path.relative(SRC_DIR, path.dirname(file)))

      const outPath = path.join(outFolder, `${componentName}.json`)

      const props = extractProps(doc.props)

      const data = {
        name: componentName,
        description: doc.description ?? '',
        props,
      }

      writeJSON(outPath, data)
      console.log(`  ✅ ${componentName} → ${outPath}`)
    }
  } catch (err) {
    console.error(`❌ Failed to parse ${file}`, err)
  }
}

console.log('📘 Documentation JSON generation complete!')
