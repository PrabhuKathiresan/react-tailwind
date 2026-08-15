import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type {
  HeadingAlign,
  HeadingLevel,
  HeadingSize,
  HeadingTextProps,
  HeadingWeight,
} from './HeadingText.types'

const defaultLevelSizeMap: Record<HeadingLevel, string> = {
  1: 'text-3xl font-bold',
  2: 'text-2xl font-semibold',
  3: 'text-xl font-semibold',
  4: 'text-lg font-medium',
  5: 'text-base font-medium',
  6: 'text-sm font-medium',
}

const sizeClassMap: Record<HeadingSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
}

const weightClassMap: Record<HeadingWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

const alignClassMap: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const trackingClassMap = {
  tighter: 'tracking-tighter',
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
}

const HeadingTextComponent = forwardRef<HTMLHeadingElement, HeadingTextProps>((props, ref) => {
  const {
    level = 1,
    size,
    weight,
    muted = false,
    error = false,
    success = false,
    warning = false,
    info = false,
    invert = false,
    align,
    tracking,
    truncate = false,
    className,
    children,
    ...rest
  } = props

  const tag = `h${Math.min(6, Math.max(1, level))}` as keyof React.JSX.IntrinsicElements

  const colorClass = error
    ? 'text-[var(--ui-text-danger)]'
    : success
      ? 'text-[var(--ui-success)]'
      : warning
        ? 'text-[var(--ui-warning)]'
        : info
          ? 'text-[var(--ui-info)]'
          : muted
            ? invert
              ? 'text-gray-300 dark:text-gray-600'
              : 'text-[var(--ui-text-muted)]'
            : invert
              ? 'text-white dark:text-black'
              : 'text-[var(--ui-text)]'

  return React.createElement(tag, {
    ref,
    className: buildClassName(
      colorClass,
      size ? sizeClassMap[size] : defaultLevelSizeMap[level],
      weight && weightClassMap[weight],
      align && alignClassMap[align],
      tracking && trackingClassMap[tracking],
      truncate && 'truncate',
      className,
    ),
    ...rest,
    children,
  })
})

HeadingTextComponent.displayName = 'HeadingText'

const Title = forwardRef<HTMLHeadingElement, HeadingTextProps>((props, ref) => (
  <HeadingTextComponent ref={ref} level={1} {...props} />
))
Title.displayName = 'HeadingText.Title'

const SubTitle = forwardRef<HTMLHeadingElement, HeadingTextProps>((props, ref) => (
  <HeadingTextComponent ref={ref} level={2} {...props} />
))
SubTitle.displayName = 'HeadingText.SubTitle'

const SubTitle2 = forwardRef<HTMLHeadingElement, HeadingTextProps>((props, ref) => (
  <HeadingTextComponent ref={ref} level={3} {...props} />
))
SubTitle2.displayName = 'HeadingText.SubTitle2'

const SubTitle3 = forwardRef<HTMLHeadingElement, HeadingTextProps>((props, ref) => (
  <HeadingTextComponent ref={ref} level={4} {...props} />
))
SubTitle3.displayName = 'HeadingText.SubTitle3'

const SubTitle4 = forwardRef<HTMLHeadingElement, HeadingTextProps>((props, ref) => (
  <HeadingTextComponent ref={ref} level={5} {...props} />
))
SubTitle4.displayName = 'HeadingText.SubTitle4'

export const HeadingText = Object.assign(HeadingTextComponent, {
  Title,
  SubTitle,
  SubTitle2,
  SubTitle3,
  SubTitle4,
})
