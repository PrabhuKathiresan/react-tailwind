/**
 * utils/generateSearchIndex.ts
 *
 * Builds public/search-index.json from the already-generated component JSON
 * files in src/data/components/. Includes rich search aliases, category tags & synonyms.
 */

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.resolve(process.cwd(), 'src', 'data', 'components')
const OUTPUT_PATH = path.resolve(process.cwd(), 'public', 'search-index.json')

type PropInfo = {
  name: string
  type: string
  required: boolean
  description: string
  defaultValue?: string | null
}

type SearchItem = {
  name: string
  description: string
  props: PropInfo[]
  keywords: string[]
  url: string
}

const BLOCKED_KEYWORDS = new Set([
  'string',
  'number',
  'boolean',
  'any',
  'void',
  'null',
  'undefined',
  'object',
  'never',
  'unknown',
  'true',
  'false',
  'react',
  'node',
  'keyboard',
  'navigation',
  'component',
  'supports',
  'rendering',
  'default',
  'custom',
  'element',
  'aria',
  'class',
  'classes',
  'style',
  'styles',
  'prop',
  'props',
  'value',
  'values',
  'type',
  'types',
])

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  // Mobile & Touch
  ActionSheet: ['mobile', 'touch', 'mobile-touch', 'gestures', 'sheet'],
  BottomNavigation: ['mobile', 'touch', 'mobile-touch', 'bottom-bar', 'navigation', 'nav'],
  DataList: ['mobile', 'touch', 'mobile-touch', 'list', 'data-list'],
  FloatingActionButton: ['mobile', 'touch', 'mobile-touch', 'fab', 'button'],
  MobileHeader: ['mobile', 'touch', 'mobile-touch', 'header', 'nav', 'navigation', 'top-bar'],
  MobilePicker: ['mobile', 'touch', 'mobile-touch', 'picker', 'select', 'drawer'],
  MobileStepper: ['mobile', 'touch', 'mobile-touch', 'stepper', 'dots', 'progress'],
  PinInput: [
    'mobile',
    'touch',
    'mobile-touch',
    'form',
    'forms',
    'input',
    'inputs',
    'otp',
    'passcode',
  ],
  PullToRefresh: ['mobile', 'touch', 'mobile-touch', 'refresh', 'pull'],
  SwipeableRow: ['mobile', 'touch', 'mobile-touch', 'swipe', 'actions'],
  SwipeableTabs: ['mobile', 'touch', 'mobile-touch', 'tabs', 'swipe', 'navigation', 'nav'],
  WheelPicker: ['mobile', 'touch', 'mobile-touch', 'picker', 'wheel', 'ios'],

  // Forms & Inputs
  Input: ['form', 'forms', 'input', 'inputs', 'field', 'textbox', 'control'],
  Checkbox: ['form', 'forms', 'input', 'inputs', 'check', 'boolean'],
  CheckboxGroup: ['form', 'forms', 'input', 'inputs', 'checkboxes'],
  Radio: ['form', 'forms', 'input', 'inputs', 'radio'],
  RadioGroup: ['form', 'forms', 'input', 'inputs', 'options'],
  SelectBox: ['form', 'forms', 'input', 'inputs', 'select', 'combobox', 'dropdown', 'autocomplete'],
  Textarea: ['form', 'forms', 'input', 'inputs', 'text', 'multiline'],
  PasswordInput: ['form', 'forms', 'input', 'inputs', 'password', 'secret'],
  QuantityStepper: ['form', 'forms', 'input', 'inputs', 'counter', 'stepper', 'number'],
  RangeInput: ['form', 'forms', 'input', 'inputs', 'slider', 'range'],
  RangeSlider: ['form', 'forms', 'input', 'inputs', 'slider', 'range'],

  // Feedback & Overlays
  Toast: ['feedback', 'overlay', 'overlays', 'notification', 'alert', 'toast'],
  ToastProvider: ['feedback', 'overlay', 'overlays', 'toast', 'provider'],
  Dialog: ['feedback', 'overlay', 'overlays', 'modal', 'popup', 'dialog'],
  Drawer: ['feedback', 'overlay', 'overlays', 'sidebar', 'panel', 'drawer'],
  Alert: ['feedback', 'overlay', 'overlays', 'alert', 'warning', 'message'],
  Banner: ['feedback', 'overlay', 'overlays', 'banner', 'announcement'],
  Skeleton: ['feedback', 'overlay', 'overlays', 'loading', 'placeholder'],

  // Navigation & Tabs
  Breadcrumb: ['navigation', 'nav', 'breadcrumb', 'trail', 'path'],
  Tabs: ['navigation', 'nav', 'tabs', 'tab-panel', 'segmented'],
  ButtonGroup: ['navigation', 'nav', 'buttons', 'actions', 'group'],
  RadioSwitch: ['navigation', 'nav', 'switch', 'toggle', 'segmented'],
  Pagination: ['navigation', 'nav', 'pagination', 'paging', 'pages'],
  StickyActionBar: ['navigation', 'nav', 'bottom-bar', 'action-bar'],

  // Data & Tables
  DataTable: ['data', 'tables', 'table', 'grid', 'sortable'],
  VirtualizedDataTable: ['data', 'tables', 'table', 'grid', 'virtual', '10k'],
  Card: ['data', 'tables', 'card', 'container', 'box'],
  Table: ['data', 'tables', 'table', 'cells', 'rows'],
  DetailedInformation: ['data', 'tables', 'info', 'key-value', 'list'],
}

