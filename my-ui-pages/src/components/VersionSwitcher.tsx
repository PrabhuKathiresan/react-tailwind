import { Button, Dropdown, TextContent, type DropdownItem } from '@pk-design/react-tailwind'
import { ChevronDownIcon } from 'lucide-react'
import { useDocsVersions } from '../hooks/useDocsVersions'

export function VersionSwitcher() {
  const { currentVersion, latestVersion, versions, isLatest } = useDocsVersions()

  const archived = versions.filter((v) => v.version !== latestVersion)

  const items: DropdownItem[] = [
    {
      id: 'latest',
      label: `v${latestVersion}`,
      description: 'Latest',
      onClick: () => {
        window.location.href = '/react-tailwind/'
      },
    },
    ...(archived.length ? [{ id: 'divider', divider: true } as DropdownItem] : []),
    ...archived.map(
      (v): DropdownItem => ({
        id: v.version,
        label: `v${v.version}`,
        description: v.date,
        onClick: () => {
          window.location.href = v.path
        },
      }),
    ),
  ]

  return (
    <Dropdown
      width="sm"
      anchor="bottom start"
      items={items}
      triggerButton={
        <Button theme="secondary" size="sm">
          <TextContent>v{currentVersion}</TextContent>
          {!isLatest && (
            <TextContent className="text-amber-600 dark:text-amber-400">older</TextContent>
          )}
          <ChevronDownIcon className="size-3.5" />
        </Button>
      }
    />
  )
}
