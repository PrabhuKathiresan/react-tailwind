import { useState } from 'react'
import {
  Breadcrumb,
  HeadingText,
  BodyText,
  Badge,
  Input,
  buildClassName,
  get,
  isEmpty,
  evaluatePasswordStrength,
} from '@pk-design/react-tailwind'
import { Link } from 'react-router'
import { CodeBlock } from '../components/CodeBlock'
import { motion } from 'framer-motion'

import pkg from '../../../package.json'

export default function UtilitiesDocsPage() {
  // Demo states
  const [baseClass, setBaseClass] = useState('px-4 py-2 bg-blue-600 text-white rounded-lg')
  const [overrideClass, setOverrideClass] = useState('bg-emerald-600 rounded-full')

  const [nestedObjStr, setNestedObjStr] = useState(
    JSON.stringify({ user: { profile: { name: 'Alex', roles: ['admin', 'editor'] } } }, null, 2),
  )
  const [pathStr, setPathStr] = useState('user.profile.name')

  const [testValue, setTestValue] = useState('')
  const [password, setPassword] = useState('SecretP@ss123!')

  let parsedObj: any = {}
  try {
    parsedObj = JSON.parse(nestedObjStr)
  } catch {
    parsedObj = { error: 'Invalid JSON' }
  }

  const pwdResult = evaluatePasswordStrength(password)

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
              { key: 'utils', text: 'Utilities' },
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

        <HeadingText.Title>Standalone Utilities</HeadingText.Title>

        <BodyText className="text-gray-600 dark:text-gray-300 border-l-2 border-[var(--ui-primary)] pl-3 text-base leading-relaxed">
          Core helper functions shipped with{' '}
          <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            @pk-design/react-tailwind
          </code>{' '}
          for class merging, object access, type validation, and security evaluation.
        </BodyText>
      </header>

      {/* 1. buildClassName */}
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
                buildClassName
              </HeadingText>
              <code className="text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-md font-semibold">
                buildClassName(...classes: any[]): string
              </code>
            </div>
            <BodyText size="sm" muted className="leading-relaxed">
              Intelligent Tailwind CSS class merger powered by{' '}
              <code className="font-mono text-xs">tailwind-merge</code>. Resolves style conflicts
              and strips falsy values.
            </BodyText>
          </div>
          <Badge theme="success" size="sm" className="whitespace-nowrap shrink-0 self-start">
            Class Merger
          </Badge>
        </div>

        <CodeBlock
          code={`import { buildClassName } from '@pk-design/react-tailwind'

const className = buildClassName(
  'px-4 py-2 bg-blue-600 text-white rounded-lg',
  isSuccess && 'bg-emerald-600 rounded-full'
)
// Result: 'px-4 py-2 text-white bg-emerald-600 rounded-full'`}
          language="tsx"
        />

        {/* Live Playground */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl space-y-3 border border-gray-200/80 dark:border-gray-700">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Live Preview &amp; Merger Test
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Base Class"
              value={baseClass}
              onChange={(e) => setBaseClass(e.target.value)}
              size="sm"
            />
            <Input
              label="Override Class"
              value={overrideClass}
              onChange={(e) => setOverrideClass(e.target.value)}
              size="sm"
            />
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-900 dark:text-gray-100 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-gray-400">Merged output: </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                "{buildClassName(baseClass, overrideClass)}"
              </span>
            </div>
            <div className={buildClassName(baseClass, overrideClass)}>Styled Element</div>
          </div>
        </div>
      </section>

      {/* 2. get */}
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
                get
              </HeadingText>
              <code className="text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-md font-semibold">
                get(obj: T, path: string, defaultValue?: R): R
              </code>
            </div>
            <BodyText size="sm" muted className="leading-relaxed">
              Safely accesses deeply nested object properties without throwing null-pointer
              exceptions. Supports dot notation and array index brackets (
              <code className="font-mono text-xs">"user.roles[0]"</code>).
            </BodyText>
          </div>
          <Badge theme="success" size="sm" className="whitespace-nowrap shrink-0 self-start">
            Object Accessor
          </Badge>
        </div>

        <CodeBlock
          code={`import { get } from '@pk-design/react-tailwind'

const userName = get(userData, 'user.profile.name', 'Anonymous')
const firstRole = get(userData, 'user.profile.roles[0]', 'guest')`}
          language="tsx"
        />

        {/* Live Playground */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl space-y-3 border border-gray-200/80 dark:border-gray-700">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Live Object Accessor Test
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Target Object (JSON)
              </label>
              <textarea
                value={nestedObjStr}
                onChange={(e) => setNestedObjStr(e.target.value)}
                rows={4}
                className="w-full font-mono text-xs p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none"
              />
            </div>
            <div className="space-y-3">
              <Input
                label="Property Path"
                value={pathStr}
                onChange={(e) => setPathStr(e.target.value)}
                size="sm"
              />
              <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-xs">
                <span className="text-gray-400">Evaluated result: </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {JSON.stringify(get(parsedObj, pathStr, 'Not Found'))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. isEmpty & isArray */}
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
                isEmpty &amp; isArray
              </HeadingText>
            </div>
            <BodyText size="sm" muted className="leading-relaxed">
              Type-safe validation utilities to check if a value is empty (strings, arrays, objects,
              Maps, Sets) or an array type guard.
            </BodyText>
          </div>
          <Badge theme="success" size="sm" className="whitespace-nowrap shrink-0 self-start">
            Validation Helpers
          </Badge>
        </div>

        <CodeBlock
          code={`import { isEmpty, isArray } from '@pk-design/react-tailwind'

isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty(null) // true

if (isArray(data)) {
  data.map(...) // TypeScript knows data is an array
}`}
          language="tsx"
        />

        {/* Live Playground */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl space-y-3 border border-gray-200/80 dark:border-gray-700">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Live Validation Test
          </div>
          <Input
            label="Type anything to test emptiness"
            value={testValue}
            onChange={(e) => setTestValue(e.target.value)}
            placeholder="Leave empty or enter text..."
            size="sm"
          />
          <div className="flex gap-4 font-mono text-xs flex-wrap">
            <div className="p-2.5 px-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              isEmpty("{testValue}") ={' '}
              <span
                className={
                  isEmpty(testValue) ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'
                }
              >
                {String(isEmpty(testValue))}
              </span>
            </div>
            <div className="p-2.5 px-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              isArray(["a", "b"]) = <span className="text-emerald-500 font-bold">true</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. evaluatePasswordStrength */}
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
                evaluatePasswordStrength
              </HeadingText>
              <code className="text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-md font-semibold">
                evaluatePasswordStrength(password: string): &#123; score: number; label: string
                &#125;
              </code>
            </div>
            <BodyText size="sm" muted className="leading-relaxed">
              Evaluates password strength based on entropy score, length, character variety
              (uppercase, lowercase, numbers, symbols), returning score (0-4) and label.
            </BodyText>
          </div>
          <Badge theme="success" size="sm" className="whitespace-nowrap shrink-0 self-start">
            Security Evaluator
          </Badge>
        </div>

        <CodeBlock
          code={`import { evaluatePasswordStrength } from '@pk-design/react-tailwind'

const { score, label } = evaluatePasswordStrength('SecretP@ss123!')
// score: 4, label: 'Strong'`}
          language="tsx"
        />

        {/* Live Playground */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl space-y-3 border border-gray-200/80 dark:border-gray-700">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Live Password Strength Evaluator
          </div>
          <Input
            label="Password string"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="sm"
          />
          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Score: {pwdResult.score} / 4</span>
              <span className="capitalize font-mono text-blue-600 dark:text-blue-400">
                {pwdResult.label}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  pwdResult.score <= 1
                    ? 'bg-rose-500 w-1/4'
                    : pwdResult.score === 2
                      ? 'bg-amber-500 w-2/4'
                      : pwdResult.score === 3
                        ? 'bg-blue-500 w-3/4'
                        : 'bg-emerald-500 w-full'
                }`}
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
