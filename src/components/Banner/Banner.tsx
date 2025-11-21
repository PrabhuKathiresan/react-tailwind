import React, { forwardRef } from 'react'
import TriangleAlertIcon from '../Icons/TriangleAlert.svg'
import CircleXIcon from '../Icons/CircleX.svg'
import CircleCheckIcon from '../Icons/CircleCheck.svg'
import InfoIcon from '../Icons/Info.svg'
import { buildClassName } from '../../utils/build-classname'
import { BannerProps } from './Banner.types'

const sizeMap = {
  4: `size-4`,
  5: `size-5`,
  6: `size-6`,
  7: `size-7`,
  8: `size-8`,
  9: `size-9`,
  10: `size-10`,
}

const IconMap = {
  info: InfoIcon,
  error: CircleXIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const { type = 'info', iconSize = 5, children, ...restProps } = props
  const className = buildClassName(
    'text-sm banner rounded-md flex w-full p-3 items-center',
    type === 'info' ? 'bg-blue-50 text-blue-700' : '',
    type === 'error' ? 'bg-red-50 text-red-700' : '',
    type === 'success' ? 'bg-green-50 text-green-700' : '',
    type === 'warning' ? 'bg-orange-50 text-orange-700' : '',
  )

  const renderIcon = () => {
    const Icon = IconMap[type]
    return (
      <Icon
        data-testid={`banner-${type}-icon`}
        className={buildClassName('ml-1 mr-3', sizeMap[iconSize])}
      />
    )
  }

  return (
    <div ref={ref} className={className} data-testid={`banner-${type}`} {...restProps}>
      {renderIcon()}
      <div className="flex items-center w-full justify-between">{children}</div>
    </div>
  )
})

Banner.displayName = 'Banner'
