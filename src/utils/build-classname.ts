import { twMerge } from 'tailwind-merge'

export const buildClassName = (...classes: any[]) => twMerge(classes.filter(Boolean))
