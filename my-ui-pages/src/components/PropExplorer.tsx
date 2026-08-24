import React, { useEffect, useState, useMemo } from 'react'
import { buildClassName } from '@pk-design/react-tailwind'
import { CodeBlock } from './CodeBlock'

interface PropMeta {
  name: string
  type: string
  raw: string
  enumValues: string[] | null
  required: boolean
  defaultValue: string | null
  description: string
}

/** 'array'  — comma-separated text input that parses to string[].
 *  'hidden' — suppresses the auto-detected control for this prop entirely.
 *  { linkedSelect: 'propName' } — dropdown driven by another prop's string[] value. */
type ControlOverride = 'array' | 'hidden' | { linkedSelect: string }

export interface PropExplorerProps {
  componentName: string
  /**
   * Render the live preview. Receives current prop values and a setValue
   * setter so controlled components (e.g. RadioSwitch) can feed onChange
   * back into playground state.
   */
  render: (
    props: Record<string, any>,
    setValue: (name: string, value: any) => void,
  ) => React.ReactNode
  initialProps?: Record<string, any>
  /**
   * Override how specific props are controlled.
   * Keys not in the JSON schema are also supported (they just need initialProps values).
   */
  controls?: Record<string, ControlOverride>
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function isControllable(p: PropMeta, customNames: Set<string>): boolean {
  if (customNames.has(p.name)) return false // handled by controls override
  if (['className', 'children', 'as'].includes(p.name)) return false
  if (/class/i.test(p.name)) return false
  if (p.raw.includes('=>') || p.raw.startsWith('(')) return false
  if (p.type === 'enum') return true
  if (p.raw === 'boolean') return true
  if (p.raw === 'string') return true
  if (p.raw === 'number') return true
  return false
}

function parseDefault(p: PropMeta): any {
  const v = p.defaultValue
  if (v === null || v === undefined) {
    if (p.raw === 'boolean') return false
    if (p.raw === 'number') return 0
    return undefined
  }
  try {
    return JSON.parse(v)
  } catch {
    return v
  }
}

function buildCode(
  componentName: string,
  values: Record<string, any>,
  defaults: Record<string, any>,
): string {
  const parts: string[] = []

  for (const [k, v] of Object.entries(values)) {
    if (v === undefined || v === null || v === '') continue
    const def = defaults[k]
    // Skip unchanged values (use JSON for array/object comparison)
    if (JSON.stringify(v) === JSON.stringify(def)) continue

    if (typeof v === 'boolean') {
      parts.push(v ? k : `${k}={false}`)
    } else if (typeof v === 'number') {
      parts.push(`${k}={${v}}`)
    } else if (Array.isArray(v)) {
      const inner = v.map((i) => (typeof i === 'string' ? `'${i}'` : String(i))).join(', ')
      parts.push(`${k}={[${inner}]}`)
    } else {
      parts.push(`${k}="${v}"`)
    }
  }

  const attrs = parts.length ? ' ' + parts.join(' ') : ''
  return `<${componentName}${attrs} />`
}

/* ── Controls ────────────────────────────────────────────────────────── */

const inputCls =
  'w-full text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--ui-primary)]'

function EnumControl({
  meta,
  value,
  onChange,
}: {
  meta: PropMeta
  value: any
  onChange: (v: any) => void
}) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value ? e.target.value : undefined)}
      className={inputCls}
    >
      {!meta.required && <option value="">(default)</option>}
      {meta.enumValues!.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

function BoolControl({
  meta,
  value,
  onChange,
}: {
  meta: PropMeta
  value: any
  onChange: (v: any) => void
}) {
  const id = `ctrl-${meta.name}`
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded accent-[var(--ui-primary)]"
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">{meta.name}</span>
    </label>
  )
}

function StringControl({
  meta,
  value,
  onChange,
}: {
  meta: PropMeta
  value: any
  onChange: (v: any) => void
}) {
  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={meta.name}
      className={inputCls}
    />
  )
}

function NumberControl({
  meta: _meta,
  value,
  onChange,
}: {
  meta: PropMeta
  value: any
  onChange: (v: any) => void
}) {
  return (
    <input
      type="number"
      value={value ?? 0}
      onChange={(e) => onChange(Number(e.target.value))}
      className={inputCls}
    />
  )
}

/** Comma-separated text → string[] */
function ArrayControl({
  name,
  value,
  onChange,
}: {
  name: string
  value: any
  onChange: (v: string[]) => void
}) {
  const toText = (v: any) => (Array.isArray(v) ? v.join(', ') : String(v ?? ''))
  const [text, setText] = useState(toText(value))

  useEffect(() => {
    setText(toText(value))
  }, [JSON.stringify(value)])

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => {
        setText(e.target.value)
        onChange(
          e.target.value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }}
      placeholder={`${name}: Option A, Option B, ...`}
      className={inputCls}
    />
  )
}

