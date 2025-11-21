import React, { type ReactNode, useEffect, useState } from 'react'
import { PropsTable } from './PropsTable'
import { Card, CardContent } from './Card'
import { CodeBlock } from './CodeBlock'
import { BodyText, HeadingText } from '@pk-design/react-tailwind'

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

  // Sort so parent component (Table.json) appears before sub components (TableBody.json)
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

  useEffect(() => {
    loadAllDocs(component)
      .then(setDocsList)
      .catch(() => setDocsList([]))
  }, [component])

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2 px-2 md:px-4 lg:px-8 py-2 z-10">
        <HeadingText.Title>{component}</HeadingText.Title>
        {description && <BodyText className="text-muted-foreground">{description}</BodyText>}
      </header>

      {/* Examples */}
      {examples.map((example, idx) => (
        <section key={idx} className="space-y-4 px-2 md:px-4 lg:px-8 py-2">
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
        <section className="space-y-4 px-2 md:px-4 lg:px-8 py-2">
          <HeadingText.SubTitle2>Best Practices</HeadingText.SubTitle2>
          <Card>
            <CardContent className="space-y-2">{bestPractices}</CardContent>
          </Card>
        </section>
      )}

      {/* PROPS TABLES */}
      {docsList.length > 0 && (
        <section className="space-y-4 px-2 md:px-4 lg:px-8 py-4">
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
  )
}
