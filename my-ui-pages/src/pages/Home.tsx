import { Button } from '@pk-design/react-tailwind'
import { CodeBlock } from '../components/CodeBlock'
import { Link } from 'react-router'

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-12">
      {/* Header */}
      <header className="space-y-3 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">React Tailwind UI</h1>
        <p className="text-gray-600 text-lg">
          A modern, reusable <strong>React + TailwindCSS</strong> component library — built for
          speed, consistency, and scalability.
        </p>

        <div className="pt-4">
          <Button theme="primary" size="md" as={Link} to="/Button">
            Browse Components →
          </Button>
        </div>
      </header>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🚀 Quick Start</h2>
        <p className="text-gray-600">
          Install the package along with its required peer dependencies:
        </p>

        <CodeBlock
          code={`pnpm add @pk-design/react-tailwind @headlessui/react tailwind-merge`}
          language="bash"
        />
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">⚙️ Setup</h2>
        <p className="text-gray-600">
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

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🧩 Usage</h2>
        <p className="text-gray-600">
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
