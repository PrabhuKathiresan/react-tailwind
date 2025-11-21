import React, { forwardRef, type LabelHTMLAttributes } from 'react'
import { buildClassName } from '../../utils/build-classname'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { className, children, ...labelProps } = props
  return (
    <label
      ref={ref}
      {...labelProps}
      className={buildClassName(
        'block text-sm font-medium text-gray-600 dark:text-gray-300',
        className,
      )}
    >
      {children}
    </label>
  )
})

Label.displayName = 'Label'
