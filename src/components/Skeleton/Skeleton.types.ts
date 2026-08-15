import type { ComponentPropsWithoutRef, ElementType, JSX } from 'react'
import type { PolymorphicRef } from '../common-type'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'
export type SkeletonAnimation = 'pulse' | 'wave' | 'none'

export interface SkeletonBaseProps {
  /**
   * Shape variant of the skeleton element
   * @default "text"
   */
  variant?: SkeletonVariant
  /**
   * Animation style for the placeholder shimmer
   * @default "pulse"
   */
  animation?: SkeletonAnimation
  /**
   * Explicit width (number in px or CSS string like "100%", "200px")
   */
  width?: number | string
  /**
   * Explicit height (number in px or CSS string like "1rem", "40px")
   */
  height?: number | string
  /**
   * Optional custom border radius override
   */
  borderRadius?: number | string
}

export type PolymorphicSkeletonProps<C extends ElementType, Props = {}> = Props & {
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>

export type SkeletonProps<C extends ElementType = 'div'> = PolymorphicSkeletonProps<
  C,
  SkeletonBaseProps
>

export interface SkeletonComponent {
  <C extends ElementType = 'div'>(
    props: SkeletonProps<C> & { ref?: PolymorphicRef<C> },
  ): JSX.Element
  displayName?: string
}
