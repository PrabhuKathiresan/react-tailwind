import React, { isValidElement, type TextareaHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { type InputCustomProps } from '../common-type'
import { Label } from '../Label';
import { isEmpty } from '../../utils/is-empty';
import { buildClassName } from '../../utils/build-classname';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, InputCustomProps {
  rightGroup?: ReactNode | null;
  leftGroup?: ReactNode | null;
}

export const Textarea: React.FC<TextareaProps> = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    name,
    id = name,
    label = null,
    labelHint = null,
    className = '',
    labelClass = '',
    labelWrapperClass = '',
    containerClass = '',
    error,
    showErrorMessage = true,
    rightGroup = null,
    leftGroup = null,
    ...inputProps
  } = props
  const hasError = !isEmpty(error)
  const hasRightGroup = rightGroup != null && isValidElement(rightGroup)
  const hasLeftGroup = leftGroup != null && isValidElement(leftGroup)

  return (
    <div
      className={buildClassName(
        'group',
        hasError && 'has-error',
        containerClass,
      )}
    >
      {
        label && (
          <div className={buildClassName('flex items-center justify-between mb-2', labelWrapperClass)}>
            <Label className={labelClass} htmlFor={id}>{label}</Label>
            {labelHint}
          </div>
        )
      }
      <div className="relative">
        {hasLeftGroup && (
          <span className='absolute top-0 h-full flex items-center justify-center w-10'>{leftGroup}</span>
        )}
        <textarea
          ref={ref}
          {...inputProps}
          name={name}
          id={id}
          className={buildClassName(
            'transition-all',
            'block w-full rounded-lg bg-white px-3.5 py-2 text-base sm:text-sm/6',
            'text-gray-900 outline dark:outline outline-1 -outline-offset-1',
            'outline-gray-300 dark:outline-gray-600',
            'focus:outline-blue-600 dark:focus:outline-blue-600 focus:outline-2 focus:-outline-offset-2',
            'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 placeholder:text-gray-400 dark:text-white',
            'invalid:group-[.has-error]:outline-red-500',
            'disabled:pointer-events-none disabled:bg-gray-100',
            'dark:disabled:bg-gray-500',
            hasRightGroup ? 'pe-10' : '',
            hasLeftGroup ? 'ps-10' : '',
            className,
          )}
        />
        {hasRightGroup && (
          <span className='absolute end-0.75 top-0 h-full flex items-center justify-center'>{rightGroup}</span>
        )}
      </div>
      {showErrorMessage && error && (
        <p className="mt-1 text-red-500 dark:text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
})
