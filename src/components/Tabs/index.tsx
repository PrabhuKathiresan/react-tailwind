import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'

const Recent: React.FC = () => <div>Recent</div>

const Popular: React.FC = () => <div>Popular</div>

const Trending: React.FC = () => <div>Trending</div>

const categories = [
  {
    name: 'Recent',
    component: Recent,
    props: {},
  },
  {
    name: 'Popular',
    component: Popular,
    props: {},
  },
  {
    name: 'Trending',
    component: Trending,
    props: {},
  },
]

export const Tabs: React.FC = () => {
  return (
    <div className="flex w-full pt-4">
      <div className="w-full max-w-md">
        <TabGroup>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={buildClassName(
                  'rounded-full py-1 px-3 text-sm/6 font-semibold dark:text-white border border-transparent',
                  'data-[selected]:bg-blue-100 dark:data-[selected]:bg-white/10 data-[selected]:text-blue-500',
                  'data-[hover]:bg-blue-50 dark:data-[hover]:bg-white/5',
                  'data-[selected]:data-[hover]:bg-blue-100 dark:data-[selected]:data-[hover]:bg-white/10',
                  'focus:outline-none data-[focus]:outline-1 data-[focus]:outline-blue-800 dark:data-[focus]:outline-white',
                  'data-[selected]:border-blue-500',
                )}
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {categories.map(({ name, component: Component, props }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                <Component {...props} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}
