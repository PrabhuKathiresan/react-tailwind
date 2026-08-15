import { useState } from 'react'
import {
  Breadcrumb,
  HeadingText,
  BodyText,
  RadioSwitch,
  Badge,
  Tabs,
} from '@pk-design/react-tailwind'
import { Link } from 'react-router'
import { CodeBlock } from '../components/CodeBlock'
import { motion } from 'framer-motion'

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const installCommands: Record<PackageManager, string> = {
  pnpm: 'pnpm add @pk-design/react-tailwind @headlessui/react tailwind-merge',
  npm: 'npm install @pk-design/react-tailwind @headlessui/react tailwind-merge',
  yarn: 'yarn add @pk-design/react-tailwind @headlessui/react tailwind-merge',
  bun: 'bun add @pk-design/react-tailwind @headlessui/react tailwind-merge',
}

const optionalInstallCommands: Record<PackageManager, string> = {
  pnpm: 'pnpm add react-window @types/react-window',
  npm: 'npm install react-window @types/react-window',
  yarn: 'yarn add react-window @types/react-window',
  bun: 'bun add react-window @types/react-window',
}

const cssTokens = [
  {
    token: '--ui-primary',
    defaultVal: '#3b82f6',
    usage: 'Primary action buttons, active tab indicators, focus rings',
  },
  {
    token: '--ui-primary-hover',
    defaultVal: '#2563eb',
    usage: 'Hover state for primary buttons and interactive elements',
  },
  {
    token: '--ui-success',
    defaultVal: '#10b981',
    usage: 'Success toasts, badges, and positive alerts',
  },
  {
    token: '--ui-danger',
    defaultVal: '#ef4444',
    usage: 'Error messages, danger buttons, and critical alerts',
  },
  {
    token: '--ui-warning',
    defaultVal: '#f59e0b',
    usage: 'Warning banners, caution pills, and attention toasts',
  },
  {
    token: '--ui-info',
    defaultVal: '#3b82f6',
    usage: 'Informational toasts, banners, and help tooltips',
  },
  {
    token: '--ui-text',
    defaultVal: '#111827 / #f3f4f6',
    usage: 'Base typography color across BodyText, HeadingText, and TextContent',
  },
  {
    token: '--ui-border',
    defaultVal: '#e5e7eb / #374151',
    usage: 'Structural card outlines, table dividers, and panel borders',
  },
]

