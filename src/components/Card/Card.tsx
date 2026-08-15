import { ElementType, forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type {
  CardComponent,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardMediaProps,
  CardProps,
  CardTitleProps,
} from './Card.types'
import type { PolymorphicRef } from '../common-type'

const RADIUS_CLASS: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

const ASPECT_RATIO_CLASS: Record<string, string> = {
  auto: 'aspect-auto',
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
}

export const Card = forwardRef(
  <C extends ElementType = 'div'>({ as, ...props }: CardProps<C>, ref: PolymorphicRef<C>) => {
    const {
      variant = 'outlined',
      radius = 'xl',
      hoverable = false,
      clickable = false,
      selected = false,
      bordered = true,
      compact = false,
      zeroPadding = false,
      ...rest
    } = props

    const Component = as || 'div'
    const { className, ...cleanRest } = rest as { className?: string }

    const isOutlined = variant === 'outlined' && bordered
    const isElevated = variant === 'elevated'
    const isFilled = variant === 'filled'
    const isGhost = variant === 'ghost'

    const classes = buildClassName(
      'block transition-all duration-200',
      RADIUS_CLASS[radius] || RADIUS_CLASS.xl,
      zeroPadding ? '' : compact ? 'p-3 sm:p-4' : 'p-5 sm:p-6',

      // Surface variants
      isOutlined && 'bg-white dark:bg-gray-900 border border-[var(--ui-border)]',
      isElevated &&
        'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-md shadow-gray-200/50 dark:shadow-none',
      isFilled && 'bg-gray-50/80 dark:bg-gray-800/60 border border-transparent',
      isGhost && 'bg-transparent border border-transparent',

      // Hoverable & Clickable states
      hoverable && 'hover:bg-gray-100/80 dark:hover:bg-gray-800/80',
      clickable && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg',
      selected && 'ring-2 ring-[var(--ui-primary)] border-[var(--ui-primary)]',

      className,
    )

    return <Component ref={ref} className={classes} {...cleanRest} />
  },
) as unknown as CardComponent

export const CardHeader = ({
  className,
  bordered = false,
  children,
  ...props
}: CardHeaderProps) => (
  <div
    className={buildClassName(
      'flex items-center justify-between gap-4 mb-4',
      bordered && 'pb-4 border-b border-gray-200 dark:border-gray-800',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export const CardTitle = ({
  className,
  as: Component = 'h3',
  children,
  ...props
}: CardTitleProps) => (
  <Component
    className={buildClassName(
      'text-lg font-semibold text-gray-900 dark:text-white tracking-tight',
      className,
    )}
    {...props}
  >
    {children}
  </Component>
)

export const CardDescription = ({ className, children, ...props }: CardDescriptionProps) => (
  <p
    className={buildClassName(
      'text-sm text-gray-500 dark:text-gray-400 font-normal mt-1',
      className,
    )}
    {...props}
  >
    {children}
  </p>
)

export const CardContent = ({ className, children, ...props }: CardContentProps) => (
  <div className={buildClassName('space-y-3', className)} {...props}>
    {children}
  </div>
)

export const CardFooter = ({
  className,
  bordered = false,
  children,
  ...props
}: CardFooterProps) => (
  <div
    className={buildClassName(
      'flex items-center justify-end gap-3 mt-4',
      bordered && 'pt-4 border-t border-gray-200 dark:border-gray-800',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export const CardMedia = ({
  className,
  aspectRatio = 'video',
  alt = '',
  ...props
}: CardMediaProps) => (
  <div className={buildClassName('overflow-hidden -mx-5 -mt-5 mb-4 sm:-mx-6 sm:-mt-6', className)}>
    <img
      alt={alt}
      className={buildClassName(
        'w-full object-cover',
        ASPECT_RATIO_CLASS[aspectRatio] || ASPECT_RATIO_CLASS.video,
      )}
      {...props}
    />
  </div>
)

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Body = CardContent
Card.Footer = CardFooter
Card.Media = CardMedia

Card.displayName = 'Card'
