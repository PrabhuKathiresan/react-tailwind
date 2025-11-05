import {
  type ButtonHTMLAttributes,
  type HTMLAttributeAnchorTarget,
  type JSX,
  type JSXElementConstructor
} from 'react'

export type ButtonTheme = 'primary' | 'secondary' | 'danger'
export type ButtonVariant = 'outlined' | 'default' | 'plain'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ThemedButtonClass = {
  [key in ButtonTheme]: {
    [key in ButtonVariant]: string
  }
}
export type SizeButtonClass = {
  [key in ButtonSize]: string
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  target?: HTMLAttributeAnchorTarget;
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
  loading?: boolean;
  loadingText?: string;
  rounded?: boolean;
  iconOnly?: boolean;
}
