import { useState } from 'react'
import {
  Breadcrumb,
  HeadingText,
  BodyText,
  Badge,
  Input,
  useDebounce,
  useIsMobile,
  useIsTablet,
  useIsTabletOrMobile,
} from '@pk-design/react-tailwind'
import { Link } from 'react-router'
import { CodeBlock } from '../components/CodeBlock'
import { motion } from 'framer-motion'

import pkg from '../../../package.json'

export default function HooksDocsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isTabletOrMobile = useIsTabletOrMobile()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-12 px-2 md:px-4 lg:px-8 py-4 max-w-5xl"
    >
      {/* Header */}
      <header className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb
            items={[
              { key: 'docs', text: 'Docs' },
              { key: 'hooks', text: 'Custom Hooks' },
            ]}
            render={(item) => (
              <Link
                to="#"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.text}
              </Link>
            )}
          />
          <Badge theme="info" size="sm">
            v{pkg.version}
          </Badge>
        </div>

        <HeadingText.Title>Custom React Hooks</HeadingText.Title>

        <BodyText className="text-gray-600 dark:text-gray-300 border-l-2 border-[var(--ui-primary)] pl-3 text-base leading-relaxed">
          Standalone custom React hooks exported from{' '}
          <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            @pk-design/react-tailwind
          </code>{' '}
          for responsive breakpoint media queries and state debouncing.
        </BodyText>
      </header>

      {/* 1. useDebounce */}
      <section className="space-y-6 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-xs">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800/80 pb-4">
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <HeadingText
                level={2}
                size="2xl"
                weight="bold"
                className="text-gray-900 dark:text-gray-100"
              >
                useDebounce
              </HeadingText>
              <code className="text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-md font-semibold">
                useDebounce&lt;T&gt;(value: T, delayMs: number): T
              </code>
            </div>
            <BodyText size="sm" muted className="leading-relaxed">
              Debounces rapid state changes (e.g. search input fields) to delay API calls or
              expensive filtering computations until user typing pauses.
            </BodyText>
          </div>
          <Badge theme="info" size="sm" className="whitespace-nowrap shrink-0 self-start">
            State Debounce
          </Badge>
        </div>

        <CodeBlock
          code={`import { useState } from 'react'
import { useDebounce } from '@pk-design/react-tailwind'

function SearchComponent() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  // Trigger search API effect only when debouncedQuery changes
}`}
          language="tsx"
        />

        {/* Live Playground */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl space-y-3 border border-gray-200/80 dark:border-gray-700">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Live Debounce Test (500ms Delay)
          </div>
          <Input
            label="Type rapidly below"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type search terms..."
            size="sm"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-xs">
              <span className="text-gray-400">Realtime input value: </span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">"{searchTerm}"</span>
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-xs">
              <span className="text-gray-400">Debounced value (500ms): </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                "{debouncedSearch}"
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Responsive Breakpoint Hooks */}
      <section className="space-y-6 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-xs">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800/80 pb-4">
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <HeadingText
                level={2}
                size="2xl"
                weight="bold"
                className="text-gray-900 dark:text-gray-100"
              >
                Responsive Media Breakpoint Hooks
              </HeadingText>
            </div>
            <BodyText size="sm" muted className="leading-relaxed">
              Reactive window width media query hooks that dynamically adapt UI layouts based on
              Tailwind CSS breakpoints (<code className="font-mono text-xs">sm: 640px</code>,{' '}
              <code className="font-mono text-xs">md: 768px</code>,{' '}
              <code className="font-mono text-xs">lg: 1024px</code>).
            </BodyText>
          </div>
          <Badge theme="info" size="sm" className="whitespace-nowrap shrink-0 self-start">
            Media Queries
          </Badge>
        </div>

        <CodeBlock
          code={`import { useIsMobile, useIsTablet, useIsTabletOrMobile } from '@pk-design/react-tailwind'

function ResponsiveLayout() {
  const isMobile = useIsMobile()             // width < 640px (sm)
  const isTablet = useIsTablet()             // width 640px - 1024px
  const isTouchDevice = useIsTabletOrMobile() // width < 1024px (handheld)

  return isMobile ? <MobileDrawer /> : <DesktopSidebar />
}`}
          language="tsx"
        />

        {/* Live Responsive Status Cards */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl space-y-3 border border-gray-200/80 dark:border-gray-700">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Live Viewport Status (Resize your browser window to test)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                useIsMobile()
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Width &lt; 640px</div>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Active State:
                </span>
                <Badge
                  theme={isMobile ? 'success' : 'secondary'}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {String(isMobile)}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                useIsTablet()
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">640px – 1024px</div>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Active State:
                </span>
                <Badge
                  theme={isTablet ? 'success' : 'secondary'}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {String(isTablet)}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                useIsTabletOrMobile()
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Width &lt; 1024px</div>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Active State:
                </span>
                <Badge
                  theme={isTabletOrMobile ? 'success' : 'secondary'}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {String(isTabletOrMobile)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
