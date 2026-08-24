import React, { useId, useMemo, useState } from 'react'
import { buildClassName } from '../../utils/build-classname'
import ChevronDownIcon from '../Icons/ChevronDown.svg'
import type { AccordionItem, AccordionProps, AccordionVariant } from './Accordion.types'

const CONTAINER_CLASS: Record<AccordionVariant, string> = {
  bordered:
    'rounded-lg border border-[var(--ui-border)] divide-y divide-[var(--ui-border)] bg-white dark:bg-gray-800 overflow-hidden',
  separated: 'space-y-2',
  plain: 'divide-y divide-[var(--ui-border)]',
}

const ITEM_CLASS: Record<AccordionVariant, string> = {
  bordered: '',
  separated:
    'rounded-lg border border-[var(--ui-border)] bg-white dark:bg-gray-800 overflow-hidden',
  plain: '',
}

const HEADER_CLASS =
  'flex w-full items-center justify-between gap-2 py-3 px-4 text-left text-sm font-medium ' +
  'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--ui-focus-ring)] ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none ' +
  'transition-colors duration-150 cursor-pointer'

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  variant = 'bordered',
  collapsible = true,
  defaultOpenIds,
  openIds: controlledOpenIds,
  onChange,
  expandIcon,
  className = '',
  titleClass = '',
  panelClass = '',
}) => {
  const baseId = useId()

  const resolvedItems = useMemo(
    () => items.map((item, index) => ({ ...item, id: item.id ?? index })),
    [items],
  )

  const [uncontrolledOpenIds, setUncontrolledOpenIds] = useState<Array<string | number>>(
    defaultOpenIds ?? [],
  )

  const isControlled = controlledOpenIds !== undefined
  const openIds = isControlled ? controlledOpenIds : uncontrolledOpenIds

  const toggle = (id: string | number) => {
    const isOpen = openIds.includes(id)
    const next =
      type === 'single'
        ? isOpen
          ? collapsible
            ? []
            : openIds
          : [id]
        : isOpen
          ? openIds.filter((openId) => openId !== id)
          : [...openIds, id]

    if (next === openIds) return
    if (!isControlled) setUncontrolledOpenIds(next)
    onChange?.(next)
  }

  const renderIndicator = (isOpen: boolean) => {
    if (typeof expandIcon === 'function') return expandIcon(isOpen)

    return (
      <span
        className={buildClassName(
          'inline-flex shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
      >
        {expandIcon ?? <ChevronDownIcon className="size-4 stroke-gray-500 dark:stroke-gray-400" />}
      </span>
    )
  }

  return (
    <div className={buildClassName(CONTAINER_CLASS[variant], className)}>
      {resolvedItems.map((item: AccordionItem & { id: string | number }) => {
        const isOpen = openIds.includes(item.id)
        const headerId = `${baseId}-${item.id}-header`
        const panelId = `${baseId}-${item.id}-panel`

        return (
          <div key={item.id} className={ITEM_CLASS[variant]}>
            <h3 className="m-0">
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                className={buildClassName(HEADER_CLASS, titleClass, item.titleClass)}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <span className="inline-flex shrink-0">{item.icon}</span>}
                  {item.title}
                </span>
                {renderIndicator(isOpen)}
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={buildClassName(
                'grid transition-[grid-template-rows] duration-200 ease-in-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={buildClassName(
                    'px-4 pt-2 pb-4 text-sm text-gray-600 dark:text-gray-300',
                    panelClass,
                    item.panelClass,
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Accordion.displayName = 'Accordion'
