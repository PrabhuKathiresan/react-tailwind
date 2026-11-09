import { buildClassName } from '../../utils/build-classname'
import { BodyText } from '../BodyText'
import { HeadingText } from '../HeadingText'
import type { SettingsGroupProps } from './SettingsGroup.types'

/**
 * One group of a phone settings page: a heading in the page gutter, then its
 * rows as one flat, divided surface running edge to edge, rather than a card
 * per group.
 */
export const SettingsGroup = ({
  title,
  description,
  children,
  bleed = true,
}: SettingsGroupProps) => (
  <section>
    <HeadingText.SubTitle2 className="text-base">{title}</HeadingText.SubTitle2>
    {description && (
      <BodyText small muted className="mt-0.5">
        {description}
      </BodyText>
    )}
    <div
      className={buildClassName(
        'mt-2 divide-y divide-slate-200 border-y border-slate-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900',
        bleed && '-mx-4',
      )}
    >
      {children}
    </div>
  </section>
)

SettingsGroup.displayName = 'SettingsGroup'