/** Dropdown whose options come from another prop's current string[] value */
function LinkedSelectControl({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={inputCls}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

/* ── Label wrapper shared by all controls ───────────────────────────── */

function ControlCell({
  label,
  children,
  wide,
}: {
  label: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div className={buildClassName('space-y-1', wide ? 'col-span-2' : '')}>
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  )
}

/* ── PropExplorer ────────────────────────────────────────────────────── */

const docModules = import.meta.glob('../data/components/**/*.json')

export function PropExplorer({
  componentName,
  render,
  initialProps = {},
  controls = {},
}: PropExplorerProps) {
  const [propsMeta, setPropsMeta] = useState<PropMeta[]>([])
  const [values, setValues] = useState<Record<string, any>>(initialProps)

  const customNames = useMemo(() => new Set(Object.keys(controls)), [controls])

  useEffect(() => {
    const key = Object.keys(docModules).find((k) =>
      k.includes(`/components/${componentName}/${componentName}.json`),
    )
    if (!key) return
    ;(docModules[key] as () => Promise<any>)().then((mod) => {
      const controllable: PropMeta[] = (mod.default.props as PropMeta[]).filter((p) =>
        isControllable(p, customNames),
      )
      setPropsMeta(controllable)

      const defaults: Record<string, any> = {}
      controllable.forEach((p) => {
        defaults[p.name] = parseDefault(p)
      })
      setValues((prev) => ({ ...defaults, ...initialProps, ...prev }))
    })
  }, [componentName])

  const defaults = useMemo(() => {
    const d: Record<string, any> = {}
    propsMeta.forEach((p) => {
      d[p.name] = parseDefault(p)
    })
    return d
  }, [propsMeta])

  const setValue = (name: string, val: any) => setValues((prev) => ({ ...prev, [name]: val }))

  const booleans = propsMeta.filter((p) => p.raw === 'boolean')
  const nonBools = propsMeta.filter((p) => p.raw !== 'boolean')
  const customEntries = Object.entries(controls)
  const hasGrid = nonBools.length > 0 || customEntries.length > 0

  const code = buildCode(componentName, values, defaults)

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Preview */}
      <div className="min-h-32 flex items-center justify-center p-8 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.02)_10px,rgba(0,0,0,0.02)_20px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] bg-white dark:bg-gray-900">
        {render(values, setValue)}
      </div>

      {/* Controls */}
      {(propsMeta.length > 0 || customEntries.length > 0) && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-4 space-y-4">
          {/* Grid: enums, strings, numbers + custom overrides */}
          {hasGrid && (
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {/* Custom controls declared in `controls` */}
              {customEntries.map(([name, ctrl]) => {
                if (ctrl === 'hidden') return null
                if (ctrl === 'array') {
                  return (
                    <ControlCell key={name} label={name} wide>
                      <ArrayControl
                        name={name}
                        value={values[name]}
                        onChange={(v) => setValue(name, v)}
                      />
                    </ControlCell>
                  )
                }
                if (typeof ctrl === 'object' && 'linkedSelect' in ctrl) {
                  const options: string[] = values[ctrl.linkedSelect] ?? []
                  return (
                    <ControlCell key={name} label={name}>
                      <LinkedSelectControl
                        value={values[name] ?? options[0] ?? ''}
                        options={options}
                        onChange={(v) => setValue(name, v)}
                      />
                    </ControlCell>
                  )
                }
                return null
              })}

              {/* Auto-detected non-boolean controls */}
              {nonBools.map((p) => (
                <ControlCell key={p.name} label={p.name}>
                  {p.type === 'enum' ? (
                    <EnumControl
                      meta={p}
                      value={values[p.name]}
                      onChange={(v) => setValue(p.name, v)}
                    />
                  ) : p.raw === 'string' ? (
                    <StringControl
                      meta={p}
                      value={values[p.name]}
                      onChange={(v) => setValue(p.name, v)}
                    />
                  ) : (
                    <NumberControl
                      meta={p}
                      value={values[p.name]}
                      onChange={(v) => setValue(p.name, v)}
                    />
                  )}
                </ControlCell>
              ))}
            </div>
          )}

          {/* Booleans row */}
          {booleans.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {booleans.map((p) => (
                <BoolControl
                  key={p.name}
                  meta={p}
                  value={values[p.name]}
                  onChange={(v) => setValue(p.name, v)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Generated code */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <CodeBlock code={code} language="tsx" className="rounded-none rounded-b-xl" />
      </div>
    </div>
  )
}
