import React, { type ReactNode, useEffect, useState, useMemo } from 'react'
import { PropsTable } from './PropsTable'
import { CodeBlock } from './CodeBlock'
import { PropExplorer, type PropExplorerProps } from './PropExplorer'
import { BodyText, Breadcrumb, buildClassName, HeadingText, Tabs } from '@pk-design/react-tailwind'
import { Link } from 'react-router'
import { navSections } from './NavList'
import { motion } from 'framer-motion'
import { Eye, Code2, Hash } from 'lucide-react'

interface ExampleSection {
  title: string
  description?: string
  code?: string
  render: ReactNode
}

interface DocsPageLayoutProps {
  component: string
  description?: string
  examples?: ExampleSection[]
  playground?: Omit<PropExplorerProps, 'componentName'>
  bestPractices?: ReactNode
}

/* ── ExampleBlock — tabbed Preview / Code using library <Tabs> ───── */

function ExampleBlock({ example }: { example: ExampleSection }) {
  const hasCode = Boolean(example.code?.trim())

  if (!hasCode) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-6 bg-white dark:bg-gray-900/30 min-h-24">
        {example.render}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Tabs
        variant="underline"
        listClass="bg-gray-50 dark:bg-gray-800/40 border-b border-gray-200 dark:border-gray-700 px-2"
        panelsClass="!mt-0"
        tabs={[
          {
            label: (
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5" /> Preview
              </span>
            ),
            content: (
              <div className="p-6 bg-white dark:bg-gray-900/30 min-h-24">{example.render}</div>
            ),
            panelClass: '',
          },
          {
            label: (
              <span className="flex items-center gap-1.5">
                <Code2 className="size-3.5" /> Code
              </span>
            ),
            content: (
              <CodeBlock
                code={example.code!.trim()}
                language="tsx"
                className="rounded-none border-0 shadow-none"
              />
            ),
            panelClass: '',
          },
        ]}
      />
    </div>
  )
}

