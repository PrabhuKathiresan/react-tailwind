import React, { Fragment } from 'react'
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { TabsProps } from './Tabs.types'

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  selectedIndex,
  onChange,
  variant = 'underline',
  orientation = 'horizontal',
  stretch = false,
  className = '',
  listClass = '',
  panelsClass = '',
}) => {
  const isVertical = orientation === 'vertical'

  return (
    <TabGroup
      defaultIndex={defaultIndex}
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical={isVertical}
      className={buildClassName(
        isVertical && 'flex gap-4',
        stretch && !isVertical && 'w-full',
        className,
      )}
    >
      <TabList
        className={buildClassName(
          isVertical ? 'flex flex-col gap-1' : 'flex gap-2',
          stretch && !isVertical && 'w-full',
          listClass,
        )}
      >
        {tabs.map((tab, idx) => (
          <Tab key={tab.id ?? idx} disabled={tab.disabled} as={Fragment}>
            {({ selected }) => (
              <button
                disabled={tab.disabled}
                className={buildTabClass({
                  selected,
                  variant,
                  stretch,
                  isVertical,
                  tabClass: tab.tabClass,
                })}
              >
                {tab.icon && <span className="inline-flex shrink-0">{tab.icon}</span>}
                {tab.label}
              </button>
            )}
          </Tab>
        ))}
      </TabList>

      <TabPanels className={buildClassName(isVertical ? 'flex-1' : 'mt-3', panelsClass)}>
        {tabs.map((tab, idx) => (
          <TabPanel
            key={tab.id ?? idx}
            className={
              tab.panelClass !== undefined
                ? tab.panelClass
                : 'rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm'
            }
          >
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

function buildTabClass({
  selected,
  variant,
  stretch,
  isVertical,
  tabClass,
}: {
  selected: boolean
  variant: 'underline' | 'segmented' | 'solid'
  stretch?: boolean
  isVertical?: boolean
  tabClass?: string
}) {
  const base = buildClassName(
    'inline-flex items-center gap-1.5 text-sm font-medium transition focus-visible:outline-none',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    stretch && !isVertical && 'flex-1 justify-center',
  )

  let variantClass: string

  switch (variant) {
    case 'underline':
      variantClass = isVertical
        ? buildClassName(
            'px-3 py-2 w-full text-left border-l-2',
            selected
              ? 'border-[var(--ui-primary)] text-gray-900 dark:text-white'
              : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600',
          )
        : buildClassName(
            'px-3 py-1.5 relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
            selected &&
              'text-gray-900 dark:text-white after:absolute after:z-10 after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-[var(--ui-primary)]',
          )
      break

    case 'segmented':
      variantClass = buildClassName(
        'px-3 py-1.5 rounded-lg',
        selected
          ? 'bg-[var(--ui-primary)] text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      )
      break

    case 'solid':
      variantClass = buildClassName(
        'px-3 py-1.5 rounded-md',
        selected
          ? 'bg-gray-900 dark:bg-gray-700 text-white'
          : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700',
      )
      break
  }

  return buildClassName(base, variantClass, tabClass)
}
