import { createContext, forwardRef, useContext } from 'react'
import { buildClassName } from '../../utils/build-classname'
import {
  ALIGN_MAP,
  DIRECTION_MAP,
  GAP_MAP,
  GAP_X_MAP,
  GAP_Y_MAP,
  GRID_COLS_MAP,
  GRID_LG_SPAN_MAP,
  GRID_MD_SPAN_MAP,
  GRID_SM_SPAN_MAP,
  GRID_SPAN_MAP,
  GRID_XL_SPAN_MAP,
  GRID_XXL_SPAN_MAP,
  JUSTIFY_MAP,
  WRAP_MAP,
  resolveOrderClassName,
  resolveOrderStyle,
} from '../common-responsive'
import type { GridColProps, GridComponent, GridProps } from './Grid.types'

interface GridContextValue {
  isAutoFit: boolean
}

const GridContext = createContext<GridContextValue>({ isAutoFit: false })

export const GridCol = forwardRef<HTMLDivElement, GridColProps>((props, ref) => {
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

  const { isAutoFit } = useContext(GridContext)

  const classes = buildClassName(
    'min-w-0 box-border',
    span ? GRID_SPAN_MAP[String(span)] : isAutoFit ? undefined : 'col-span-12 sm:col-span-4',
    sm && GRID_SM_SPAN_MAP[String(sm)],
    md && GRID_MD_SPAN_MAP[String(md)],
    lg && GRID_LG_SPAN_MAP[String(lg)],
    xl && GRID_XL_SPAN_MAP[String(xl)],
    xxl && GRID_XXL_SPAN_MAP[String(xxl)],
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

GridCol.displayName = 'Grid.Col'

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    as: Component = 'div',
    cols,
    minColWidth,
    autoFit = true,
    gap = 'md',
    gapX,
    gapY,
    align = 'stretch',
    justify,
    direction = 'row',
    wrap = 'wrap',
    flex = false,
    inline = false,
    className,
    style,
    children,
    ...restProps
  } = props

  const isAutoFit = Boolean(!flex && minColWidth)

  const classes = buildClassName(
    flex ? (inline ? 'inline-flex' : 'flex') : inline ? 'inline-grid' : 'grid',
    flex && (DIRECTION_MAP[direction] || 'flex-row'),
    flex && (WRAP_MAP[wrap] || 'flex-wrap'),
    !flex &&
      !minColWidth &&
      (cols ? GRID_COLS_MAP[String(cols)] || 'grid-cols-12' : 'grid-cols-12'),
    !flex && 'justify-items-stretch',
    'w-full',
    !gapX && !gapY && GAP_MAP[gap],
    gapX && GAP_X_MAP[gapX],
    gapY && GAP_Y_MAP[gapY],
    ALIGN_MAP[align] || 'items-stretch',
    justify && (JUSTIFY_MAP[justify] || 'justify-start'),
    className,
  )

  const gridTemplateColumns =
    !flex && minColWidth
      ? `repeat(${autoFit ? 'auto-fit' : 'auto-fill'}, minmax(${minColWidth}, 1fr))`
      : undefined

  return (
    <GridContext.Provider value={{ isAutoFit }}>
      <Component
        ref={ref}
        className={classes}
        style={gridTemplateColumns ? { gridTemplateColumns, ...style } : style}
        {...restProps}
      >
        {children}
      </Component>
    </GridContext.Provider>
  )
}) as unknown as GridComponent

Grid.Col = GridCol
Grid.Item = GridCol
Grid.displayName = 'Grid'
