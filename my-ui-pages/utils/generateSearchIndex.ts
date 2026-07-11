/**
 * utils/generateSearchIndex.ts
 *
 * Builds public/search-index.json from the already-generated component JSON
 * files in src/data/components/. Those files are produced by generateDocs.ts
 * (react-docgen-typescript) and already have correctly filtered, typed props.
 */

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.resolve(process.cwd(), 'src', 'data', 'components')
const OUTPUT_PATH = path.resolve(process.cwd(), 'public', 'search-index.json')

type PropInfo = {
  name: string
  type: string
  required: boolean
  description: string
  defaultValue?: string | null
}

type SearchItem = {
  name: string
  description: string
  props: PropInfo[]
  keywords: string[]
  url: string
}

const BLOCKED_KEYWORDS = new Set([
  'string',
  'number',
  'boolean',
  'any',
  'void',
  'null',
  'undefined',
  'object',
  'never',
  'unknown',
  'true',
  'false',
  'react',
  'node',
])

function toKebabRoute(name: string): string {
  return '/' + name.replace(/([A-Z])/g, (m, l, i) => (i === 0 ? l : `-${l}`)).toLowerCase()
}

function buildKeywords(name: string, props: PropInfo[]): string[] {
  const raw = [
    name.toLowerCase(),
    ...props.map((p) => p.name.toLowerCase()),
    ...props.flatMap((p) =>
      p.type
        .split(/\W+/)
        .map((t) => t.toLowerCase())
        .filter((t) => t.length > 2 && !BLOCKED_KEYWORDS.has(t)),
    ),
    ...props
      .filter((p) => p.description)
      .flatMap((p) =>
        p.description
          .toLowerCase()
          .split(/\W+/)
          .filter((w) => w.length > 3 && !BLOCKED_KEYWORDS.has(w)),
      ),
  ]

  return [...new Set(raw)].filter(Boolean)
}

function main() {
  const componentDirs = fs
    .readdirSync(DATA_DIR)
    .filter((f) => fs.statSync(path.join(DATA_DIR, f)).isDirectory())

  const items: SearchItem[] = componentDirs.flatMap((dirName) => {
    const dirPath = path.join(DATA_DIR, dirName)

    const jsonFiles = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith('.json') && !f.includes('index'))

    return jsonFiles.map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf-8'))

      const name: string = raw.name ?? dirName
      const description: string = raw.description?.trim() || `${name} component`

      const props: PropInfo[] = (raw.props ?? []).map((p: any) => ({
        name: p.name,
        type: p.raw ?? p.type ?? '',
        required: p.required ?? false,
        description: p.description ?? '',
        defaultValue: p.defaultValue ?? null,
      }))

      return {
        name,
        description,
        props,
        keywords: buildKeywords(name, props),
        url: toKebabRoute(name),
      }
    })
  })

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2))
  console.log(`✅ Search index: ${items.length} components`)
  items.filter((i) => i.props.length === 0).forEach((i) => console.log(`  ⚠️  No props: ${i.name}`))
}

main()
