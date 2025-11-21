/**
 * scripts/generateSearchIndex.ts
 *
 * Generates search-index.json from components.
 */

import fs from 'fs'
import path from 'path'
import {
  Project,
  SyntaxKind,
  InterfaceDeclaration,
  PropertySignature,
  Node,
  SourceFile,
} from 'ts-morph'

type PropInfo = {
  name: string
  type: string
  required: boolean
  description: string
  defaultValue?: string
}

type SearchItem = {
  name: string
  description: string
  props: PropInfo[]
  category: string
  keywords: string[]
  url: string
}

const ROOT = path.resolve(process.cwd(), '..') // ui-library root
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components')
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'search-index.json')

const project = new Project({
  tsConfigFilePath: path.join(ROOT, 'tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
})

/* ------------------------------------------------------
   SAFE JSDOC EXTRACTION
-------------------------------------------------------*/
function getJsDocTextSafe(node: Node): string {
  const jsDocs = (node as any).getJsDocs?.()
  if (!jsDocs || jsDocs.length === 0) return ''
  return jsDocs
    .map((d: any) => (d.getComment() ? d.getComment().toString() : ''))
    .join('\n')
    .trim()
}

/* ------------------------------------------------------
   EXTRACT DEFAULT VALUES FROM FUNCTION PARAMS
-------------------------------------------------------*/
function extractDefaults(node: Node): Map<string, string> {
  const defaults = new Map<string, string>()

  const params = (node as any).getParameters?.()
  if (!params?.length) return defaults

  const param = params[0]
  const text = param.getText()

  const match = text.match(/\{([\s\S]*?)\}/)
  if (!match) return defaults

  const items = match[1].split(',')
  items.forEach((i: string) => {
    if (i.includes('=')) {
      const [name, def] = i.split('=').map((s) => s.trim())
      defaults.set(name, def.replace(/,$/, ''))
    }
  })

  return defaults
}

/* ------------------------------------------------------
   EXTRACT INTERFACE PROPS
-------------------------------------------------------*/
function extractPropsFromInterface(intf: InterfaceDeclaration): PropInfo[] {
  const members = intf.getMembers()

  return members
    .filter((m) => m.getKind() === SyntaxKind.PropertySignature)
    .map((m) => {
      const prop = m as PropertySignature
      const name = prop.getName()
      const required = !prop.hasQuestionToken()
      const type = cleanType(prop.getType().getText())
      const description = getJsDocTextSafe(prop)

      return {
        name,
        type,
        required,
        description,
      }
    })
}

/* ------------------------------------------------------
   FIND PROPS INTERFACE (ButtonProps)
-------------------------------------------------------*/
function getPropsInterface(typesFile: SourceFile, componentName: string) {
  const expected = `${componentName}Props`

  const intf = typesFile.getInterface(expected)
  return intf ?? null
}

/* ------------------------------------------------------
   GET COMPONENT DESCRIPTION
-------------------------------------------------------*/
function getComponentDescription(source: SourceFile, componentName: string): string {
  const fn = source.getFunction(componentName)
  if (fn) return getJsDocTextSafe(fn)

  const varDecl = source.getVariableDeclaration(componentName)
  if (varDecl) return getJsDocTextSafe(varDecl)

  const cls = source.getClass(componentName)
  if (cls) return getJsDocTextSafe(cls)

  // fallback: file-level JSDoc
  const jsDocs = (source.getStatements() as any[]).flatMap((s) => s.getJsDocs?.() || [])
  if (jsDocs.length) {
    const c = jsDocs[0].getComment()
    return typeof c === 'string' ? c : (c?.toString() ?? '')
  }

  return ''
}

/* ------------------------------------------------------
   MAIN COMPONENT PROCESSOR
-------------------------------------------------------*/
function processComponent(name: string, folderPath: string): SearchItem {
  const tsxPath = path.join(folderPath, `${name}.tsx`)
  const typesPath = path.join(folderPath, `${name}.types.ts`)

  const tsxFile = project.addSourceFileAtPathIfExists(tsxPath)
  const typesFile = project.addSourceFileAtPathIfExists(typesPath)

  const description = tsxFile ? getComponentDescription(tsxFile, name) : ''

  let props: PropInfo[] = []

  if (typesFile) {
    const intf = getPropsInterface(typesFile, name)
    if (intf) {
      props = extractPropsFromInterface(intf)
    }
  }

  // extract default values
  let defaults = new Map<string, string>()

  if (tsxFile) {
    const fn = tsxFile.getFunction(name)
    const varDecl = tsxFile.getVariableDeclaration(name)

    if (fn) defaults = extractDefaults(fn)
    else if (varDecl) defaults = extractDefaults(varDecl.getInitializer()!)
  }

  // assign default values to props
  props = props.map((p) => ({
    ...p,
    defaultValue: defaults.get(p.name),
  }))

  const keywords = [
    name.toLowerCase(),
    ...props.map((p) => p.name.toLowerCase()),
    ...props.flatMap((p) => p.type.split(/\W+/).map((x) => x.toLowerCase())),
  ].filter(Boolean)

  return {
    name,
    description: getDescriptionOrFallback(description, name),
    props,
    category: 'components',
    keywords: cleanKeywords(keywords),
    url: `/${name.toLowerCase()}`,
  }
}

function cleanType(typeText: string): string {
  return typeText
    .replace(/import\([^)]*\)\./g, '') // remove "import(...)." prefix
    .replace(/\| undefined/g, '') // remove "| undefined"
    .replace(/\bundefined\b/g, '') // remove stray undefined
    .replace(/\s+/g, ' ') // collapse spaces
    .trim()
}

function cleanKeywords(list: string[]) {
  const blocked = new Set([
    'src',
    'components',
    'import',
    'users',
    'documents',
    'github',
    'react',
    'tailwind',
  ])

  return list.filter((k) => k && !blocked.has(k))
}

function getDescriptionOrFallback(desc: string, name: string) {
  if (desc && desc.trim().length > 0) return desc.trim()
  return `${name} component`
}

/* ------------------------------------------------------
   MAIN SCRIPT
-------------------------------------------------------*/
function main() {
  const items: SearchItem[] = []

  const folders = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => fs.statSync(path.join(COMPONENTS_DIR, f)).isDirectory())

  folders.forEach((folderName) => {
    const folderPath = path.join(COMPONENTS_DIR, folderName)

    const item = processComponent(folderName, folderPath)
    items.push(item)
  })

  const outDir = path.dirname(OUTPUT_PATH)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2))
  console.log(`✅ Search index generated: ${items.length} components`)
}

main()
