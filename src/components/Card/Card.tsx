import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { CardProps } from './Card.types'

const BASE_CARD_CLASS = 'bg-white rounded-md dark:bg-gray-800'

export const Card = forwardRef(
  <C extends React.ElementType = 'div'>(props: CardProps<C>, ref: React.Ref<Element>) => {
    // Remove Card-only props from rest (avoid leaking to DOM)
    const {
      as: Element = 'div',
      hoverable = false,
      bordered = false,
      noPadding = false,
      ...rest
    } = props

    // Extract className safely from rest
    const { className, ...cleanRest } = rest as { className?: string }

    const classes = buildClassName(
      BASE_CARD_CLASS,
      !noPadding && 'p-2 md:p-4',
      hoverable && 'shadow hover:shadow-md transition-shadow duration-200',
      bordered && 'border border-gray-200 dark:border-gray-700',
      className,
    )

    return <Element ref={ref} className={classes} {...cleanRest} />
  },
)

Card.displayName = 'Card'
