import React, { Children, cloneElement, isValidElement, useMemo } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { ButtonSize, ButtonTheme } from '../Button/Button.types'
import type { ButtonGroupOrientation, ButtonGroupProps } from './ButtonGroup.types'

const EDGE_ROUNDING: Record<
  ButtonGroupOrientation,
  Record<ButtonSize, { first: string; last: string }>
> = {
  horizontal: {
    xs: { first: 'rounded-l-sm rounded-r-none', last: 'rounded-r-sm rounded-l-none' },
    sm: { first: 'rounded-l rounded-r-none', last: 'rounded-r rounded-l-none' },
    md: { first: 'rounded-l-md rounded-r-none', last: 'rounded-r-md rounded-l-none' },
    lg: { first: 'rounded-l-lg rounded-r-none', last: 'rounded-r-lg rounded-l-none' },
  },
  vertical: {
    xs: { first: 'rounded-t-sm rounded-b-none', last: 'rounded-b-sm rounded-t-none' },
    sm: { first: 'rounded-t rounded-b-none', last: 'rounded-b rounded-t-none' },
    md: { first: 'rounded-t-md rounded-b-none', last: 'rounded-b-md rounded-t-none' },
    lg: { first: 'rounded-t-lg rounded-b-none', last: 'rounded-b-lg rounded-t-none' },
  },
}

const PILL_EDGE_ROUNDING: Record<ButtonGroupOrientation, { first: string; last: string }> = {
  horizontal: { first: 'rounded-l-full rounded-r-none', last: 'rounded-r-full rounded-l-none' },
  vertical: { first: 'rounded-t-full rounded-b-none', last: 'rounded-b-full rounded-t-none' },
}

const getEdgeRoundingClass = ({
  index,
  count,
  size,
  orientation,
  pill,
}: {
  index: number
  count: number
  size: ButtonSize
  orientation: ButtonGroupOrientation
  pill: boolean
}) => {
  if (count <= 1) return ''
  if (index !== 0 && index !== count - 1) return 'rounded-none'

  const position = index === 0 ? 'first' : 'last'
  return pill
    ? PILL_EDGE_ROUNDING[orientation][position]
    : EDGE_ROUNDING[orientation][size][position]
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  theme = 'secondary',
  variant = 'default',
  size = 'md',
  value,
  onChange,
  disabled: groupDisabled = false,
  rounded = false,
  fullWidth = false,
  label,
  className = '',
}) => {
  const isVertical = orientation === 'vertical'
  const items = useMemo(() => Children.toArray(children).filter(isValidElement), [children])
  const count = items.length
  const isToggleMode = value !== undefined

  return (
    <div
      role="group"
      aria-label={label}
      className={buildClassName(
        'inline-flex items-stretch',
        isVertical ? 'flex-col' : 'flex-row',
        fullWidth && 'flex w-full',
        className,
      )}
    >
      {items.map((child, index) => {
        const childProps = child.props as Record<string, any>
        const childSize = (childProps.size as ButtonSize) ?? size
        const childDisabled = childProps.disabled ?? groupDisabled

        // Resolve item value for toggle mode
        const itemVal =
          childProps.value ??
          childProps.id ??
          (typeof childProps.children === 'string' || typeof childProps.children === 'number'
            ? childProps.children
            : index)

        const isSelected = isToggleMode
          ? Array.isArray(value)
            ? value.includes(itemVal)
            : value === itemVal
          : false

        const resolvedTheme: ButtonTheme = isToggleMode
          ? isSelected
            ? (childProps.theme ?? 'primary')
            : (childProps.theme ?? 'secondary')
          : (childProps.theme ?? theme)

        const resolvedVariant = childProps.variant ?? variant

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          childProps.onClick?.(e)
          if (isToggleMode && !childDisabled) {
            onChange?.(itemVal)
          }
        }

        return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          theme: resolvedTheme,
          variant: resolvedVariant,
          size: childSize,
          disabled: childDisabled,
          ...(isToggleMode ? { 'aria-pressed': isSelected } : {}),
          onClick: handleClick,
          className: buildClassName(
            childProps.className,
            getEdgeRoundingClass({
              index,
              count,
              size: childSize,
              orientation,
              pill: rounded,
            }),
            count > 1 && [
              'relative shadow-none hover:z-10 focus:z-10 focus-visible:z-10',
              isSelected && 'z-10',
              index > 0 && (isVertical ? '-mt-px' : '-ml-px'),
              index > 0 &&
                resolvedVariant === 'default' &&
                (isVertical
                  ? resolvedTheme === 'primary' || resolvedTheme === 'danger'
                    ? 'border-t border-white/25 dark:border-white/20'
                    : 'border-t border-[var(--ui-border)]'
                  : resolvedTheme === 'primary' || resolvedTheme === 'danger'
                    ? 'border-l border-white/25 dark:border-white/20'
                    : 'border-l border-[var(--ui-border)]'),
            ],
            fullWidth && 'flex-1',
          ),
        })
      })}
    </div>
  )
}

ButtonGroup.displayName = 'ButtonGroup'
