import type { ReactNode } from 'react'

/** An applied filter shown as a removable chip, e.g. "Last 15 days". */
export interface FilterChip {
  /** Unique among the chips. */
  key: string
  /** What the filter is, e.g. "Unpaid" or "“sharma”". */
  label: string
  /** Clears this filter. */
  onRemove: () => void
}

export interface FilterChipsProps {
  /** Filters in effect; nothing renders without any. */
  chips: FilterChip[]
}

export interface FilterSheetProps {
  /** Whether the sheet is open. */
  isOpen: boolean
  /** Opens the sheet (the Filters button). */
  onOpen: () => void
  /** Closes the sheet (Done, the backdrop or Escape). */
  onClose: () => void
  /** Resets every filter (Clear filters). */
  onClear: () => void
  /** Filters set to something other than their default, shown as "Filters (N)". */
  activeCount: number
  /** Records matching, shown beside the button once known, e.g. "12 invoices". */
  resultCount?: number
  /** Singular noun for the count, e.g. "invoice". */
  resultLabel: string
  /** Page actions shown beside the Filters button, e.g. an upload. */
  actions?: ReactNode
  /**
   * Filters in effect, as removable chips under the row, so the count says
   * what it counts and a filter can be cleared in one tap.
   */
  chips?: FilterChip[]
  /** The filter fields, shown in the sheet. */
  children: ReactNode
}