export default function InstallationPage() {
  const [pkgManager, setPkgManager] = useState<PackageManager>('pnpm')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-12 px-2 md:px-4 lg:px-8 py-4 max-w-5xl"
    >
      {/* Header */}
      <header className="space-y-3 border-b border-gray-200 dark:border-gray-800 pb-6">
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
        <div className="flex items-center gap-3">
          <HeadingText.Title>Installation &amp; Setup</HeadingText.Title>
          <Badge theme="info" size="sm">
            Tailwind v4 ready
          </Badge>
        </div>
        <BodyText size="lg" muted className="max-w-3xl">
          Complete guide for integrating{' '}
          <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            @pk-design/react-tailwind
          </code>{' '}
          into your React project. Built for speed, accessibility, and effortless Tailwind CSS v4
          customization.
        </BodyText>
      </header>

      {/* Prerequisites */}
      <section className="bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-6 space-y-4">
        <HeadingText level={3} size="xl" weight="semibold">
          Prerequisites
        </HeadingText>
        <BodyText muted>
          Make sure your development environment meets the following requirements:
        </BodyText>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 p-4 rounded-xl space-y-1">
            <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="text-blue-500">⚡</span> Tailwind CSS v4+
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Required for CSS utility compilation and{' '}
              <code className="text-[11px] bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">
                @source
              </code>{' '}
              scanning.
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 p-4 rounded-xl space-y-1">
            <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="text-emerald-500">⚛️</span> React 18+ / 19
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Compatible with React 18 &amp; React 19 concurrent features.
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 p-4 rounded-xl space-y-1">
            <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="text-purple-500">📘</span> TypeScript (Optional)
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Shipped with built-in TypeScript declarations and strict props interfaces.
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Onboarding */}
      <section className="space-y-8">
        <HeadingText level={2} size="2xl" weight="bold">
          Step-by-Step Onboarding
        </HeadingText>

        {/* Step 1 */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 bg-white dark:bg-gray-900 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              1
            </div>
            <HeadingText level={3} size="lg" weight="semibold">
              Install Packages
            </HeadingText>
          </div>

          <BodyText muted>
            Choose your preferred package manager to install the component library and required peer
            dependencies:
          </BodyText>

          {/* Package Manager Selector */}
          <div className="pt-1">
            <RadioSwitch
              items={[
                { label: 'pnpm', value: 'pnpm' },
                { label: 'npm', value: 'npm' },
                { label: 'yarn', value: 'yarn' },
                { label: 'bun', value: 'bun' },
              ]}
              selected={pkgManager}
              onChange={(v) => setPkgManager(v as PackageManager)}
              size="sm"
            />
          </div>

          <CodeBlock code={installCommands[pkgManager]} language="bash" />

          {/* Optional react-window callout inside Step 1 */}
          <div className="mt-4 p-4 border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-xs text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <span>📦</span> Optional Dependency:{' '}
                <code className="font-mono bg-purple-100 dark:bg-purple-900/60 px-1 py-0.5 rounded">
                  react-window
                </code>
              </div>
              <Badge theme="secondary" size="sm">
                Only for VirtualizedDataTable
              </Badge>
            </div>
            <p className="text-xs text-purple-800 dark:text-purple-300">
              If you plan to use{' '}
              <Link
                to="/virtualized-data-table"
                className="underline font-semibold hover:text-purple-900 dark:hover:text-purple-100"
              >
                VirtualizedDataTable
              </Link>{' '}
              to render massive 10,000+ row datasets, install{' '}
              <code className="font-mono bg-purple-100 dark:bg-purple-900/60 px-1 py-0.5 rounded">
                react-window
              </code>{' '}
              as well:
            </p>
            <CodeBlock code={optionalInstallCommands[pkgManager]} language="bash" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 bg-white dark:bg-gray-900 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              2
            </div>
            <HeadingText level={3} size="lg" weight="semibold">
              Configure Tailwind CSS v4 Entry
            </HeadingText>
          </div>

          <BodyText muted>
            Add the component library stylesheet and configure the Tailwind v4{' '}
            <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
              @source
            </code>{' '}
            directive inside your global CSS file (e.g.{' '}
            <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
              src/index.css
            </code>{' '}
            or{' '}
            <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
              src/globals.css
            </code>
            ):
          </BodyText>

          <CodeBlock
            code={`@import "tailwindcss";
@import "@pk-design/react-tailwind/react-tailwind.css";
@source "./node_modules/@pk-design/react-tailwind/dist";`}
            language="css"
          />

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 p-4 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span>💡</span> Why is @source required?
            </div>
            <div>
              Components are shipped as pre-compiled React JSX containing Tailwind utility class
              strings. The{' '}
              <code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 rounded">
                @source
              </code>{' '}
              directive instructs your project's Tailwind compiler to scan the package files so all
              component utility classes are compiled cleanly into your app bundle.
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 bg-white dark:bg-gray-900 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              3
            </div>
            <HeadingText level={3} size="lg" weight="semibold">
              Wrap App with ToastProvider
            </HeadingText>
          </div>

          <BodyText muted>
            Wrap your application root inside{' '}
            <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
              &lt;ToastProvider&gt;
            </code>{' '}
            to enable global imperative toast notifications:
          </BodyText>

          <CodeBlock
            code={`// src/main.tsx or src/App.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { ToastProvider } from "@pk-design/react-tailwind"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider placement="top-right" maxToasts={5}>
      <App />
    </ToastProvider>
  </React.StrictMode>
)`}
            language="tsx"
          />
        </div>

        {/* Step 4 */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 bg-white dark:bg-gray-900 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              4
            </div>
            <HeadingText level={3} size="lg" weight="semibold">
              Import &amp; Use Components
            </HeadingText>
          </div>

          <BodyText muted>
            You're all set! You can now import any component directly into your React views:
          </BodyText>

          <CodeBlock
            code={`import { Button, HeadingText, BodyText, useToast } from "@pk-design/react-tailwind"

export default function Dashboard() {
  const { toast } = useToast()

  return (
    <div className="p-8 space-y-4">
      <HeadingText level={1} size="3xl">Welcome Back</HeadingText>
      <BodyText muted>Your workspace is updated and ready.</BodyText>
      
      <Button
        theme="primary"
        onClick={() => toast.success("Project exported successfully!")}
      >
        Export Project
      </Button>
    </div>
  )
}`}
            language="tsx"
          />
        </div>
      </section>

      {/* Framework Guides */}
      <section className="space-y-4">
        <HeadingText level={2} size="2xl" weight="bold">
          Framework Setup Guides
        </HeadingText>
        <BodyText muted>Click your framework tab to view recommended setup instructions:</BodyText>

        <Tabs
          tabs={[
            {
              id: 'vite',
              label: 'Vite React',
              content: (
                <div className="p-4 space-y-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                  <BodyText size="sm" weight="semibold">
                    Vite setup steps:
                  </BodyText>
                  <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>
                      Install <code className="font-mono text-xs">@tailwindcss/vite</code> plugin in{' '}
                      <code className="font-mono text-xs">vite.config.ts</code>.
                    </li>
                    <li>
                      Add <code className="font-mono text-xs">@import "tailwindcss";</code> and{' '}
                      <code className="font-mono text-xs">@source</code> in{' '}
                      <code className="font-mono text-xs">src/index.css</code>.
                    </li>
                    <li>
                      Wrap <code className="font-mono text-xs">App</code> inside{' '}
                      <code className="font-mono text-xs">&lt;ToastProvider&gt;</code> in{' '}
                      <code className="font-mono text-xs">src/main.tsx</code>.
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              id: 'nextjs',
              label: 'Next.js (App Router)',
              content: (
                <div className="p-4 space-y-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                  <BodyText size="sm" weight="semibold">
                    Next.js App Router setup steps:
                  </BodyText>
                  <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>
                      Add <code className="font-mono text-xs">@import "tailwindcss";</code> and{' '}
                      <code className="font-mono text-xs">@source</code> in{' '}
                      <code className="font-mono text-xs">app/globals.css</code>.
                    </li>
                    <li>
                      Create client wrapper component{' '}
                      <code className="font-mono text-xs">components/Providers.tsx</code> with{' '}
                      <code className="font-mono text-xs">"use client"</code> and{' '}
                      <code className="font-mono text-xs">&lt;ToastProvider&gt;</code>.
                    </li>
                    <li>
                      Wrap <code className="font-mono text-xs">children</code> in{' '}
                      <code className="font-mono text-xs">app/layout.tsx</code> with{' '}
                      <code className="font-mono text-xs">&lt;Providers&gt;</code>.
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              id: 'remix',
              label: 'Remix / React Router v7',
              content: (
                <div className="p-4 space-y-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                  <BodyText size="sm" weight="semibold">
                    React Router v7 setup steps:
                  </BodyText>
                  <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>
                      Add imports to <code className="font-mono text-xs">app/app.css</code>.
                    </li>
                    <li>
                      Wrap <code className="font-mono text-xs">&lt;Outlet /&gt;</code> inside{' '}
                      <code className="font-mono text-xs">&lt;ToastProvider&gt;</code> in{' '}
                      <code className="font-mono text-xs">app/root.tsx</code>.
                    </li>
                  </ol>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Theming & Tokens Reference */}
      <section className="space-y-6">
        <div className="space-y-2">
          <HeadingText level={2} size="2xl" weight="bold">
            CSS Custom Properties &amp; Tokens
          </HeadingText>
          <BodyText muted>
            Customize component colors, backgrounds, and text shades without rebuilding JavaScript
            bundles. Override any token in your CSS:
          </BodyText>
        </div>

        {/* Tokens Table */}
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-2xl">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3.5">CSS Token</th>
                <th className="p-3.5">Default Color Swatch</th>
                <th className="p-3.5">Usage &amp; Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {cssTokens.map((item) => (
                <tr key={item.token} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                  <td className="p-3.5 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {item.token}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-5 rounded-md border border-black/10 shadow-xs"
                        style={{ backgroundColor: item.defaultVal.split(' / ')[0] }}
                      />
                      <span className="font-mono text-xs">{item.defaultVal}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-xs text-gray-600 dark:text-gray-400">{item.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dependency Insights */}
      <section className="space-y-4 border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
        <HeadingText level={2} size="xl" weight="bold">
          Dependency Insights
        </HeadingText>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-200/80 dark:border-gray-800 p-4 rounded-xl space-y-1">
            <div className="font-mono text-xs font-semibold text-gray-900 dark:text-gray-100">
              @headlessui/react
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Provides ARIA-compliant unstyled primitive engines for Dialog, Menu, Transition, and
              Listbox.
            </div>
          </div>

          <div className="border border-gray-200/80 dark:border-gray-800 p-4 rounded-xl space-y-1">
            <div className="font-mono text-xs font-semibold text-gray-900 dark:text-gray-100">
              tailwind-merge
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Intelligently resolves and merges conflicting Tailwind class overrides in{' '}
              <code className="font-mono text-[11px]">buildClassName</code>.
            </div>
          </div>

          <div className="border border-purple-200/80 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 p-4 rounded-xl space-y-1">
            <div className="font-mono text-xs font-semibold text-purple-900 dark:text-purple-200 flex items-center justify-between">
              <span>react-window</span>
              <Badge theme="secondary" size="sm">
                Optional
              </Badge>
            </div>
            <div className="text-xs text-purple-800 dark:text-purple-300">
              Only required if using{' '}
              <Link to="/virtualized-data-table" className="underline font-medium">
                VirtualizedDataTable
              </Link>{' '}
              for 10,000+ row datasets.
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
