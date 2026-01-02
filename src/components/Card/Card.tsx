import { ElementType, forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { CardComponent, CardProps } from './Card.types'
import type { PolymorphicRef } from '../common-type'

const BASE_CARD_CLASS = 'bg-white rounded-md dark:bg-gray-900 block'

export const Card = forwardRef(
  <C extends ElementType = 'div'>({ as, ...props }: CardProps<C>, ref: PolymorphicRef<C>) => {
    // Remove Card-only props from rest (avoid leaking to DOM)
    const {
      hoverable = false,
      bordered = true,
      compact = false,
      zeroPadding = false,
      ...rest
    } = props

    const Component = as || 'div'

    // Extract className safely from rest
    const { className, ...cleanRest } = rest as { className?: string }

    const classes = buildClassName(
      BASE_CARD_CLASS,
      zeroPadding ? '' : compact ? 'p-2' : 'p-6',
      hoverable && 'transition-background duration-200 hover:bg-gray-100 dark:hover:bg-gray-800',
      bordered && 'border border-gray-200 dark:border-gray-800',
      className,
    )

    return <Component ref={ref} className={classes} {...cleanRest} />
  },
) as CardComponent

Card.displayName = 'Card'