const COMPONENT_ALIASES: Record<string, string[]> = {
  SelectBox: [
    'combobox',
    'select',
    'dropdown',
    'autocomplete',
    'picker',
    'options',
    'multi-select',
    'searchable-select',
  ],
  Dropdown: ['menu', 'context-menu', 'action-menu', 'select', 'popover', 'flyout'],
  PinInput: ['otp', 'passcode', 'pincode', '2fa', 'verification', 'code', 'digits', 'auth'],
  ActionSheet: ['bottom-sheet', 'modal-sheet', 'mobile-actions', 'action-menu', 'dialog-sheet'],
  WheelPicker: ['ios-picker', '3d-picker', 'scroll-picker', 'date-picker', 'time-picker', 'wheel'],
  MobilePicker: [
    'mobile-select',
    'mobile-combobox',
    'native-picker',
    'drawer-select',
    'bottom-picker',
  ],
  FloatingActionButton: ['fab', 'action-button', 'plus-button', 'speed-dial', 'floating-button'],
  MobileStepper: [
    'progress-dots',
    'page-indicator',
    'wizard-stepper',
    'dots',
    'carousel-indicator',
  ],
  QuantityStepper: ['counter', 'number-input', 'plus-minus', 'increment', 'decrement', 'quantity'],
  Badge: ['tag', 'chip', 'label', 'count', 'notification-count'],
  StatusPill: ['pill', 'status', 'badge', 'indicator', 'dot', 'active-pill'],
  Dialog: ['modal', 'popup', 'alert-dialog', 'window', 'lightbox'],
  Drawer: ['sidebar', 'offcanvas', 'slide-over', 'sheet', 'side-panel'],
  Banner: ['hero-alert', 'announcement', 'notification-bar', 'alert-banner'],
  RadioSwitch: ['segmented', 'toggle-group', 'switch-group', 'pill-toggle'],
  SegmentedControl: ['segmented', 'toggle-buttons', 'ios-tabs', 'segmented-picker'],
  SwipeableRow: ['swipe-actions', 'slide-to-delete', 'touch-swipe', 'swipe-list'],
  SwipeableTabs: ['touch-tabs', 'swipe-tabs', 'tab-bar', 'view-pager'],
  BottomNavigation: ['bottom-bar', 'tab-bar', 'mobile-nav', 'bottom-tabs', 'navigation', 'nav'],
  MobileHeader: [
    'app-bar',
    'top-bar',
    'header-bar',
    'navbar',
    'mobile-header',
    'navigation',
    'nav',
  ],
  VirtualizedDataTable: [
    'virtual-grid',
    'big-table',
    '10k-rows',
    'infinite-table',
    'virtual-scroll',
  ],
  DataTable: ['grid', 'table', 'data-grid', 'sortable-table', 'data-table'],
  Input: ['text-input', 'textbox', 'field', 'form-field', 'form-control'],
  PasswordInput: ['password', 'secret', 'show-password', 'auth-input'],
  Checkbox: ['check', 'tick', 'checkbox-group', 'boolean-input'],
  Radio: ['radio-button', 'option-button', 'single-select'],
  Tabs: ['tab-nav', 'tab-panels', 'tabs-container', 'navigation', 'nav'],
  Toast: ['notification', 'alert-toast', 'snackbar', 'toast-message', 'message-popup'],
  Accordion: ['collapsible', 'expandable-panel', 'faq-list', 'disclosure'],
  Breadcrumb: ['breadcrumbs', 'nav-path', 'breadcrumb-trail', 'navigation', 'nav'],
  ButtonGroup: ['button-bar', 'action-group', 'segmented-buttons', 'navigation'],
  DetailedInformation: ['kv-list', 'description-list', 'details-card', 'key-value'],
}

function toKebabRoute(name: string): string {
  return '/' + name.replace(/([A-Z])/g, (m, l, i) => (i === 0 ? l : `-${l}`)).toLowerCase()
}

function buildKeywords(name: string, props: PropInfo[]): string[] {
  const categoryKw = CATEGORY_KEYWORDS[name] || []
  const aliases = COMPONENT_ALIASES[name] || []

  const raw = [
    name.toLowerCase(),
    ...categoryKw,
    ...aliases,
    ...props.map((p) => p.name.toLowerCase()),
    ...props.flatMap((p) =>
      p.type
        .split(/\W+/)
        .map((t) => t.toLowerCase())
        .filter((t) => t.length > 2 && !BLOCKED_KEYWORDS.has(t)),
    ),
    ...props
      .filter((p) => p.description)
      .flatMap((p) =>
        p.description
          .toLowerCase()
          .split(/\W+/)
          .filter((w) => w.length > 3 && !BLOCKED_KEYWORDS.has(w)),
      ),
  ]

  return [...new Set(raw)].filter(Boolean)
}

function main() {
  const componentDirs = fs
    .readdirSync(DATA_DIR)
    .filter((f) => fs.statSync(path.join(DATA_DIR, f)).isDirectory())

  const items: SearchItem[] = componentDirs.flatMap((dirName) => {
    const dirPath = path.join(DATA_DIR, dirName)

    const jsonFiles = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith('.json') && !f.includes('index'))

    return jsonFiles.map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf-8'))

      const name: string = raw.name ?? dirName
      const description: string = raw.description?.trim() || `${name} component`

      const props: PropInfo[] = (raw.props ?? []).map((p: any) => ({
        name: p.name,
        type: p.raw ?? p.type ?? '',
        required: p.required ?? false,
        description: p.description ?? '',
        defaultValue: p.defaultValue ?? null,
      }))

      return {
        name,
        description,
        props,
        keywords: buildKeywords(name, props),
        url: toKebabRoute(name),
      }
    })
  })

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(items, null, 2))
  console.log(`✅ Search index: ${items.length} components generated with cleaned keywords!`)
}

main()
