import { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import {
  ALIGN_MAP,
  DIRECTION_MAP,
  FLEX_LG_SPAN_MAP,
  FLEX_MD_SPAN_MAP,
  FLEX_SM_SPAN_MAP,
  FLEX_SPAN_MAP,
  FLEX_XL_SPAN_MAP,
  FLEX_XXL_SPAN_MAP,
  GAP_MAP,
  GAP_X_MAP,
  GAP_Y_MAP,
  JUSTIFY_MAP,
  WRAP_MAP,
  resolveOrderClassName,
  resolveOrderStyle,
} from '../common-responsive'
import type { FlexComponent, FlexItemProps, FlexProps } from './Flex.types'

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => {
  const {
    as: Component = 'div',
    span,
    sm,
    md,
    lg,
    xl,
    xxl,
    grow,
    shrink,
    order,
    className,
    style,
    children,
    ...restProps
  } = props

  const classes = buildClassName(
    'min-w-0 box-border',
    span && FLEX_SPAN_MAP[String(span)],
    sm && FLEX_SM_SPAN_MAP[String(sm)],
    md && FLEX_MD_SPAN_MAP[String(md)],
    lg && FLEX_LG_SPAN_MAP[String(lg)],
    xl && FLEX_XL_SPAN_MAP[String(xl)],
    xxl && FLEX_XXL_SPAN_MAP[String(xxl)],
    resolveOrderClassName(order),
    grow === true && 'grow',
    grow === false && 'grow-0',
    shrink === true && 'shrink',
    shrink === false && 'shrink-0',
    className,
  )

  return (
    <Component
      ref={ref}
      className={classes}
      style={{ ...resolveOrderStyle(order), ...style }}
      {...restProps}
    >
      {children}
    </Component>
  )
})

FlexItem.displayName = 'Flex.Item'

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    as: Component = 'div',
    gap,
    gapX,
    gapY,
    align = 'stretch',
    justify = 'start',
    direction = 'row',
    wrap = 'wrap',
    inline = false,
    className,
    children,
    ...restProps
  } = props

  const classes = buildClassName(
    inline ? 'inline-flex' : 'flex',
    DIRECTION_MAP[direction] || 'flex-row',
    WRAP_MAP[wrap] || 'flex-wrap',
    'w-full',
    !gapX && !gapY && gap && GAP_MAP[gap],
    gapX && GAP_X_MAP[gapX],
    gapY && GAP_Y_MAP[gapY],
    ALIGN_MAP[align] || 'items-stretch',
    JUSTIFY_MAP[justify] || 'justify-start',
    className,
  )

  return (
    <Component ref={ref} className={classes} {...restProps}>
      {children}
    </Component>
  )
}) as unknown as FlexComponent

Flex.Item = FlexItem
Flex.Col = FlexItem
Flex.displayName = 'Flex'
