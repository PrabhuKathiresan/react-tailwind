import { useState } from 'react'
import { Link } from 'react-router'
import {
  BodyText,
  Button,
  HeadingText,
  Badge,
  StatusPill,
  RadioSwitch,
  ToastProvider,
  useToast,
  Card,
  TextContent,
} from '@pk-design/react-tailwind'
import ReactTailwindIcon from '../icons/ReactTailwindIcon'
import { LogoText } from '../components/LogoText'
import {
  CheckIcon,
  CopyIcon,
  MoveRightIcon,
  SparklesIcon,
  LayersIcon,
  ShieldCheckIcon,
  ZapIcon,
  SmartphoneIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'

import pkg from '../../../package.json'

function LiveDemoWidget() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  return (
    <Card className="p-6 max-w-md w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 shadow-2xl space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge theme="info" size="sm">
            Live Preview
          </Badge>
          <StatusPill theme="success" size="sm">
            Active
          </StatusPill>
        </div>
        <TextContent size="xs" monospace muted>
          v{pkg.version}
        </TextContent>
      </div>

      <div className="space-y-2">
        <HeadingText level={3} size="xl" weight="semibold">
          Interactive Controls
        </HeadingText>
        <BodyText size="sm" muted>
          Try clicking the controls below to trigger live toast notifications.
        </BodyText>
      </div>

      <div className="space-y-3">
        <TextContent size="xs" weight="semibold" muted className="uppercase tracking-wider">
          Billing Frequency
        </TextContent>
        <RadioSwitch
          items={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Annual (-20%)', value: 'annual' },
          ]}
          selected={selectedPlan}
          onChange={(v) => {
            setSelectedPlan(v)
            toast.info(`Switched billing frequency to ${v}.`, { title: 'Preference Saved' })
          }}
          size="sm"
        />
      </div>

      <div className="pt-2 flex flex-wrap gap-2">
        <Button
          theme="primary"
          size="sm"
          onClick={() => toast.success('Changes saved successfully!', { title: 'Success' })}
        >
          Success Toast
        </Button>
        <Button
          theme="danger"
          size="sm"
          onClick={() => toast.error('Payment connection failed!', { title: 'Error Alert' })}
        >
          Error Toast
        </Button>
        <Button
          theme="secondary"
          size="sm"
          onClick={() => toast.warning('Storage space is at 90%.', { title: 'Warning' })}
        >
          Warning
        </Button>
      </div>
    </Card>
  )
}

const componentCategories = [
  {
    title: 'Forms & Inputs',
    description: 'Accessible, controlled form controls with validation states.',
    count: '9 Components',
    links: [
      { name: 'Input', path: '/input' },
      { name: 'Checkbox', path: '/checkbox' },
      { name: 'Radio', path: '/radio' },
      { name: 'SelectBox', path: '/select-box' },
      { name: 'Textarea', path: '/textarea' },
      { name: 'PasswordInput', path: '/password-input' },
    ],
  },
  {
    title: 'Feedback & Overlays',
    description: 'Non-blocking toasts, modal dialogs, drawers, and banners.',
    count: '6 Components',
    links: [
      { name: 'Toast', path: '/toast' },
      { name: 'Dialog', path: '/dialog' },
      { name: 'Drawer', path: '/drawer' },
      { name: 'Alert', path: '/alert' },
      { name: 'Banner', path: '/banner' },
    ],
  },
  {
    title: 'Navigation & Tabs',
    description: 'Segmented controls, tab panels, and breadcrumb trails.',
    count: '8 Components',
    links: [
      { name: 'Breadcrumb', path: '/breadcrumb' },
      { name: 'Tabs', path: '/tabs' },
      { name: 'ButtonGroup', path: '/button-group' },
      { name: 'RadioSwitch', path: '/radio-switch' },
      { name: 'Pagination', path: '/pagination' },
    ],
  },
  {
    title: 'Data & Virtualization',
    description: 'High-performance data tables and virtualized 10,000+ row lists.',
    count: '7 Components',
    links: [
      { name: 'DataTable', path: '/data-table' },
      { name: 'VirtualizedDataTable', path: '/virtualized-data-table' },
      { name: 'Card', path: '/card' },
      { name: 'DetailedInformation', path: '/detailed-information' },
    ],
  },
  {
    title: 'Mobile & Touch',
    description:
      'Touch-first mobile header top bars, bottom tab navigation, swipe rows, and pickers.',
    count: '12 Components',
    links: [
      { name: 'MobileHeader', path: '/mobile-header' },
      { name: 'BottomNavigation', path: '/bottom-navigation' },
      { name: 'ActionSheet', path: '/action-sheet' },
      { name: 'FloatingActionButton', path: '/floating-action-button' },
      { name: 'PinInput', path: '/pin-input' },
      { name: 'SwipeableTabs', path: '/swipeable-tabs' },
    ],
  },
]

