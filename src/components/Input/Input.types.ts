import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, InputCustomProps {
  /**
   * Space for right icon
   */
  rightGroup?: ReactNode
  /**
   * Space for left icon
   */
  leftGroup?: ReactNode
}
