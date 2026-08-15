import { forwardRef, type ElementType } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { SkeletonComponent, SkeletonProps } from './Skeleton.types'
import type { PolymorphicRef } from '../common-type'

const VARIANT_CLASS: Record<string, string> = {
  text: 'rounded-md h-4 w-full my-1',
  circular: 'rounded-full shrink-0',
  rectangular: 'rounded-none w-full h-24',
  rounded: 'rounded-xl w-full h-24',
}

const ANIMATION_CLASS: Record<string, string> = {
  pulse: 'animate-pulse bg-gray-200 dark:bg-gray-700',
  wave: 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]',
  none: 'bg-gray-200 dark:bg-gray-700',
}

export const Skeleton = forwardRef((props: any, ref: any) => {
  const {
    as,
    variant = 'text',
    animation = 'pulse',
    width,
    height,
    borderRadius,
    className,
    style: customStyle,
    ...restProps
  } = props as SkeletonProps

  const Component = as || 'div'

  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined
      ? { height: typeof height === 'number' ? `${height}px` : height }
      : {}),
    ...(borderRadius !== undefined
      ? { borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }
      : {}),
    ...customStyle,
  }

  return (
    <Component
      ref={ref as PolymorphicRef<ElementType>}
      aria-hidden="true"
      style={inlineStyles}
      className={buildClassName(
        'block select-none pointer-events-none',
        VARIANT_CLASS[variant],
        ANIMATION_CLASS[animation],
        className,
      )}
      data-testid="skeleton"
      {...restProps}
    />
  )
}) as SkeletonComponent

Skeleton.displayName = 'Skeleton'
