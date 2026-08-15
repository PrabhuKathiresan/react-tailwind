import React, { type ReactNode, useEffect, useState, useMemo } from 'react'
import { PropsTable } from './PropsTable'
import { CodeBlock } from './CodeBlock'
import { PropExplorer, type PropExplorerProps } from './PropExplorer'
import { BodyText, Breadcrumb, buildClassName, HeadingText, Badge } from '@pk-design/react-tailwind'
import { Link } from 'react-router'
import { navSections, pageRoutes } from './NavList'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Hash,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Search,
  ArrowUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

import pkg from '../../../package.json'

export interface ExampleSection {
  title: string
  description?: string
  code?: string
  render: ReactNode
  /** Library version this example's feature was introduced in, e.g. "2.0.0". */
  since?: string
}

interface DocsPageLayoutProps {
  component: string
  description?: string
  examples?: ExampleSection[]
  playground?: Omit<PropExplorerProps, 'componentName'>
  bestPractices?: ReactNode
}

function ExampleBlock({ example }: { example: ExampleSection }) {
  const hasCode = Boolean(example.code?.trim())
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (example.code) {
      navigator.clipboard.writeText(example.code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!hasCode) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700/80 overflow-hidden p-6 bg-white dark:bg-gray-900/30 min-h-24 shadow-xs">
        {example.render}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700/80 overflow-hidden shadow-xs bg-white dark:bg-gray-900/30">
      {/* Live Preview Container */}
      <div className="p-6 bg-white dark:bg-gray-900/30 min-h-24 overflow-x-auto">
        {example.render}
      </div>

      {/* Code Toolbar */}
      <div className="bg-gray-50/80 dark:bg-gray-800/40 border-t border-gray-200 dark:border-gray-700/80 px-4 py-2 flex items-center justify-between text-xs font-medium">
        <button
          onClick={() => setShowCode(!showCode)}
          className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer font-semibold"
        >
          <Code2 className="size-3.5 text-blue-600 dark:text-blue-400" />
          <span>{showCode ? 'Hide Code' : 'View Code'}</span>
          {showCode ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-md shadow-2xs transition-all cursor-pointer"
          title="Copy TSX Code"
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3 text-gray-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Expandable TSX Code Snippet */}
      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <CodeBlock
            code={example.code!.trim()}
            language="tsx"
            className="rounded-none border-0 shadow-none text-xs"
          />
        </motion.div>
      )}
    </div>
  )
}

