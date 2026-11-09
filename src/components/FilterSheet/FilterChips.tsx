import { Button } from '../Button'
import type { FilterChipsProps } from './FilterSheet.types'

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-3.5"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

/**
 * Filters in effect, each cleared in one tap, so a narrowed list never looks
 * like the whole list. FilterSheet shows them under its row; a page without
 * one can show them on their own.
 */
export const FilterChips = ({ chips }: FilterChipsProps) => {
  if (chips.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2" aria-label="Filters in effect" role="group">
      {chips.map((chip) => (
        <Button
          key={chip.key}
          theme="secondary"
          variant="outlined"
          size="xs"
          rounded
          aria-label={`Remove filter: ${chip.label}`}
          onClick={chip.onRemove}
        >
          {chip.label}
          <XIcon />
        </Button>
      ))}
    </div>
  )
}

FilterChips.displayName = 'FilterChips'
