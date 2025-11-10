import React, { forwardRef, type HTMLAttributes, type JSX, type JSXElementConstructor } from 'react'
import { buildClassName } from '../../utils/build-classname';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  to?: string;
  hoverable?: boolean;
  bordered?: boolean;
  noPadding?: boolean;
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
}

export const Card: React.FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(({
  className,
  as = 'div',
  hoverable = false,
  bordered = false,
  noPadding = false,
  ...rest
}, ref) => React.createElement(as, {
  ref: ref,
  className: buildClassName(
    'bg-white rounded-md dark:bg-gray-800',
    noPadding ? '' : 'p-2 md:p-4',
    hoverable && 'shadow hover:shadow-md transition-shadow duration-200',
    bordered && 'border border-gray-200 dark:border-gray-700',
    className
  ),
  ...rest,
}))
