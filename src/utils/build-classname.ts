import { twMerge } from 'tailwind-merge'

const buildClassName = (...classes: any[]) => twMerge(classes.filter(Boolean))

export default buildClassName
