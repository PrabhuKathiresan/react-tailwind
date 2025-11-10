import React, {
  type HTMLAttributes,
  type JSX,
  type JSXElementConstructor
} from 'react'
import { buildClassName } from '../../utils/build-classname'

export const Dot: React.FC<HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
}> = ({
  as = 'span',
  className,
  ...props
}) => React.createElement(as, {
  className: buildClassName(
    'inline-block rounded-full bg-gray-500 dark:bg-gray-300',
    'w-1 h-1',
    className
  ),
  ...props,
})
