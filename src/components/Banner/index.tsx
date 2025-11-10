import React, { forwardRef } from 'react'
import TriangleAlertIcon from '../Icons/TriangleAlert.svg'
import CircleXIcon from '../Icons/CircleX.svg'
import CircleCheckIcon from '../Icons/CircleCheck.svg'
import InfoIcon from '../Icons/Info.svg'
import { buildClassName } from '../../utils/build-classname'

export type BannerType = 'info' | 'error' | 'success' | 'warning'
export type IconSize = 5 | 6 | 7 | 8 | 9 | 10

export interface BannerProps {
  /**
   * Defines banner type
   * @default "info"
   */
  type?: BannerType;
  children: any
  /**
   * Controls the icon size
   */
  iconSize?: IconSize
}

const sizeMap = {
  5: `size-5`,
  6: `size-6`,
  7: `size-7`,
  8: `size-8`,
  9: `size-9`,
  10: `size-10`
}

const IconMap = {
  info: InfoIcon,
  error: CircleXIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
}

export const Banner: React.FC<BannerProps> = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const {
    type = 'info',
    iconSize = 5,
    children
  } = props
  const className = buildClassName(
    'text-sm banner rounded-md flex w-full p-3 mb-4 items-center',
    type === 'info' ? 'bg-blue-50 text-blue-700' : '',
    type === 'error' ? 'bg-red-50 text-red-700' : '',
    type === 'success' ? 'bg-green-50 text-green-700' : '',
    type === 'warning' ? 'bg-orange-50 border border-orange-200 text-orange-700' : ''
  )

  const renderIcon = () => {
    const Icon = IconMap[type]
    return <Icon className={buildClassName('ml-1 mr-3', sizeMap[iconSize])} />
  }

  return (
    <div ref={ref} className={className}>
      {renderIcon()}
      <div className='flex items-center w-full justify-between'>
        {children}
      </div>
    </div>
  )
})
