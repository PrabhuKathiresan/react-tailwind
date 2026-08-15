import { Outlet, useLocation, useNavigate } from 'react-router'
import { Button, TextContent } from '@pk-design/react-tailwind'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import NavList, { pageRoutes } from '../components/NavList'
import { OutdatedVersionBanner } from '../components/OutdatedVersionBanner'

export default function DocsLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentRouteIdx = pageRoutes.findIndex((r) => r.path === location.pathname)
  const nextIdx = currentRouteIdx + 1 >= pageRoutes.length ? -1 : currentRouteIdx + 1
  const prevIdx = currentRouteIdx - 1 < 0 ? -1 : currentRouteIdx - 1

  const nextRoute = nextIdx !== -1 ? pageRoutes[nextIdx] : null
  const prevRoute = prevIdx !== -1 ? pageRoutes[prevIdx] : null

  const navigateTo = (idx: number) => {
    const route = pageRoutes[idx]
    return navigate(route.path)
  }
  return (
    <div>
      <OutdatedVersionBanner />
      <div className="flex">
        <aside className="w-full max-w-[240px] h-[calc(100dvh-61px)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-6 sticky top-[60px] hidden md:block">
          <NavList />
        </aside>
        <section id="scrollable-container" className="w-full grow-0 overflow-x-auto">
          <div className="relative px-2 md:px-4 pt-2 pb-0 md:pb-2">
            <Outlet />
            <div className="flex items-center justify-between px-2 md:px-4 lg:px-8 py-2">
              <Button
                variant="plain"
                theme="secondary"
                disabled={prevIdx === -1}
                onClick={() => navigateTo(prevIdx)}
              >
                <ChevronLeftIcon size={14} />
                <TextContent className="hidden md:inline">
                  {prevRoute?.label || 'Previous'}
                </TextContent>
                <TextContent className="inline md:hidden">Previous</TextContent>
              </Button>
              <Button
                variant="plain"
                theme="secondary"
                disabled={nextIdx === -1}
                onClick={() => navigateTo(nextIdx)}
              >
                <TextContent className="hidden md:inline">{nextRoute?.label || 'Next'}</TextContent>
                <TextContent className="inline md:hidden">Next</TextContent>
                <ChevronRightIcon size={14} />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
