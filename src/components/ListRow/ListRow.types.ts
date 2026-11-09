import type { ReactElement, ReactNode } from 'react'

/** What a custom link receives: render an anchor-like element with these. */
export interface ListRowLinkProps {
  href: string
  className: string
  children: ReactNode
  'data-muted'?: boolean
}

export interface ListRowSelection {
  /** Whether this row is selected. */
  selected: boolean
  /** Toggles this row. */
  onToggle: () => void
  /** Names the row's checkbox, e.g. "Select invoice 0057". */
  label: string
}

export interface ListRowProps {
  /**
   * Where the row goes. The whole content area is one link to it, so keyboard,
   * screen readers and "open in new tab" work.
   */
  href?: string
  /**
   * Renders the link for `href`, e.g. a router's Link (`({ href, ...props }) =>
   * <Link to={href} {...props} />`).
   * @default a plain `<a>`
   */
  renderLink?: (props: ListRowLinkProps) => ReactElement
  /**
   * For records without a page of their own (e.g. edited in a sheet): the
   * content area is one button doing this. Without `href` or `onOpen` the row
   * is static.
   */
  onOpen?: () => void
  /** Main line, e.g. the document number. */
  title: ReactNode
  /** Shown after the title, e.g. a status pill. */
  titleAdornment?: ReactNode
  /** Second line, e.g. "Customer · date". Wraps to two lines rather than truncating. */
  meta?: ReactNode
  /** Right side of the first line, e.g. the amount. */
  trailing?: ReactNode
  /** Right side of the second line, e.g. "Due ₹1,200". */
  trailingMeta?: ReactNode
  /** Under the second line, across the row, e.g. a small bar. */
  footer?: ReactNode
  /** Row actions (e.g. a ⋮ button), beside the content, never inside it. */
  actions?: ReactNode
  /**
   * A record that no longer counts (e.g. a void invoice): dimmed, with the
   * trailing value struck through. Say why in `titleAdornment` too, since
   * dimming alone isn't announced.
   * @default false
   */
  muted?: boolean
  /**
   * A chevron after the content, for rows that open a setting or a form
   * (a settings list) rather than a record in a list.
   * @default false
   */
  disclosure?: boolean
  /**
   * Selection mode: a checkbox leads the row and tapping the row toggles it,
   * instead of opening the record. Actions are hidden meanwhile.
   */
  selection?: ListRowSelection
}
