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
  /** Name of the component (used to auto-load docs) */
  component: string
  /** Short component description */
  description?: string
  /** Example sections to showcase usage */
  examples?: ExampleSection[]

  bestPractices?: ReactNode
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
  Dialog: () => import('../data/components/Dialog/Dialog.json'),
  Drawer: () => import('../data/components/Drawer/Drawer.json'),
  Dropdown: () => import('../data/components/Dropdown/Dropdown.json'),
  HeadingText: () => import('../data/components/HeadingText/Title.json'),
  Input: () => import('../data/components/Input/Input.json'),
  Pagination: () => import('../data/components/Pagination/Pagination.json'),
  PasswordInput: () => import('../data/components/PasswordInput/PasswordInput.json'),
  RadioButton: () => import('../data/components/RadioButton/RadioButton.json'),
  RadioButtonGroup: () => import('../data/components/RadioButtonGroup/RadioButtonGroup.json'),
  RadioSwitch: () => import('../data/components/RadioSwitch/RadioSwitch.json'),
  RangeInput: () => import('../data/components/RangeInput/RangeInput.json'),
  RangeSlider: () => import('../data/components/RangeSlider/RangeSlider.json'),
  SelectBox: () => import('../data/components/SelectBox/SelectBox.json'),
  Tabs: () => import('../data/components/Tabs/Tabs.json'),
  Textarea: () => import('../data/components/Textarea/Textarea.json'),
  TextContent: () => import('../data/components/TextContent/TextContent.json'),
  Toast: () => import('../data/components/Toast/Toast.json'),
  // add more components here
}

export const DocsPageLayout: React.FC<DocsPageLayoutProps> = ({
  component,
  description,
  examples = [],
  bestPractices = null,
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
      <header className="space-y-2 px-2 md:px-4 lg:px-8 py-2 z-10">
        <HeadingText.Title>{component}</HeadingText.Title>
        {description && <BodyText className="text-muted-foreground">{description}</BodyText>}
      </header>

      {/* Example sections */}
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

      {bestPractices && (
        <section className="space-y-4 px-2 md:px-4 lg:px-8 py-2">
          <HeadingText.SubTitle2>Best Practices</HeadingText.SubTitle2>
          <Card>
            <CardContent className="space-y-2">{bestPractices}</CardContent>
          </Card>
        </section>
      )}

      {/* Props section */}
      {docs?.props?.length ? (
        <section className="space-y-4 px-2 md:px-4 lg:px-8 py-2">
          <HeadingText.SubTitle2>Props</HeadingText.SubTitle2>
          <PropsTable propsData={docs.props} />
        </section>
      ) : null}
    </div>
  )
}
