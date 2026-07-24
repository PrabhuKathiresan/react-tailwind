import React from 'react'
import { buildClassName } from '../../utils/build-classname'
import { HeadingTextProps } from './HeadingText.types'

const Title: React.FC<HeadingTextProps> = ({ children, className }) => (
  <h1 className={buildClassName('text-3xl font-bold text-gray-900 dark:text-white', className)}>
    {children}
  </h1>
)

const SubTitle: React.FC<HeadingTextProps> = ({ children, className }) => (
  <h2 className={buildClassName('text-2xl font-semibold text-gray-900 dark:text-white', className)}>
    {children}
  </h2>
)

const SubTitle2: React.FC<HeadingTextProps> = ({ children, className }) => (
  <h3 className={buildClassName('text-xl font-semibold text-gray-900 dark:text-white', className)}>
    {children}
  </h3>
)

const SubTitle3: React.FC<HeadingTextProps> = ({ children, className }) => (
  <h4 className={buildClassName('text-lg font-medium text-gray-900 dark:text-white', className)}>
    {children}
  </h4>
)

const SubTitle4: React.FC<HeadingTextProps> = ({ children, className }) => (
  <h5 className={buildClassName('text-base font-medium text-gray-900 dark:text-white', className)}>
    {children}
  </h5>
)

export const HeadingText = {
  Title,
  SubTitle,
  SubTitle2,
  SubTitle3,
  SubTitle4,
}