/* ── SectionHeading — with hover anchor link ──────────────────────── */

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 group">
      <HeadingText.SubTitle2>{children}</HeadingText.SubTitle2>
      <a
        href={`#${id}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-600 hover:text-[var(--ui-primary)]"
        aria-label={`Link to ${children}`}
      >
        <Hash className="size-4" />
      </a>
    </div>
  )
}

/**
 * Auto-load ALL JSON docs inside data/components/<ComponentName>/
 */
async function loadAllDocs(component: string) {
  const folder = `../data/components/${component}`

  const modules = import.meta.glob('../data/components/**/**/*.json')

  const matchingFiles = Object.keys(modules).filter((key) => {
    return (
      key.startsWith(folder) && !key.endsWith('index.json') && !key.endsWith('index.types.json')
    )
  })

  const loaded = await Promise.all(
    matchingFiles.map(async (file) => {
      const mod: any = await modules[file]()
      return {
        file,
        data: mod.default,
      }
    }),
  )

  loaded.sort((a, b) => a.file.localeCompare(b.file))

  return loaded.map((l) => l.data)
}

export const DocsPageLayout: React.FC<DocsPageLayoutProps> = ({
  component,
  description,
  examples = [],
  playground,
  bestPractices = null,
}) => {
  const [docsList, setDocsList] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string>('overview')

  const categoryLabel = useMemo(() => {
    for (const section of navSections) {
      if (section.items.some((item) => item.label === component)) return section.title
    }
    return 'Components'
  }, [component])

  useEffect(() => {
    loadAllDocs(component)
      .then(setDocsList)
      .catch(() => setDocsList([]))
  }, [component])

  /* -------------------------------------------------------
   * Build TOC dynamically
   * ------------------------------------------------------- */
  const tocItems = useMemo(() => {
    const list: { id: string; label: string }[] = [{ id: 'overview', label: 'Overview' }]

    if (playground) {
      list.push({ id: 'playground', label: 'Playground' })
    }

    examples.forEach((ex) => {
      list.push({
        id: ex.title.replace(/\s+/g, '-').toLowerCase(),
        label: ex.title,
      })
    })

    if (bestPractices) {
      list.push({ id: 'best-practices', label: 'Best Practices' })
    }

    if (docsList.length) {
      list.push({ id: 'props', label: 'Props' })
    }

    return list
  }, [examples, bestPractices, docsList])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        root: null, // window scrolling
        rootMargin: '0px 0px -70% 0px', // triggers early (makes UX perfect)
        threshold: 0,
      },
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  /* -------------------------------------------------------
   * Smooth Scroll to Section
   * ------------------------------------------------------- */
  const scrollToId = (id: string) => {
    const container = document.getElementById('scrollable-container')
    const el = document.getElementById(id)

    if (container && el) {
      const top = el.offsetTop - 20
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative flex w-full">
      {/* MAIN CONTENT */}
      <motion.div
        key={component}
        className="w-full pr-0 lg:pr-64"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="space-y-8">
          {/* Overview */}
          <section id="overview">
            <header className="space-y-4 px-2 md:px-4 lg:px-8 py-2">
              <Breadcrumb
                items={[
                  { key: 'docs', text: 'Docs' },
                  { key: 'category', text: categoryLabel },
                  { key: 'component', text: component },
                ]}
                render={(item) => (
                  <Link
                    to={item.key === 'docs' ? '/installation' : '#'}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                )}
              />
              <HeadingText.Title>{component}</HeadingText.Title>
              {description && (
                <BodyText className="text-gray-600 dark:text-gray-300 border-l-2 border-[var(--ui-primary)] pl-3">
                  {description}
                </BodyText>
              )}
              <div className="space-y-1 pt-1">
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Import
                </p>
                <CodeBlock
                  code={`import { ${component} } from '@pk-design/react-tailwind'`}
                  language="tsx"
                />
              </div>
            </header>
          </section>

          {/* Playground */}
          {playground && (
            <section id="playground" className="space-y-4 px-2 md:px-4 lg:px-8 py-2">
              <SectionHeading id="playground">Playground</SectionHeading>
              <PropExplorer componentName={component} {...playground} />
            </section>
          )}

          {/* Examples */}
          {examples.map((example, idx) => {
            const id = example.title.replace(/\s+/g, '-').toLowerCase()
            return (
              <section key={idx} id={id} className="space-y-3 px-2 md:px-4 lg:px-8 py-2">
                <SectionHeading id={id}>{example.title}</SectionHeading>
                {example.description && (
                  <BodyText className="text-gray-500 dark:text-gray-400">
                    {example.description}
                  </BodyText>
                )}
                <ExampleBlock example={example} />
              </section>
            )
          })}

          {/* Best Practices */}
          {bestPractices && (
            <section id="best-practices" className="space-y-3 px-2 md:px-4 lg:px-8 py-2">
              <SectionHeading id="best-practices">Best Practices</SectionHeading>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900/30 space-y-2">
                {bestPractices}
              </div>
            </section>
          )}

          {/* Props */}
          {docsList.length > 0 && (
            <section id="props" className="space-y-4 px-2 md:px-4 lg:px-8 py-4">
              <SectionHeading id="props">Props</SectionHeading>
              {docsList.map((doc, index) =>
                doc.props?.length ? (
                  <div key={index} className="space-y-3">
                    {docsList.length > 1 && (
                      <HeadingText.SubTitle3>{doc.name}</HeadingText.SubTitle3>
                    )}
                    <PropsTable propsData={doc.props} />
                  </div>
                ) : null,
              )}
            </section>
          )}
        </div>
      </motion.div>

      {/* RIGHT SIDE TOC — STICKY */}
      <aside
        className={buildClassName(
          'hidden lg:block',
          'fixed right-0 top-[60px]',
          'w-64 h-[calc(100vh-60px)]',
          'overflow-y-auto',
          'px-4 py-6',
        )}
      >
        <nav className="space-y-4">
          <HeadingText.SubTitle3>On this page</HeadingText.SubTitle3>
          <ul className="space-y-2 text-sm">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className={buildClassName(
                    'text-left block w-full text-sm cursor-pointer transition-colors',
                    activeId === item.id
                      ? 'text-primary font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary',
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
