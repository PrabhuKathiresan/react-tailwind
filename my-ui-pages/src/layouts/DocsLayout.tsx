import { Outlet } from 'react-router'
import NavList from '../components/NavList'
import { OutdatedVersionBanner } from '../components/OutdatedVersionBanner'

export default function DocsLayout() {
  return (
    <div>
      <OutdatedVersionBanner />
      <div className="flex">
        <aside className="w-full max-w-[240px] h-[calc(100dvh-61px)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-6 sticky top-[60px] hidden md:block">
          <NavList />
        </aside>
        <section id="scrollable-container" className="w-full min-w-0">
          <div className="relative px-2 md:px-4 pt-2 pb-8">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  )
}
