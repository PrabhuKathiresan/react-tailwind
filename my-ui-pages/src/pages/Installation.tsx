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

      {/* Theming */}
      <section className="space-y-4">
        <HeadingText.SubTitle2>Theming</HeadingText.SubTitle2>
        <BodyText className="text-gray-600 dark:text-gray-300">
          Components are shipped as plain Tailwind utility class strings — your app's own Tailwind
          build compiles them (that's what the <code>@source</code> line in Setup is for). That
          means there's no separate "theme prop" or build step to swap colors; you customize
          everything from your own global CSS.
        </BodyText>

        <BodyText strong className="text-gray-800 dark:text-gray-100">
          Semantic colors (primary, danger, success, warning)
        </BodyText>
        <BodyText className="text-gray-600 dark:text-gray-300">
          These are driven by CSS custom properties defined in{' '}
          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
            tokens.css
          </code>
          . Override any of them in your own stylesheet to rebrand the library — no rebuild
          required:
        </BodyText>
        <CodeBlock
          code={`:root {
  --ui-primary: #7c3aed;
  --ui-primary-hover: #6d28d9;
  --ui-primary-ring: #7c3aed;
  --ui-primary-light: #f5f3ff;
  --ui-primary-text: #5b21b6;
  --ui-primary-disabled: #c4b5fd;
}`}
          language="css"
        />

        <BodyText strong className="text-gray-800 dark:text-gray-100">
          Text color (BodyText, TextContent, HeadingText)
        </BodyText>
        <BodyText className="text-gray-600 dark:text-gray-300">
          Rather than pairing a light and a dark class on every element (
          <code>text-gray-900 dark:text-gray-100</code>), these three components read a single token
          — <code>--ui-text</code>, <code>--ui-text-muted</code>, or (for <code>BodyText</code>/
          <code>TextContent</code>'s <code>error</code> state) <code>--ui-text-danger</code> — that
          already switches value under <code>.dark</code>, one class for both modes:
        </BodyText>
        <CodeBlock
          code={`:root {
  --ui-text: #111827;
  --ui-text-muted: #6b7280;
  --ui-text-danger: #ef4444;
}
.dark {
  --ui-text: #f3f4f6;
  --ui-text-muted: #9ca3af;
  --ui-text-danger: #f87171;
}`}
          language="css"
        />
        <BodyText className="text-gray-600 dark:text-gray-300">
          This only covers text color on those three components. <code>Label</code> keeps its own
          (intentionally dimmer) shade, and everything else — borders, backgrounds, icon strokes —
          still uses the raw Tailwind <code>gray</code> scale below.
        </BodyText>

        <BodyText strong className="text-gray-800 dark:text-gray-100">
          Neutral palette (gray)
        </BodyText>
        <BodyText className="text-gray-600 dark:text-gray-300">
          Text, borders, and surfaces use Tailwind's built-in{' '}
          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">gray</code>{' '}
          scale directly (e.g. <code>text-gray-900</code>, <code>border-gray-300</code>) rather than
          a custom token. Since your own Tailwind build compiles those classes, you can swap the
          whole library (and any other <code>gray-*</code> usage in your app) to a different neutral
          — like <code>slate</code> — by remapping the theme color once, with Tailwind v4's{' '}
          <code>@theme</code>:
        </BodyText>
        <CodeBlock
          code={`@theme {
  --color-gray-50: var(--color-slate-50);
  --color-gray-100: var(--color-slate-100);
  --color-gray-200: var(--color-slate-200);
  --color-gray-300: var(--color-slate-300);
  --color-gray-400: var(--color-slate-400);
  --color-gray-500: var(--color-slate-500);
  --color-gray-600: var(--color-slate-600);
  --color-gray-700: var(--color-slate-700);
  --color-gray-800: var(--color-slate-800);
  --color-gray-900: var(--color-slate-900);
  --color-gray-950: var(--color-slate-950);
}`}
          language="css"
        />
        <BodyText className="text-gray-600 dark:text-gray-300">
          This is app-wide — it repaints every <code>gray-*</code> class in your project, not just
          this library. If you need the library's borders/backgrounds/icons to differ from your
          app's own grays, that isn't currently supported for those; it would need dedicated CSS
          tokens the way text color already has above.
        </BodyText>
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
