export interface NavItem {
  path: string
  label: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { path: '/installation', label: 'Installation' },
      { path: '/colors', label: 'Colors & tokens' },
    ],
  },
  {
    title: 'Mobile & Touch',
    items: [
      { path: '/action-sheet', label: 'ActionSheet' },
      { path: '/bottom-navigation', label: 'BottomNavigation' },
      { path: '/confirm-sheet', label: 'ConfirmSheet' },
      { path: '/data-list', label: 'DataList' },
      { path: '/filter-sheet', label: 'FilterSheet' },
      { path: '/floating-action-button', label: 'FloatingActionButton' },
      { path: '/list-row', label: 'ListRow' },
      { path: '/list-view', label: 'ListView' },
      { path: '/mobile-header', label: 'MobileHeader' },
      { path: '/mobile-picker', label: 'MobilePicker' },
      { path: '/mobile-stepper', label: 'MobileStepper' },
      { path: '/pin-input', label: 'PinInput' },
      { path: '/pull-to-refresh', label: 'PullToRefresh' },
      { path: '/selection-bar', label: 'SelectionBar' },
      { path: '/settings-group', label: 'SettingsGroup' },
      { path: '/swipeable-row', label: 'SwipeableRow' },
      { path: '/swipeable-tabs', label: 'SwipeableTabs' },
      { path: '/wheel-picker', label: 'WheelPicker' },
    ],
  },
  {
    title: 'Layout & Structure',
    items: [
      { path: '/card', label: 'Card' },
      { path: '/detailed-information', label: 'DetailedInformation' },
      { path: '/drawer', label: 'Drawer' },
      { path: '/flex', label: 'Flex' },
      { path: '/grid', label: 'Grid' },
      { path: '/sticky-action-bar', label: 'StickyActionBar' },
      { path: '/table', label: 'Table' },
      { path: '/data-table', label: 'DataTable' },
      { path: '/virtualized-data-table', label: 'VirtualizedDataTable' },
    ],
  },
  {
    title: 'Form Elements',
    items: [
      { path: '/checkbox', label: 'Checkbox' },
      { path: '/checkbox-group', label: 'CheckboxGroup' },
      { path: '/input', label: 'Input' },
      { path: '/password-input', label: 'PasswordInput' },
      { path: '/quantity-stepper', label: 'QuantityStepper' },
      { path: '/radio', label: 'Radio' },
      { path: '/radio-group', label: 'RadioGroup' },
      { path: '/radio-switch', label: 'RadioSwitch' },
      { path: '/range-input', label: 'RangeInput' },
      { path: '/range-slider', label: 'RangeSlider' },
      { path: '/select-box', label: 'SelectBox' },
      { path: '/textarea', label: 'Textarea' },
    ],
  },
  {
    title: 'UI Components',
    items: [
      { path: '/accordion', label: 'Accordion' },
      { path: '/alert', label: 'Alert' },
      { path: '/badge', label: 'Badge' },
      { path: '/banner', label: 'Banner' },
      { path: '/breadcrumb', label: 'Breadcrumb' },
      { path: '/button', label: 'Button' },
      { path: '/chip', label: 'Chip' },
      { path: '/button-group', label: 'ButtonGroup' },
      { path: '/dropdown', label: 'Dropdown' },
      { path: '/pagination', label: 'Pagination' },
      { path: '/segmented-control', label: 'SegmentedControl' },
      { path: '/skeleton', label: 'Skeleton' },
      { path: '/status-pill', label: 'StatusPill' },
      { path: '/tabs', label: 'Tabs' },
      { path: '/toast', label: 'Toast' },
    ],
  },
  {
    title: 'Typography',
    items: [
      { path: '/body-text', label: 'BodyText' },
      { path: '/heading-text', label: 'HeadingText' },
      { path: '/text-content', label: 'TextContent' },
    ],
  },
  {
    title: 'Utilities & Hooks',
    items: [
      { path: '/utilities', label: 'Utilities' },
      { path: '/hooks', label: 'Custom Hooks' },
    ],
  },
]

export const pageRoutes = navSections.reduce((routes, section) => {
  routes.push(...section.items)
  return routes
}, [] as NavItem[])