function SectionHeading({
  id,
  since,
  children,
}: {
  id: string
  since?: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-2.5 group">
      <HeadingText.SubTitle2>{children}</HeadingText.SubTitle2>
      {since && (
        <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="size-3" /> New in v{since}
        </span>
      )}
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
  const [copiedImport, setCopiedImport] = useState(false)
  const [propQuery, setPropQuery] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const importCode = `import { ${component} } from '@pk-design/react-tailwind'`

  const handleCopyImport = () => {
    navigator.clipboard.writeText(importCode)
    setCopiedImport(true)
    setTimeout(() => setCopiedImport(false), 2000)
  }

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
        root: null,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0,
      },
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop - 20
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { prevPage, nextPage } = useMemo(() => {
    const idx = pageRoutes.findIndex((r) => r.label === component)
    return {
      prevPage: idx > 0 ? pageRoutes[idx - 1] : null,
      nextPage: idx >= 0 && idx < pageRoutes.length - 1 ? pageRoutes[idx + 1] : null,
    }
  }, [component])

  const filteredDocsList = useMemo(() => {
    if (!propQuery.trim()) return docsList

    const query = propQuery.toLowerCase()
    return docsList.map((doc) => ({
      ...doc,
      props: doc.props?.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(query) ||
          p.type?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      ),
    }))
  }, [docsList, propQuery])

  return (
    <div className="flex w-full items-start gap-8 px-2 md:px-4 lg:px-8 relative">
      {/* MAIN CONTENT */}
      <motion.div
        key={component}
        className="flex-1 min-w-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="space-y-8">
          {/* Header Hero Section */}
          <section id="overview">
            <header className="space-y-4 py-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Breadcrumb
                  items={[
                    { key: 'docs', text: 'Docs' },
                    { key: 'category', text: categoryLabel },
                    { key: 'component', text: component },
                  ]}
                  render={(item) => (
                    <Link
                      to={item.key === 'docs' ? '/installation' : '#'}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.text}
                    </Link>
                  )}
                />
                <div className="flex items-center gap-2">
                  <Badge theme="info" size="sm">
                    v{pkg.version}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HeadingText.Title>{component}</HeadingText.Title>
              </div>

              {description && (
                <BodyText className="text-gray-600 dark:text-gray-300 border-l-2 border-[var(--ui-primary)] pl-3 text-base leading-relaxed">
                  {description}
                </BodyText>
              )}

              {/* Import Code Box with 1-Click Copy */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <span>Import Statement</span>
                  <button
                    onClick={handleCopyImport}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {copiedImport ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">
                          Copied to clipboard
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Import</span>
                      </>
                    )}
                  </button>
                </div>
                <CodeBlock code={importCode} language="tsx" />
              </div>

              {/* Quick Jump Anchor Bar */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-xs text-gray-400 font-medium mr-1">Quick Jump:</span>
                {playground && (
                  <button
                    onClick={() => scrollToId('playground')}
                    className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Playground
                  </button>
                )}
                {examples.length > 0 && (
                  <button
                    onClick={() => scrollToId(examples[0].title.replace(/\s+/g, '-').toLowerCase())}
                    className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Examples ({examples.length})
                  </button>
                )}
                {docsList.length > 0 && (
                  <button
                    onClick={() => scrollToId('props')}
                    className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Props Reference
                  </button>
                )}
                {bestPractices && (
                  <button
                    onClick={() => scrollToId('best-practices')}
                    className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Best Practices
                  </button>
                )}
              </div>
            </header>
          </section>

          {/* Playground */}
          {playground && (
            <section id="playground" className="space-y-4 py-2">
              <SectionHeading id="playground">Playground</SectionHeading>
              <PropExplorer componentName={component} {...playground} />
            </section>
          )}

          {/* Examples */}
          {examples.map((example, idx) => {
            const id = example.title.replace(/\s+/g, '-').toLowerCase()
            return (
              <section key={idx} id={id} className="space-y-3 py-2">
                <SectionHeading id={id} since={example.since}>
                  {example.title}
                </SectionHeading>
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
            <section id="best-practices" className="space-y-3 py-2">
              <SectionHeading id="best-practices">Best Practices</SectionHeading>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900/30 space-y-2 shadow-xs">
                {bestPractices}
              </div>
            </section>
          )}

          {/* Props Section with Search Input */}
          {docsList.length > 0 && (
            <section id="props" className="space-y-4 py-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <SectionHeading id="props">Props Reference</SectionHeading>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={propQuery}
                    onChange={(e) => setPropQuery(e.target.value)}
                    placeholder="Search props..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {filteredDocsList.map((doc, index) =>
                doc.props?.length ? (
                  <div key={index} className="space-y-3">
                    {filteredDocsList.length > 1 && (
                      <HeadingText.SubTitle3>{doc.name}</HeadingText.SubTitle3>
                    )}
                    <PropsTable propsData={doc.props} />
                  </div>
                ) : (
                  propQuery && (
                    <div
                      key={index}
                      className="p-6 text-center text-xs text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-800"
                    >
                      No props matching "{propQuery}"
                    </div>
                  )
                ),
              )}
            </section>
          )}
        </div>

        {/* PAGE NAVIGATION FOOTER */}
        {(prevPage || nextPage) && (
          <nav
            aria-label="Page navigation"
            className="mt-10 pt-6 pb-8 border-t border-gray-200 dark:border-gray-800 w-full"
          >
            <div className="flex items-center justify-between gap-4 w-full">
              {prevPage ? (
                <Link
                  to={prevPage.path}
                  className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500/60 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all cursor-pointer text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <ChevronLeft className="size-3.5 text-gray-400 group-hover:text-blue-600 shrink-0" />
                  <span>
                    Previous:{' '}
                    <strong className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
                      {prevPage.label}
                    </strong>
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPage && (
                <Link
                  to={nextPage.path}
                  className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500/60 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all cursor-pointer text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span>
                    Next:{' '}
                    <strong className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
                      {nextPage.label}
                    </strong>
                  </span>
                  <ChevronRight className="size-3.5 text-gray-400 group-hover:text-blue-600 shrink-0" />
                </Link>
              )}
            </div>
          </nav>
        )}
      </motion.div>

      {/* RIGHT TOC SIDEBAR */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-[80px] space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto py-2">
        <HeadingText.SubTitle3>On this page</HeadingText.SubTitle3>
        <ul className="space-y-1 text-sm border-l border-gray-200 dark:border-gray-800 pl-3 relative">
          {tocItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className={buildClassName(
                    'text-left block w-full text-sm cursor-pointer transition-colors py-1 pl-2.5 -ml-3.5 border-l-2',
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-semibold border-blue-600 dark:border-blue-400 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent',
                  )}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      {/* FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
