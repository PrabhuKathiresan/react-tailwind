import React, { forwardRef, type LabelHTMLAttributes } from 'react'
import { buildClassName } from '../../utils/build-classname'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const {
    className,
    children,
    ...labelProps
  } = props
  return (
    <label ref={ref} {...labelProps} className={buildClassName('block text-sm font-medium text-gray-500 dark:text-gray-400', className)}>
      {children}
    </label>
  )
})
