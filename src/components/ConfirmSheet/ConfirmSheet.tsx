import { BodyText } from '../BodyText'
import { Button } from '../Button'
import { Drawer } from '../Drawer'
import type { ConfirmSheetProps } from './ConfirmSheet.types'

/**
 * Asks before an action that's hard to undo: a bottom sheet on phones, in
 * thumb reach, with the buttons stacked full width; a centred dialog from
 * 768px. Use it instead of the browser's `confirm()`.
 */
export const ConfirmSheet = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  danger = false,
  isPending = false,
  secondaryAction,
  onConfirm,
  onCancel,
}: ConfirmSheetProps) => (
  <Drawer
    isOpen={isOpen}
    onClose={onCancel}
    align={{ base: 'bottom', md: 'center' }}
    size={{ base: 'full', md: 'sm' }}
    title={title}
    closeOnOutsideClick={!isPending}
    footer={
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outlined" theme="secondary" onClick={onCancel} disabled={isPending}>
          {cancelLabel}
        </Button>
        {secondaryAction && (
          <Button
            variant="outlined"
            theme="secondary"
            onClick={secondaryAction.onClick}
            disabled={isPending}
          >
            {secondaryAction.label}
          </Button>
        )}
        <Button theme={danger ? 'danger' : 'primary'} onClick={onConfirm} disabled={isPending}>
          {confirmLabel}
        </Button>
      </div>
    }
  >
    <BodyText small className="text-slate-600 dark:text-slate-300">
      {description}
    </BodyText>
  </Drawer>
)

ConfirmSheet.displayName = 'ConfirmSheet'
