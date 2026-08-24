import { forwardRef, useState, type ReactNode } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { HeadingText } from '../HeadingText'
import type { Detail, DetailedInformationProps } from './DetailedInformation.types'

const COLUMN_GRID_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3',
  3: 'grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3',
  4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3',
}

function CopyableValue({ text, children }: { text: string; children: ReactNode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore clipboard error
    }
  }

  return (
    <span className="inline-flex items-center gap-1.5 group/copy">
      <span>{children}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="opacity-0 group-hover/copy:opacity-100 focus:opacity-100 transition-opacity p-0.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
        title="Copy to clipboard"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <svg
            className="size-3.5 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </span>
  )
}

export const DetailedInformation = forwardRef<HTMLDivElement, DetailedInformationProps>(
  (props, ref) => {
    const {
      className,
      title,
      subTitle,
      action,
      details = [],
      columns = 1,
      layout = 'horizontal',
      variant = 'flat',
      compact = false,
      bordered = false,
      divider = true,
      emptyValue = '- -',
      titleClass,
      detailsClass,
      labelClass,
      ...divProps
    } = props

    const isCard = variant === 'card'
    const isBordered = bordered || variant === 'bordered' || isCard
    const hasTitles = title || subTitle || action
    const filteredDetails = details.filter((detail) => !detail.hidden)
    const isMultiColumn = columns > 1

    return (
      <div
        ref={ref}
        className={buildClassName(
          isCard
            ? compact
              ? 'p-3 sm:p-4 bg-gray-50/60 dark:bg-gray-800/40 rounded-2xl border border-[var(--ui-border)]'
              : 'p-4 sm:p-6 bg-gray-50/60 dark:bg-gray-800/40 rounded-2xl border border-[var(--ui-border)]'
            : isBordered
              ? compact
                ? 'p-3 sm:p-4 border border-[var(--ui-border)] rounded-2xl'
                : 'p-4 sm:p-6 border border-[var(--ui-border)] rounded-2xl'
              : compact
                ? 'p-2 md:p-3'
                : 'p-3 md:p-4',
          className,
        )}
        {...divProps}
      >
        {hasTitles && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              {title && (
                <HeadingText.SubTitle2 className={buildClassName(titleClass)}>
                  {title}
                </HeadingText.SubTitle2>
              )}
              {subTitle && (
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400 font-normal">
                  {subTitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0 flex items-center">{action}</div>}
          </div>
        )}

        {filteredDetails.length ? (
          <div
            className={buildClassName(
              'border-[var(--ui-border-muted)]',
              hasTitles && !isMultiColumn && 'border-t pt-2',
              detailsClass,
            )}
          >
            <dl
              className={buildClassName(
                COLUMN_GRID_CLASS[columns] || COLUMN_GRID_CLASS[1],
                !isMultiColumn && divider && 'divide-y divide-[var(--ui-border-muted)]',
              )}
            >
              {filteredDetails.map((detail, index) => {
                const itemFallback = detail.emptyValue ?? emptyValue
                const hasValue =
                  detail.value !== undefined && detail.value !== null && detail.value !== ''
                const displayValue = hasValue ? detail.value : itemFallback
                const copyText =
                  typeof detail.value === 'string' || typeof detail.value === 'number'
                    ? String(detail.value)
                    : ''

                const isVertical = layout === 'vertical' || isMultiColumn

                return (
                  <div
                    key={detail.label || index}
                    className={buildClassName(
                      isMultiColumn && isCard
                        ? compact
                          ? 'p-3 bg-white dark:bg-gray-900 rounded-xl border border-[var(--ui-border)] shadow-2xs flex flex-col gap-1'
                          : 'p-4 bg-white dark:bg-gray-900 rounded-xl border border-[var(--ui-border)] shadow-2xs flex flex-col gap-1'
                        : isVertical
                          ? 'flex flex-col gap-1 py-2 px-1'
                          : 'grid grid-cols-3 gap-4 items-center py-2.5 px-1',
                      compact && !isMultiColumn ? 'py-1.5' : '',
                    )}
                  >
                    <dt
                      className={buildClassName(
                        'text-sm/6 font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5',
                        labelClass,
                        detail.labelClass,
                      )}
                    >
                      {detail.icon && <span className="shrink-0 text-gray-400">{detail.icon}</span>}
                      <span>{detail.label}</span>
                      {detail.helpText && (
                        <span
                          className="text-xs text-gray-400 font-normal cursor-help"
                          title={detail.helpText}
                        >
                          (?)
                        </span>
                      )}
                    </dt>
                    <dd
                      className={buildClassName(
                        'text-sm/6 text-gray-700 dark:text-gray-300',
                        !isVertical && 'sm:col-span-2 sm:mt-0',
                        detail.contentClass,
                      )}
                    >
                      {detail.copyable && copyText ? (
                        <CopyableValue text={copyText}>{displayValue}</CopyableValue>
                      ) : (
                        displayValue
                      )}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        ) : null}
      </div>
    )
  },
)

DetailedInformation.displayName = 'DetailedInformation'
