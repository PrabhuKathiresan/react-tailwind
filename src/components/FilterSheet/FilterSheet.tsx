import { Button } from '../Button'
import { Drawer } from '../Drawer'
import { TextContent } from '../TextContent'
import { FilterChips } from './FilterChips'
import type { FilterSheetProps } from './FilterSheet.types'

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-4"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

/**
 * A phone list's filters behind one button: "Filters (N)" with the result
 * count beside it, the filters in effect as removable chips under it, and
 * the fields in a bottom sheet, so the list shows straight away instead of
 * under a wall of dropdowns.
 */
export const FilterSheet = ({
  isOpen,
  onOpen,
  onClose,
  onClear,
  activeCount,
  resultCount,
  resultLabel,
  actions,
  chips = [],
  children,
}: FilterSheetProps) => (
  <>
    {/* With page actions beside Filters the row can run out of room; the count
        then drops to its own line, left-aligned, rather than wrapping. */}
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
      <div className="flex items-center gap-2">
        <Button theme="secondary" variant="outlined" size="sm" rounded onClick={onOpen}>
          <FilterIcon />
          {`Filters${activeCount > 0 ? ` (${activeCount})` : ''}`}
        </Button>
        {actions}
      </div>
      {resultCount !== undefined && (
        <TextContent small muted className="whitespace-nowrap">
          {resultCount} {resultLabel}
          {resultCount === 1 ? '' : 's'}
        </TextContent>
      )}
    </div>
    <FilterChips chips={chips} />
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      align="bottom"
      size="full"
      // A bottom sheet's panel isn't height-bounded, so overflow alone never
      // clips; `svh` (not `dvh`, which mobile Safari mis-tracks in fixed
      // elements) caps it for the worst case, browser chrome showing.
      contentClass="max-h-[calc(100svh-6rem)] overflow-y-auto px-4 pb-6"
      title="Filters"
      titleClass="pt-2 items-center justify-between"
    >
      {children}
      <div className="mt-5 flex gap-3">
        <Button
          type="button"
          theme="secondary"
          variant="outlined"
          className="flex-1"
          onClick={onClear}
        >
          Clear filters
        </Button>
        <Button type="button" className="flex-1" onClick={onClose}>
          Done
        </Button>
      </div>
    </Drawer>
  </>
)

FilterSheet.displayName = 'FilterSheet'
