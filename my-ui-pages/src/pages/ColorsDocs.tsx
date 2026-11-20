import type { CSSProperties, ReactNode } from 'react'
import {
  Badge,
  Input,
  SelectBox,
  BodyText,
  Breadcrumb,
  HeadingText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@pk-design/react-tailwind'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { CodeBlock } from '../components/CodeBlock'
import tokensCss from '../../../src/styles/tokens.css?raw'
import pkg from '../../../package.json'

// ─── The tokens, read from the library's own stylesheet so this page can't drift from it ───

const withoutComments = tokensCss.replace(/\/\*[\s\S]*?\*\//g, '')
const block = (selector: RegExp) => withoutComments.match(selector)?.[1] ?? ''
const variables = (body: string) =>
  Object.fromEntries(
    [...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
  )
const LIGHT: Record<string, string> = variables(block(/:root\s*\{([^}]*)\}/))
const DARK: Record<string, string> = { ...LIGHT, ...variables(block(/\.dark\s*\{([^}]*)\}/)) }
// Tailwind colour name -> the variable it reads (`--color-surface: var(--ui-bg-surface)`).
const THEME: Record<string, string> = Object.fromEntries(
  [
    ...block(/@theme inline\s*\{([^}]*)\}/).matchAll(/--color-([\w-]+)\s*:\s*var\((--[\w-]+)\)/g),
  ].map(([, name, variable]) => [name, variable]),
)

interface Token {
  name: string
  variable: string
  light: string
  dark: string
}
const token = (name: string): Token | null => {
  const variable = THEME[name]
  return variable ? { name, variable, light: LIGHT[variable], dark: DARK[variable] } : null
}

// Every variable at its light or dark value, to pin a preview to one theme whatever the page's.
const pinned = (values: Record<string, string>) => values as CSSProperties

// ─── What each one is for ───

const BACKGROUNDS: [string, string][] = [
  ['canvas', 'Behind everything: the page itself.'],
  ['surface', 'Cards, tables, page sections and side navigation.'],
  ['surface-raised', 'Layers that float: drawers, dialogs, menus, popovers, and form fields.'],
  [
    'surface-muted',
    'A quiet step from a surface: table headers and footers, striped rows, input add-ons, row hover.',
  ],
  ['surface-sunken', 'Set into a surface: chips, progress tracks, skeletons, disabled controls.'],
]
const FIELDS: [string, string][] = [
  ['field', 'An editable text field, textarea or select.'],
  ['surface-sunken', 'A disabled field, with text-muted: dimmed, still readable.'],
  ['surface-muted', 'A read-only field, with text-fg: a value to read or copy, not to change.'],
]
const TEXT: [string, string][] = [
  ['fg', 'Body text and headings.'],
  ['subtle', 'Secondary text: labels and supporting copy.'],
  ['muted', 'Hints, captions and placeholders.'],
  ['error', 'Error messages beside a field.'],
]
const BORDERS: [string, string][] = [
  ['line', 'Container outlines and dividers.'],
  ['line-muted', 'Quieter dividers inside a container.'],
]
const TONES = ['primary', 'info', 'success', 'warning', 'danger']
const TONE_PARTS: [string, string][] = [
  ['', 'Solid fills: buttons, active indicators, selected dots.'],
  ['-hover', 'A solid fill under the pointer.'],
  ['-disabled', 'A solid fill that can’t be used.'],
  ['-subtle', 'Tinted backgrounds: badges, alerts, banners, selected items.'],
  ['-fg', 'Text and icons in the tone, readable on its tint and on any surface.'],
  ['-ring', 'Focus and selection outlines in the tone.'],
  ['-ring-subtle', 'The faint outline of a tinted badge or alert.'],
]

// ─── Pieces ───

function Swatch({ value, kind }: { value: string; kind: Kind }) {
  if (kind === 'text')
    return (
      <span style={{ color: value }} className="text-base font-semibold">
        Aa
      </span>
    )
  return (
    <span
      className="inline-block size-6 shrink-0 rounded-md"
      style={
        kind === 'border'
          ? { boxShadow: `inset 0 0 0 2px ${value}` }
          : { backgroundColor: value, boxShadow: 'inset 0 0 0 1px rgba(127,127,127,.25)' }
      }
    />
  )
}

