import type { ElementType } from 'react'
import { PolymorphicProps } from '../common-type'

export type CardBaseProps = {
  /**
   * Make card hoverable (adds shadow transitions)
   */
  hoverable?: boolean

  /**
   * Adds border around the card
   */
  bordered?: boolean

  /**
   * Removes default padding
   */
  noPadding?: boolean

  /**
   * Render Card as different element or component
   *
   * @default "div"
   */
  as?: ElementType
}

export type CardProps<C extends ElementType = 'div'> = PolymorphicProps<C, CardBaseProps>
