import React from 'react'
import { buildClassName } from '../../utils/build-classname'

import './loader.css'

export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg'

type LoaderSizeMap = {
  [k in LoaderSize]: string
}

interface LoaderProps {
  size?: LoaderSize
  className?: string
}

const loaderSizeMap: LoaderSizeMap = {
  xs: 'size-4',
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
}

export const Loader: React.FC<LoaderProps> = ({ className = 'text-blue-600', size = 'md' }) => {
  return (
    <svg className={buildClassName(loaderSizeMap[size], className, 'spinner')} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  )
}