type Kind = 'fill' | 'text' | 'border'
interface Row {
  token: Token
  use: string
  prefix: string
  kind: Kind
}

function ValueCell({
  value,
  ground,
  ink,
  kind,
}: {
  value: string
  ground: string
  ink: string
  kind: Kind
}) {
  return (
    <TableCell>
      <span
        className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5"
        style={{ backgroundColor: ground, boxShadow: 'inset 0 0 0 1px rgba(127,127,127,.2)' }}
      >
        <Swatch value={value} kind={kind} />
        <code className="font-mono text-xs" style={{ color: ink }}>
          {value}
        </code>
      </span>
    </TableCell>
  )
}

function TokenTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <Table>
        <TableHead>
          <TableHeaderCell className="whitespace-nowrap">Class</TableHeaderCell>
          <TableHeaderCell className="whitespace-nowrap">Light</TableHeaderCell>
          <TableHeaderCell className="whitespace-nowrap">Dark</TableHeaderCell>
          <TableHeaderCell>Use for</TableHeaderCell>
        </TableHead>
        <TableBody>
          {rows.map(({ token: t, use, prefix, kind }) => (
            <TableRow key={t.name}>
              <TableCell className="align-top">
                <code className="block font-mono text-xs font-semibold whitespace-nowrap text-primary-fg">
                  {prefix}-{t.name}
                </code>
                <code className="block font-mono text-[11px] whitespace-nowrap text-muted">
                  {t.variable}
                </code>
              </TableCell>
              <ValueCell
                value={t.light}
                ground={LIGHT['--ui-bg-surface']}
                ink={LIGHT['--ui-text-subtle']}
                kind={kind}
              />
              <ValueCell
                value={t.dark}
                ground={DARK['--ui-bg-surface']}
                ink={DARK['--ui-text-subtle']}
                kind={kind}
              />
              <TableCell className="min-w-56 text-sm text-subtle">{use}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const described = (pairs: [string, string][], prefix: string, kind: Kind): Row[] =>
  pairs.flatMap(([name, use]) => {
    const t = token(name)
    return t ? [{ token: t, use, prefix, kind }] : []
  })

function Section({
  title,
  intro,
  children,
}: {
  title: string
  intro: ReactNode
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <HeadingText level={2} size="2xl" weight="bold">
          {title}
        </HeadingText>
        <BodyText muted className="max-w-3xl leading-relaxed">
          {intro}
        </BodyText>
      </div>
      {children}
    </section>
  )
}

/** The surfaces stacked as an interface stacks them, pinned to one theme. */
function LayeredPreview({ mode }: { mode: 'light' | 'dark' }) {
  const label = 'font-mono text-[11px] text-muted'
  return (
    <div
      style={pinned(mode === 'light' ? LIGHT : DARK)}
      className="space-y-3 rounded-2xl bg-canvas p-4 text-fg ring-1 ring-line"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-subtle uppercase">{mode}</span>
        <span className={label}>bg-canvas</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line bg-surface-muted px-3 py-2">
          <span className="text-xs font-semibold text-subtle">Table header</span>
          <span className={label}>bg-surface-muted</span>
        </div>
        <div className="space-y-2 px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm">A card or a table row</span>
            <span className={label}>bg-surface</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-surface-sunken px-2 py-0.5 text-xs text-subtle">
              Chip · sunken
            </span>
            <span className="rounded-md bg-info-subtle px-2 py-0.5 text-xs text-info-fg ring-1 ring-info-ring-subtle">
              Info · subtle
            </span>
            <span className="rounded-md bg-warning-subtle px-2 py-0.5 text-xs text-warning-fg ring-1 ring-warning-ring-subtle">
              Warning · subtle
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
      </div>
      <div className="ml-6 space-y-2 rounded-xl border border-line bg-surface-raised p-3 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">A menu or drawer floats above</span>
          <span className={label}>bg-surface-raised</span>
        </div>
        <span className="inline-block rounded-md bg-surface-sunken px-2 py-0.5 text-xs text-subtle">
          A chip still shows inside it
        </span>
      </div>
    </div>
  )
}

/** Input and SelectBox in each state, pinned to one theme. */
function FieldPreview({ mode }: { mode: 'light' | 'dark' }) {
  const options = [{ value: 'in', label: 'Karnataka (29)' }]
  return (
    <div
      style={pinned(mode === 'light' ? LIGHT : DARK)}
      className="space-y-3 rounded-2xl bg-surface p-4 text-fg ring-1 ring-line"
    >
      <span className="text-xs font-semibold tracking-wide text-subtle uppercase">{mode}</span>
      <Input label="Editable" defaultValue="Sharma Traders" size="sm" />
      <Input label="Disabled" defaultValue="20 Nov 2026" disabled size="sm" />
      <Input label="Read-only" defaultValue="INV-0305" readOnly size="sm" />
      <SelectBox
        label="Read-only select"
        options={options}
        selected={options[0]}
        readOnly
        size="sm"
      />
    </div>
  )
}

export default function ColorsDocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="max-w-5xl space-y-12 px-2 py-4 md:px-4 lg:px-8"
    >
      <header className="space-y-4 border-b border-line pb-6">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb
            items={[
              { key: 'docs', text: 'Docs' },
              { key: 'colors', text: 'Colors & tokens' },
            ]}
            render={(item) => (
              <Link to="#" className="text-xs text-muted transition-colors hover:text-primary-fg">
                {item.text}
              </Link>
            )}
          />
          <Badge theme="info" size="sm">
            v{pkg.version}
          </Badge>
        </div>
        <HeadingText.Title>Colors &amp; tokens</HeadingText.Title>
        <BodyText className="max-w-3xl border-l-2 border-primary pl-3 text-base leading-relaxed text-subtle">
          Colours are named by what they’re for, not which shade they are. Each token is a CSS
          variable with a light and a dark value, exposed to Tailwind as a colour, so{' '}
          <code className="font-mono text-sm">bg-surface</code> or{' '}
          <code className="font-mono text-sm">text-muted</code> follows dark mode, and any override,
          without a <code className="font-mono text-sm">dark:</code> variant.
        </BodyText>
      </header>

      <Section
        title="How it works"
        intro={
          <>
            <code className="font-mono text-xs">tokens.css</code> sets every{' '}
            <code className="font-mono text-xs">--ui-*</code> variable on{' '}
            <code className="font-mono text-xs">:root</code> and again under{' '}
            <code className="font-mono text-xs">.dark</code>, then maps each to a Tailwind colour
            with <code className="font-mono text-xs">@theme inline</code>. It comes with{' '}
            <code className="font-mono text-xs">react-tailwind.css</code>, so a Tailwind v4 build
            that imports the stylesheet gets the classes.
          </>
        }
      >
        <CodeBlock
          language="tsx"
          code={`// Instead of a shade and a dark partner chosen per file
<div className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400" />

// name the role, once
<div className="bg-surface border-line text-muted" />`}
        />
      </Section>

      <Section
        title="Surfaces"
        intro="Backgrounds stack: the canvas, surfaces on it, and layers that float above them. In dark mode, elevation shows as lightness, so a raised layer is a step lighter than a card; muted and sunken are solid colours, so each looks the same on whatever it sits on."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <LayeredPreview mode="light" />
          <LayeredPreview mode="dark" />
        </div>
        <TokenTable rows={described(BACKGROUNDS, 'bg', 'fill')} />
      </Section>

      <Section
        title="Fields"
        intro={
          <>
            Input, Textarea and SelectBox take their colours by state. A disabled field is dimmed
            but its value stays readable; a read-only one (
            <code className="font-mono text-xs">readOnly</code>) keeps its value at full strength on
            a muted ground, focusable and selectable, so it reads as a value rather than an input.
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FieldPreview mode="light" />
          <FieldPreview mode="dark" />
        </div>
        <TokenTable rows={described(FIELDS, 'bg', 'fill')} />
      </Section>

      <Section
        title="Text"
        intro={
          <>
            On <code className="font-mono text-xs">BodyText</code>,{' '}
            <code className="font-mono text-xs">TextContent</code> and{' '}
            <code className="font-mono text-xs">HeadingText</code>, colour is a prop (
            <code className="font-mono text-xs">muted</code>,{' '}
            <code className="font-mono text-xs">error</code>…), and body text is their default.
            Elsewhere, use these.
          </>
        }
      >
        <TokenTable rows={described(TEXT, 'text', 'text')} />
      </Section>

      <Section
        title="Borders"
        intro="Structure, not controls: form fields draw their own outlines."
      >
        <TokenTable rows={described(BORDERS, 'border', 'border')} />
      </Section>

      <Section
        title="Tones"
        intro={
          <>
            Each status tone comes as a family. A tinted pill or alert is{' '}
            <code className="font-mono text-xs">bg-*-subtle text-*-fg ring-*-ring-subtle</code>; a
            solid one is <code className="font-mono text-xs">bg-*</code> with white text. Info
            matches primary unless it is overridden.
          </>
        }
      >
        <div className="flex flex-wrap gap-2">
          {TONES.map((tone) => (
            <span
              key={tone}
              className="rounded-md px-2.5 py-1 text-xs font-semibold capitalize"
              style={{
                backgroundColor: `var(${THEME[`${tone}-subtle`]})`,
                color: `var(${THEME[`${tone}-fg`]})`,
                boxShadow: THEME[`${tone}-ring-subtle`]
                  ? `inset 0 0 0 1px var(${THEME[`${tone}-ring-subtle`]})`
                  : undefined,
              }}
            >
              {tone}
            </span>
          ))}
        </div>
        {TONES.map((tone) => (
          <div key={tone} className="space-y-2">
            <HeadingText level={3} size="lg" weight="semibold" className="capitalize">
              {tone}
            </HeadingText>
            <TokenTable
              rows={TONE_PARTS.flatMap(([part, use]): Row[] => {
                const t = token(`${tone}${part}`)
                if (!t) return []
                if (part === '-fg') return [{ token: t, use, prefix: 'text', kind: 'text' }]
                if (part.startsWith('-ring'))
                  return [{ token: t, use, prefix: 'ring', kind: 'border' }]
                return [{ token: t, use, prefix: 'bg', kind: 'fill' }]
              })}
            />
          </div>
        ))}
        <TokenTable
          rows={described(
            [
              ['focus-ring', 'The keyboard focus outline on every control.'],
              ['secondary-ring-subtle', 'The faint outline of a neutral badge.'],
            ],
            'ring',
            'border',
          )}
        />
      </Section>

      <Section
        title="Rebranding"
        intro="Override a variable and every component and class that reads it follows. Set dark values under .dark."
      >
        <CodeBlock
          language="css"
          code={`:root {
  --ui-primary: #7c3aed;
  --ui-primary-hover: #6d28d9;
  --ui-primary-light: #f5f3ff;   /* bg-primary-subtle */
  --ui-primary-text: #5b21b6;    /* text-primary-fg */
  --ui-bg-canvas: #fafaf9;       /* a warmer page */
}
.dark {
  --ui-primary-light: #2e1065;
  --ui-bg-surface: #18181b;
}`}
        />
      </Section>

      <Section title="Guidelines" intro="What keeps an interface consistent in both themes.">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-subtle">
          <li>
            Pick the token for the role, not the colour you want: a table header is{' '}
            <code className="font-mono text-xs">bg-surface-muted</code> even where a lighter grey
            looks nicer in one place.
          </li>
          <li>
            Don’t pair a shade with a <code className="font-mono text-xs">dark:</code> partner. If
            no token fits, that’s a missing role: add it here rather than in one file.
          </li>
          <li>
            Don’t write a token as an arbitrary value:{' '}
            <code className="font-mono text-xs">text-[var(--ui-text)]</code> is{' '}
            <code className="font-mono text-xs">text-fg</code>.
          </li>
          <li>
            Solid tone fills take white text; tints take their{' '}
            <code className="font-mono text-xs">-fg</code> colour.
          </li>
          <li>
            Paper is the exception: a printed document stays white in either theme, so it sets its
            own colours.
          </li>
        </ul>
      </Section>
    </motion.div>
  )
}
