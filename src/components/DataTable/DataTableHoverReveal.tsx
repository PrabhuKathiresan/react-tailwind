import type { ReactNode } from 'react'
import { buildClassName } from '../../utils/build-classname'

export interface DataTableHoverRevealProps {
  children: ReactNode
  className?: string
}

/**
 * Content in a DataTable cell that shows while its row is hovered or holds keyboard focus,
 * on devices that can hover. Touch screens, which can't, always show it. Use it for row
 * actions that would otherwise repeat down every row; keep one control (a ⋮ menu, say)
 * outside it so each row still shows it has actions. It keeps its space while hidden, so
 * columns don't shift.
 */
export function DataTableHoverReveal({ children, className }: DataTableHoverRevealProps) {
  return (
    <span
      data-hover-reveal=""
      className={buildClassName(
        'inline-flex items-center gap-1 transition-opacity duration-150',
        '[@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
        className,
      )}
    >
      {children}
    </span>
  )
}
