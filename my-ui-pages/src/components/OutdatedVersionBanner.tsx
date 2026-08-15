import { Button, TextContent } from '@pk-design/react-tailwind'
import { useDocsVersions } from '../hooks/useDocsVersions'

export function OutdatedVersionBanner() {
  const { currentVersion, latestVersion, isLatest } = useDocsVersions()

  if (isLatest) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900 px-4 py-2 text-center">
      <TextContent className="text-amber-800 dark:text-amber-300 text-sm">
        You're viewing docs for <span className="font-semibold">v{currentVersion}</span>, which is
        not the latest version.
      </TextContent>
      <Button as="a" href="/react-tailwind/" theme="secondary" variant="plain" size="sm">
        <TextContent className="text-sm">View latest (v{latestVersion}) →</TextContent>
      </Button>
    </div>
  )
}
