// src/utils/generateDocs.ts
import fs from 'fs'
import path from 'path'
import { withDefaultConfig } from 'react-docgen-typescript'

const componentAllowList: Record<string, string[]> = {
  Alert: ['type'],
  Button: ['type', 'disabled'],
  Drawer: ['title'],
}

const SRC_DIR = path.resolve(process.cwd(), '../react-tailwind/src/components')
const OUT_DIR = path.resolve(process.cwd(), 'src/data/components')

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

// Configure parser
const parser = withDefaultConfig({
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
})

/** Recursively get all .tsx files in a directory */
function getAllTSXFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getAllTSXFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      files.push(fullPath)
    }
  }

  return files
}

const componentFiles = getAllTSXFiles(SRC_DIR)
console.log(
  '🔍 Found component files:',
  componentFiles.map((f) => path.basename(f)),
)

for (const filePath of componentFiles) {
  try {
    const docs = parser.parse(filePath)

    if (!docs || docs.length === 0) {
      console.warn(`⚠️  No docs found for: ${filePath}`)
      continue
    }

    const doc = docs[0]

    const propsArray = Object.entries(doc.props ?? {})
      .filter(([propName, prop]: any) => {
        const allowedProps = componentAllowList[doc.displayName] ?? []
        const allowList = ['type', 'title', 'disabled', ...allowedProps]

        if (allowList.includes(propName)) return true
        // Filter out inherited DOM props
        const isDomProp =
          propName.startsWith('aria-') ||
          propName.startsWith('data-') ||
          [
            'className',
            'style',
            'onClick',
            'onChange',
            'onFocus',
            'onBlur',
            'ref',
            'id',
            'type',
            'disabled',
            'tabIndex',
            'role',
            'title',
            'value',
            'name',
          ].includes(propName)

        // Filter out react HTML attributes
        const isHtmlAttribute =
          prop.parent?.fileName?.includes('node_modules') ||
          prop.declarations?.some((d: any) => d?.fileName?.includes('node_modules'))

        return !isDomProp && !isHtmlAttribute
      })
      .map(([propName, prop]: any) => {
        const typeName = prop.type?.name ?? 'unknown'
        const raw = prop.type?.raw ?? prop.type?.name ?? ''

        let enumValues: string[] | null = null
        if (typeName === 'enum' && Array.isArray(prop.type?.value)) {
          enumValues = prop.type.value.map((v: any) =>
            String(typeof v === 'object' ? (v.value ?? v) : v).replace(/^['"`](.*)['"`]$/, '$1'),
          )
        } else if (typeName === 'union' && Array.isArray(prop.type?.value)) {
          enumValues = prop.type.value.map((v: any) =>
            String(v.value ?? v).replace(/^['"`](.*)['"`]$/, '$1'),
          )
        }

        const defaultValue = prop.defaultValue?.value ?? null

        return {
          name: propName,
          type: typeName,
          raw,
          enumValues,
          required: !!prop.required,
          defaultValue,
          description: prop.description ?? '',
        }
      })

    // Compute component name relative to base folder (Button/Button.tsx → Button)
    const relativeDir = path
      .relative(SRC_DIR, path.dirname(filePath))
      .split(path.sep)
      .filter(Boolean)
      .join('/')

    const componentName =
      doc.displayName ?? path.basename(filePath, '.tsx') ?? relativeDir.split('/').slice(-1)[0]

    // Make subfolders inside OUT_DIR mirror the SRC_DIR structure
    const outFolder = path.join(OUT_DIR, relativeDir)
    if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder, { recursive: true })

    const out = {
      name: componentName,
      description: doc.description ?? '',
      props: propsArray,
    }

    const outFile = path.join(outFolder, `${componentName}.json`)
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2))
    console.log(`✅ Generated docs for: ${componentName}`)
  } catch (err) {
    console.error(`❌ Error parsing ${filePath}:`, err)
  }
}

console.log('📘 Documentation JSON generation complete!')
