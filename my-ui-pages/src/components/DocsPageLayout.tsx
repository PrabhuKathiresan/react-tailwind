import React, { type ReactNode, useEffect, useState, useMemo } from 'react'
import { PropsTable } from './PropsTable'
import { Card, CardContent } from './Card'
import { CodeBlock } from './CodeBlock'
import { BodyText, buildClassName, HeadingText } from '@pk-design/react-tailwind'

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
  bestPractices?: ReactNode
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
  bestPractices = null,
}) => {
  const [docsList, setDocsList] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string>('overview')

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
      <div className="w-full pr-0 lg:pr-64">
        {' '}
        {/* space for right toc */}
        <div className="space-y-8">
          {/* Overview */}
          <section id="overview">
            <header className="space-y-2 px-2 md:px-4 lg:px-8 py-2 z-10">
              <HeadingText.Title>{component}</HeadingText.Title>
              {description && <BodyText className="text-muted-foreground">{description}</BodyText>}
            </header>
          </section>

          {/* Examples */}
          {examples.map((example, idx) => (
            <section
              id={example.title.replace(/\s+/g, '-').toLowerCase()}
              key={idx}
              className="space-y-4 px-2 md:px-4 lg:px-8 py-2"
            >
              <HeadingText.SubTitle2>{example.title}</HeadingText.SubTitle2>
              {example.description && (
                <BodyText className="text-muted-foreground">{example.description}</BodyText>
              )}
              <Card>
                <CardContent className="space-y-2">{example.render}</CardContent>
              </Card>
              {example.code && <CodeBlock code={example.code.trim()} language="tsx" />}
            </section>
          ))}

          {/* Best Practices */}
          {bestPractices && (
            <section id="best-practices" className="space-y-4 px-2 md:px-4 lg:px-8 py-2">
              <HeadingText.SubTitle2>Best Practices</HeadingText.SubTitle2>
              <Card>
                <CardContent className="space-y-2">{bestPractices}</CardContent>
              </Card>
            </section>
          )}

          {/* Props */}
          {docsList.length > 0 && (
            <section id="props" className="space-y-4 px-2 md:px-4 lg:px-8 py-4">
              <HeadingText.SubTitle2>Props</HeadingText.SubTitle2>

              {docsList.map((doc, index) =>
                doc.props?.length ? (
                  <div key={index} className="space-y-3">
                    <HeadingText.SubTitle3>{doc.name}</HeadingText.SubTitle3>

                    <PropsTable propsData={doc.props} />
                  </div>
                ) : null,
              )}
            </section>
          )}
        </div>
      </div>

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
