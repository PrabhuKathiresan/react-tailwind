import type { ReactNode, TextareaHTMLAttributes } from 'react'
import type { InputCustomProps } from '../common-type'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    InputCustomProps {
  rightGroup?: ReactNode | null
  leftGroup?: ReactNode | null
}
