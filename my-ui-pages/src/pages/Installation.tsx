import { Breadcrumb, HeadingText, BodyText } from '@pk-design/react-tailwind'
import { Link } from 'react-router'
import { CodeBlock } from '../components/CodeBlock'
import { motion } from 'framer-motion'

export default function InstallationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-10 px-2 md:px-4 lg:px-8 py-2"
    >
      {/* Header */}
      <header className="space-y-3">
        <Breadcrumb
          items={[
            { key: 'docs', text: 'Docs' },
            { key: 'getting-started', text: 'Getting Started' },
            { key: 'installation', text: 'Installation' },
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
        <HeadingText.Title>Installation</HeadingText.Title>
        <BodyText className="text-muted-foreground">
          A modern, reusable React Tailwind component library — built for speed, consistency, and
          scalability.
        </BodyText>
      </header>

      {/* Prerequisites */}
      <section className="space-y-4">
        <HeadingText.SubTitle2>Prerequisites</HeadingText.SubTitle2>
        <BodyText className="text-gray-600 dark:text-gray-300">
          Before installing, ensure your project is already configured with:
        </BodyText>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-sm">
          <li>
            <strong>Tailwind CSS v4+</strong> — required for utility classes and theming
          </li>
          <li>
            <strong>React 18+</strong> — required by all components
          </li>
          <li>
            <strong>TypeScript (optional)</strong> — recommended for full type safety
          </li>
        </ul>
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <HeadingText.SubTitle2>Quick Start</HeadingText.SubTitle2>
        <BodyText className="text-gray-600 dark:text-gray-300">
          Install the library along with its required peer dependencies:
        </BodyText>
        <CodeBlock
          code="pnpm add @pk-design/react-tailwind @headlessui/react tailwind-merge"
          language="bash"
        />
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <HeadingText.SubTitle2>Setup</HeadingText.SubTitle2>
        <BodyText className="text-gray-600 dark:text-gray-300">
          Add the following imports to your global Tailwind entry (e.g.{' '}
          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
            tailwind.css
          </code>
          ):
        </BodyText>
        <CodeBlock
          code={`@import "tailwindcss";
@import "@pk-design/react-tailwind/react-tailwind.css";
@source "./node_modules/@pk-design/react-tailwind/dist";`}
          language="css"
        />
      </section>

      {/* Dependency Insights */}
      <section className="space-y-4">
        <HeadingText.SubTitle2>Dependency Insights</HeadingText.SubTitle2>
        <BodyText className="text-gray-700 dark:text-gray-300">
          Here's why these packages are required:
        </BodyText>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 text-sm">
          <li>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              @headlessui/react
            </code>{' '}
            — accessible primitives for Dialog, Menu, Listbox, and more
          </li>
          <li>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              tailwind-merge
            </code>{' '}
            — smart merging of Tailwind class names to avoid conflicts
          </li>
          <li>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              react-window
            </code>{' '}
            (optional) — only required for{' '}
            <Link
              to="/virtualized-data-table"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              VirtualizedDataTable
            </Link>
          </li>
          <li>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">react</code>{' '}
            +{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              react-dom
            </code>{' '}
            — core React libraries (peer dependencies)
          </li>
        </ul>
      </section>

      {/* Usage */}
      <section className="space-y-4 pb-4">
        <HeadingText.SubTitle2>Usage</HeadingText.SubTitle2>
        <BodyText className="text-gray-600 dark:text-gray-300">
          Once setup is complete, import and use components directly:
        </BodyText>
        <CodeBlock
          code={`import { Button } from "@pk-design/react-tailwind"

export default function Example() {
  return <Button theme="primary">Click Me</Button>
}`}
          language="tsx"
        />
      </section>
    </motion.div>
  )
}
