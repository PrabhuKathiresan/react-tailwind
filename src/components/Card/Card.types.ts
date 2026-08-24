import type {
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
  ImgHTMLAttributes,
  JSX,
  FC,
} from 'react'
import { PolymorphicRef } from '../common-type'

export type CardVariant = 'outlined' | 'elevated' | 'filled' | 'ghost'
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type CardBaseProps = {
  /**
   * Surface visual variant ('outlined' | 'elevated' | 'filled' | 'ghost')
   * @default 'outlined'
   */
  variant?: CardVariant

  /**
   * Border radius variant ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
   * @default 'xl'
   */
  radius?: CardRadius

  /**
   * Make card hoverable (adds subtle background transitions)
   * @default false
   */
  hoverable?: boolean

  /**
   * Make card clickable (adds hover elevation lift & pointer cursor)
   * @default false
   */
  clickable?: boolean

  /**
   * Highlights card with a primary brand ring & border
   * @default false
   */
  selected?: boolean

  /**
   * Adds border around the card. Default is true (when variant='outlined')
   */
  bordered?: boolean

  /**
   * Make card compact
   * @default false
   */
  compact?: boolean

  /**
   * Remove default padding from the card
   * @default false
   */
  zeroPadding?: boolean

  /**
   * Optional primary title node for mobile & web card rows
   */
  title?: React.ReactNode

  /**
   * Optional secondary subtitle node for mobile & web card rows
   */
  subtitle?: React.ReactNode

  /**
   * Leading node (e.g. Avatar, thumbnail image, or icon)
   */
  leading?: React.ReactNode

  /**
   * Trailing detail text or action node
   */
  trailing?: React.ReactNode

  /**
   * Optional status badge or count pill
   */
  badge?: React.ReactNode

  /**
   * Render trailing chevron arrow navigation icon
   * @default false
   */
  showChevron?: boolean
}

export type PolymorphicCardProps<C extends ElementType, Props = {}> = Props & {
  /**
   * The element or component to render.
   * @default "div"
   */
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>

export type CardProps<C extends ElementType = 'div'> = PolymorphicCardProps<C, CardBaseProps>

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  bordered?: boolean
}

export interface CardMediaProps extends ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide'
}

export interface CardComponent {
  <C extends ElementType = 'div'>(props: CardProps<C> & { ref?: PolymorphicRef<C> }): JSX.Element
  Header: FC<CardHeaderProps>
  Title: FC<CardTitleProps>
  Description: FC<CardDescriptionProps>
  Content: FC<CardContentProps>
  Body: FC<CardContentProps>
  Footer: FC<CardFooterProps>
  Media: FC<CardMediaProps>
  displayName?: string
}
