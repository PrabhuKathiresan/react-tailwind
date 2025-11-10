import React, { type HTMLAttributes, type JSX, type JSXElementConstructor } from 'react'
import { buildClassName } from '../../utils/build-classname'
import XCircleIcon from '../Icons/CircleX.svg'

export type TagVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'
export interface TagProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
  text: string;
  onClose?: () => void;
  variant?: TagVariant;
}
export type VariantMap = {
  [k in TagVariant]: string
}

const variantMap: VariantMap = {
  primary: 'bg-blue-100 text-blue-600 border border-blue-200',
  secondary: 'bg-gray-100 text-gray-600 border border-gray-200',
  success: 'bg-green-100 text-green-600 border border-green-200',
  warning: 'bg-orange-100 text-orange-600 border border-orange-200',
  error: 'bg-red-100 text-red-600 border border-red-200'
}

export const Tag: React.FC<TagProps> = (props) => {
  const {
    as: Element = 'span',
    text,
    className = '',
    onClose,
    variant = 'secondary',
    ...elemProps
  } = props
  return (
    <Element
      {...elemProps}
      className={
        buildClassName(
          className,
          'px-1.5 py-0.5 text-sm/6 font-normal',
          variantMap[variant],
          'rounded'
        )
      }
    >
      <span>{text}</span>
      {onClose && <XCircleIcon className='size-3' onClick={() => onClose()} role="button" />}
    </Element>
  )
}
