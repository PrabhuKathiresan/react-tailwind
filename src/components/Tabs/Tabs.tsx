import React, { Fragment, type ReactNode } from 'react'
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { TabsProps } from './Tabs.types'

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  variant = 'underline',
  className = '',
  listClass = '',
  panelClass = '',
}) => {
  return (
    <TabGroup defaultIndex={defaultIndex} className={className}>
      <TabList className={buildClassName('flex gap-2', listClass)}>
        {tabs.map((tab, idx) => (
          <Tab key={idx} as={Fragment}>
            {({ selected }) => (
              <button className={buildTabClass({ selected, variant })}>{tab.label}</button>
            )}
          </Tab>
        ))}
      </TabList>

      <TabPanels className={buildClassName('mt-3', panelClass)}>
        {tabs.map((tab, idx) => (
          <TabPanel key={idx} className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

/**
 * Build tab styles based on variant + active state
 */
function buildTabClass({
  selected,
  variant,
}: {
  selected: boolean
  variant: 'underline' | 'segmented' | 'solid'
}) {
  switch (variant) {
    /**
     * UNDERLINE (Default)
     */
    case 'underline':
      return buildClassName(
        'px-3 py-1.5 text-sm font-medium transition relative',
        'text-gray-600 dark:text-gray-300',
        'hover:text-gray-900 dark:hover:text-white',
        selected &&
          'text-gray-900 dark:text-white after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-[var(--ui-primary)]',
      )

    /**
     * SEGMENTED
     */
    case 'segmented':
      return buildClassName(
        'px-3 py-1.5 text-sm font-medium rounded-lg transition',
        selected
          ? 'bg-[var(--ui-primary)] text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      )

    /**
     * SOLID
     */
    case 'solid':
      return buildClassName(
        'px-3 py-1.5 text-sm font-medium rounded-md transition',
        selected
          ? 'bg-gray-900 dark:bg-gray-700 text-white'
          : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700',
      )
  }
}
