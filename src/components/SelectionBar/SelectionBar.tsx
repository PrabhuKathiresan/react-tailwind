import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'
import type { SelectionBarProps } from './SelectionBar.types'

/**
 * Bulk actions on phones while a list is selecting: it takes the bottom
 * bar's place with a labelled button per action, within thumb reach. Hidden
 * from 768px, where the page shows its own bulk actions.
 */
export const SelectionBar = ({ count, actions, className }: SelectionBarProps) => (
  <div
    role="toolbar"
    aria-label={`Actions for ${count} selected`}
    // Equal columns, one per action, so every action fits whatever its label.
    style={{ gridTemplateColumns: `repeat(${actions.length}, minmax(0, 1fr))` }}
    className={buildClassName(
      'fixed inset-x-0 bottom-0 z-[11] grid content-start gap-2 rounded-t-2xl border-x border-t border-slate-200 bg-white px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-3 md:hidden dark:border-gray-800 dark:bg-gray-900',
      className,
    )}
  >
    {actions.map((action) => (
      <Button
        key={action.id}
        theme={action.danger ? 'danger' : 'secondary'}
        variant="outlined"
        fullWidth
        disabled={action.disabled || count === 0}
        onClick={action.onClick}
      >
        {action.icon}
        {action.label}
      </Button>
    ))}
  </div>
)

SelectionBar.displayName = 'SelectionBar'
