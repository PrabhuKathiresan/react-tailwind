import type { MouseEvent } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { BodyText } from '../BodyText'
import { Checkbox } from '../Checkbox'
import { TextContent } from '../TextContent'
import type { ListRowLinkProps, ListRowProps } from './ListRow.types'

const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-5 shrink-0 text-slate-400 dark:text-gray-500"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const defaultLink = ({ href, className, children, ...rest }: ListRowLinkProps) => (
  <a href={href} className={className} {...rest}>
    {children}
  </a>
)

const pressable =
  'focus-visible:bg-slate-100 active:bg-slate-100 dark:focus-visible:bg-gray-800 dark:active:bg-gray-800'

/**
 * One record in a phone list: a divided row, not a card. The content is a
 * real link (or, for records edited in place, a button); actions sit beside
 * it, never inside, so no control is nested in another. Two lines, each with
 * its own right side, so the second line gets the full width when there's
 * nothing to its right.
 */
export const ListRow = ({
  href,
  renderLink = defaultLink,
  onOpen,
  title,
  titleAdornment,
  meta,
  trailing,
  trailingMeta,
  footer,
  actions,
  muted = false,
  disclosure = false,
  selection,
}: ListRowProps) => {
  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <TextContent strong className="truncate">
            {title}
          </TextContent>
          {titleAdornment}
        </div>
        {trailing && (
          <TextContent
            strong
            className={buildClassName('shrink-0 tabular-nums', muted && 'line-through')}
          >
            {trailing}
          </TextContent>
        )}
      </div>
      {(meta || trailingMeta) && (
        <div className="flex items-start justify-between gap-3">
          {meta && (
            <BodyText small muted className="min-w-0 line-clamp-2">
              {meta}
            </BodyText>
          )}
          {trailingMeta && <div className="ml-auto shrink-0">{trailingMeta}</div>}
        </div>
      )}
      {footer}
    </>
  )
  const body = disclosure ? (
    <div className="flex items-center gap-2">
      <div className="min-w-0 flex-1 space-y-1">{content}</div>
      <ChevronRightIcon />
    </div>
  ) : (
    content
  )
  // With nothing beside it, the content runs to the page's own gutter.
  const contentClass = buildClassName(
    'min-w-0 flex-1 space-y-1 py-3.5 outline-none',
    actions ? 'pr-2' : 'pr-4',
    muted && 'opacity-60',
  )

  if (selection) {
    // The checkbox is the control for keyboards and screen readers; tapping
    // the rest of the row is a bigger target for the same toggle.
    const toggleFromRow = (event: MouseEvent<HTMLDivElement>) => {
      if (!(event.target as HTMLElement).closest('input, label')) selection.onToggle()
    }
    return (
      <div
        className={buildClassName(
          'flex min-h-16 items-center',
          selection.selected && 'bg-blue-50 dark:bg-blue-950/30',
        )}
        data-selected={selection.selected || undefined}
      >
        <div className="shrink-0 pl-4 pr-3">
          <Checkbox
            checked={selection.selected}
            onChange={selection.onToggle}
            aria-label={selection.label}
          />
        </div>
        <div
          className={buildClassName(contentClass, 'cursor-pointer select-none')}
          onClick={toggleFromRow}
          data-muted={muted || undefined}
        >
          {content}
        </div>
      </div>
    )
  }

  const main = href ? (
    renderLink({
      href,
      className: buildClassName(contentClass, 'pl-4', pressable),
      children: body,
      'data-muted': muted || undefined,
    })
  ) : onOpen ? (
    <button
      type="button"
      onClick={onOpen}
      className={buildClassName(contentClass, 'pl-4 text-left', pressable)}
      data-muted={muted || undefined}
    >
      {body}
    </button>
  ) : (
    <div className={buildClassName(contentClass, 'pl-4')} data-muted={muted || undefined}>
      {body}
    </div>
  )

  return (
    <div className="flex min-h-16 items-center">
      {main}
      {actions && <div className="flex shrink-0 items-center pr-2">{actions}</div>}
    </div>
  )
}

ListRow.displayName = 'ListRow'
