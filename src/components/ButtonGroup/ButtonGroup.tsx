import React, { Children, cloneElement, isValidElement, useMemo } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { ButtonSize } from '../Button/Button.types'
import type { ButtonGroupOrientation, ButtonGroupProps } from './ButtonGroup.types'

/**
 * Corner-rounding classes for the group's first/last button, keyed by
 * orientation + size, matching Button's own size -> radius mapping
 * (xs: rounded-sm, sm: rounded, md: rounded-md, lg: rounded-lg).
 *
 * These must stay fully static string literals (no template-literal
 * interpolation) — Tailwind's JIT scanner only picks up class names that
 * appear verbatim in source, and the docs site scans the library's
 * *compiled* output, where interpolated fragments never appear as a
 * complete class name.
 */
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

/**
 * Resolves the corner-rounding classes for a single button at `index`
 * out of `count` inside the group, so only the group's outer edges stay
 * rounded and interior seams go square.
 */
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
  rounded = false,
  fullWidth = false,
  label,
  className = '',
}) => {
  const isVertical = orientation === 'vertical'
  const items = useMemo(() => Children.toArray(children).filter(isValidElement), [children])
  const count = items.length

  return (
    <div
      role="group"
      aria-label={label}
      className={buildClassName(
        'inline-flex',
        isVertical ? 'flex-col' : 'flex-row',
        fullWidth && 'flex w-full',
        className,
      )}
    >
      {items.map((child, index) => {
        const childSize = (child.props as { size?: ButtonSize }).size ?? size

        return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          theme: (child.props as { theme?: unknown }).theme ?? theme,
          variant: (child.props as { variant?: unknown }).variant ?? variant,
          size: childSize,
          className: buildClassName(
            (child.props as { className?: string }).className,
            getEdgeRoundingClass({
              index,
              count,
              size: childSize,
              orientation,
              pill: rounded,
            }),
            count > 1 && [
              'relative shadow-none hover:z-10 focus:z-10 focus-visible:z-10',
              index > 0 && (isVertical ? '-mt-px' : '-ml-px'),
            ],
            fullWidth && 'flex-1',
          ),
        })
      })}
    </div>
  )
}

ButtonGroup.displayName = 'ButtonGroup'
