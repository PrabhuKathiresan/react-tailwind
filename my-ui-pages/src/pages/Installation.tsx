import { HeadingText } from '@pk-design/react-tailwind'
import { CodeBlock } from '../components/CodeBlock'
import { LogoText } from '../components/LogoText'

export default function InstallationPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <header className="space-y-3 text-center">
        <HeadingText.Title>
          <LogoText />
        </HeadingText.Title>
        <p className="text-gray-600 text-lg dark:text-gray-300">
          A modern, reusable <LogoText /> component library — built for speed, consistency, and
          scalability.
        </p>
      </header>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          📦 Prerequisites
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Before installing, ensure your project is already configured with:
        </p>

        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
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
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">🚀 Quick Start</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Install the library along with its required peer dependencies:
        </p>

        <CodeBlock
          code={`pnpm add @pk-design/react-tailwind @headlessui/react tailwind-merge`}
          language="bash"
        />
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚙️ Setup</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add the following imports to your global Tailwind entry (e.g.
          <code>tailwind.css</code>):
        </p>

        <CodeBlock
          code={`@import "tailwindcss";
@import "@pk-design/react-tailwind/react-tailwind.css";
@source "./node_modules/@pk-design/react-tailwind/dist";`}
          language="css"
        />
      </section>

      {/* Dependency Insights */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          🔍 Dependency Insights
        </h2>

        <p className="text-gray-700 dark:text-gray-300">Here’s why these packages are required:</p>

        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li>
            <code>@headlessui/react</code> – used for accessible primitives like Dialog, Menu,
            Listbox, etc.
          </li>
          <li>
            <code>tailwind-merge</code> – smart merging of Tailwind class names to avoid conflicts.
          </li>
          <li>
            <code>react-window</code> (optional) – only required for high-performance virtualization
            in <strong>VirtualizedDataTable</strong>.
          </li>
          <li>
            <code>react</code> + <code>react-dom</code> – core React libraries (peer dependencies).
          </li>
        </ul>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">🧩 Usage</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Once setup is complete, import and use components in your app:
        </p>

        <CodeBlock
          code={`import { Button } from "@pk-design/react-tailwind";

export default function Example() {
  return <Button theme="primary">Click Me</Button>;
}`}
          language="tsx"
        />
      </section>
    </div>
  )
}
