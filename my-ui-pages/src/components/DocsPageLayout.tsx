import React, { type ReactNode, useEffect, useState } from 'react'
import { PropsTable } from './PropsTable'
import { Card, CardContent } from './Card'
import { CodeBlock } from './CodeBlock'

interface ExampleSection {
  title: string
  description?: string
  code: string
  render: ReactNode
}

interface DocsPageLayoutProps {
  /** Name of the component (used to auto-load docs) */
  component: string
  /** Short component description */
  description?: string
  /** Example sections to showcase usage */
  examples?: ExampleSection[]
}

export const docsMap: Record<string, any> = {
  Alert: () => import('../data/components/Alert/Alert.json'),
  Badge: () => import('../data/components/Badge/Badge.json'),
  Banner: () => import('../data/components/Banner/Banner.json'),
  BodyText: () => import('../data/components/BodyText/BodyText.json'),
  Breadcrumb: () => import('../data/components/Breadcrumb/Breadcrumb.json'),
  Button: () => import('../data/components/Button/Button.json'),
  Checkbox: () => import('../data/components/Checkbox/Checkbox.json'),
  CheckboxGroup: () => import('../data/components/CheckboxGroup/CheckboxGroup.json'),
  DetailedInformation: () =>
    import('../data/components/DetailedInformation/DetailedInformation.json'),
  Drawer: () => import('../data/components/Drawer/Drawer.json'),
  Dropdown: () => import('../data/components/Dropdown/Dropdown.json'),
  HeadingText: () => import('../data/components/HeadingText/Title.json'),
  Input: () => import('../data/components/Input/Input.json'),
  Pagination: () => import('../data/components/Pagination/Pagination.json'),
  PasswordInput: () => import('../data/components/PasswordInput/PasswordInput.json'),
  // add more components here
}

export const DocsPageLayout: React.FC<DocsPageLayoutProps> = ({
  component,
  description,
  examples = [],
}) => {
  const [docs, setDocs] = useState<any>(null)

  useEffect(() => {
    if (docsMap[component]) {
      docsMap[component]()
        .then(setDocs)
        .catch(() => setDocs(null))
    }
  }, [component])

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{component}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </header>

      {/* Example sections */}
      {examples.map((example, idx) => (
        <section key={idx} className="space-y-4">
          <h2 className="text-xl font-semibold">{example.title}</h2>
          {example.description && <p className="text-muted-foreground">{example.description}</p>}
          <Card>
            <CardContent className="space-y-2">{example.render}</CardContent>
          </Card>
          <CodeBlock code={example.code.trim()} language="tsx" />
        </section>
      ))}

      {/* Props section */}
      {docs?.props?.length ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable propsData={docs.props} />
        </section>
      ) : null}
    </div>
  )
}