export default function HomePage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText('pnpm add @pk-design/react-tailwind')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 flex flex-col space-y-16 pb-16">
      {/* 🚀 Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-12 pb-16 overflow-hidden border-b border-gray-200/80 dark:border-gray-800/80">
        {/* Background Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex justify-center z-0"
        >
          <div className="w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/15 via-purple-500/10 to-emerald-500/15 blur-[120px] rounded-full -translate-y-1/3 opacity-80" />
        </div>

        <div className="max-w-6xl px-6 relative z-10 w-full space-y-10">
          <div className="flex flex-col items-center gap-4">
            <ReactTailwindIcon className="size-28 drop-shadow-lg" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
              <SparklesIcon className="size-3.5" />
              Tailwind CSS v4 Native Component Library
            </div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <HeadingText
              level={1}
              size="5xl"
              weight="extrabold"
              className="leading-tight tracking-tight"
            >
              Build Modern Interfaces Effortlessly with <LogoText />
            </HeadingText>
            <BodyText size="xl" muted className="leading-relaxed">
              A lightweight, accessible, and high-performance React component library designed for
              speed, flexibility, and seamless Tailwind v4 integration.
            </BodyText>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 flex-wrap items-center pt-2">
            <Button onClick={handleCopy} theme="secondary" size="lg" className="font-mono text-xs">
              pnpm add @pk-design/react-tailwind
              {copied ? (
                <CheckIcon className="size-4 text-emerald-500" />
              ) : (
                <CopyIcon className="size-4" />
              )}
            </Button>
            <Button as={Link} to="/installation" theme="primary" size="lg">
              Get Started
              <MoveRightIcon className="size-4" />
            </Button>
          </div>

          {/* Live Preview Demo Widget */}
          <div className="pt-6 flex justify-center">
            <ToastProvider placement="top-right">
              <LiveDemoWidget />
            </ToastProvider>
          </div>
        </div>
      </section>

      {/* 📊 Library Metrics Bar */}
      <section className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 text-center">
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">50+</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Production Components
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">v4.0</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Tailwind CSS Native
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ~10 KB
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Tree-Shaken ESM Modules
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">515+</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Monorepo Unit Tests
            </div>
          </div>
        </div>
      </section>

      {/* 💎 Feature Pillars */}
      <section className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
          <div className="size-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ZapIcon className="size-5" />
          </div>
          <HeadingText level={3} size="lg" weight="semibold">
            100% Tree-Shakeable
          </HeadingText>
          <BodyText size="sm" muted>
            Preserved ES modules and subpath exports eliminate up to 97% of unused library code.
          </BodyText>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
          <div className="size-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <SmartphoneIcon className="size-5" />
          </div>
          <HeadingText level={3} size="lg" weight="semibold">
            Mobile &amp; Touch Native
          </HeadingText>
          <BodyText size="sm" muted>
            12+ touch-optimized mobile components (WheelPicker, BottomNavigation, PinInput,
            ActionSheet).
          </BodyText>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
          <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <LayersIcon className="size-5" />
          </div>
          <HeadingText level={3} size="lg" weight="semibold">
            Tailwind v4 Tokens
          </HeadingText>
          <BodyText size="sm" muted>
            Customize component themes, brand rings, and borders directly from your CSS variables.
          </BodyText>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
          <div className="size-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldCheckIcon className="size-5" />
          </div>
          <HeadingText level={3} size="lg" weight="semibold">
            Accessible Primitives
          </HeadingText>
          <BodyText size="sm" muted>
            Full ARIA keyboard navigation, modal focus locks, and screen-reader support out of the
            box.
          </BodyText>
        </div>
      </section>

      {/* 🧩 Component Categories Grid */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <HeadingText level={2} size="3xl" weight="bold">
            Explore Component Suite
          </HeadingText>
          <BodyText muted>
            Jump directly into interactive component documentation and live examples.
          </BodyText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {componentCategories.map((cat) => (
            <motion.div
              key={cat.title}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <HeadingText level={3} size="lg" weight="bold">
                  {cat.title}
                </HeadingText>
                <Badge theme="secondary" size="sm">
                  {cat.count}
                </Badge>
              </div>

              <BodyText size="sm" muted>
                {cat.description}
              </BodyText>

              <div className="flex flex-wrap gap-2 pt-1">
                {cat.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
