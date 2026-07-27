import { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { HeadingText } from '../HeadingText'
import { DetailedInformationProps } from './DetailedInformation.types'

export const DetailedInformation = forwardRef<HTMLDivElement, DetailedInformationProps>(
  (props, ref) => {
    const {
      className,
      title,
      subTitle,
      details,
      compact = false,
      divider = true,
      titleClass,
      detailsClass,
      bordered = false,
      ...divProps
    } = props

    const hasTitles = title || subTitle
    const filteredDetails = details.filter((detail) => !detail.hidden)
    return (
      <div
        className={buildClassName(
          'p-2 md:p-4',
          compact ? 'md:p-2' : '',
          bordered ? 'border border-[var(--ui-border)]' : '',
          className,
        )}
        ref={ref}
        {...divProps}
      >
        {hasTitles && (
          <div className="px-4 sm:px-0 pt-2 sm:pt-0 mb-2">
            {title && (
              <HeadingText.SubTitle2 className={buildClassName(titleClass)}>
                {title}
              </HeadingText.SubTitle2>
            )}
            {subTitle && (
              <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-300">
                {subTitle}
              </p>
            )}
          </div>
        )}
        {filteredDetails.length ? (
          <div
            className={buildClassName(
              'border-[var(--ui-border-muted)]',
              hasTitles && 'border-t',
              detailsClass,
            )}
          >
            <dl className={buildClassName(divider && 'divide-y divide-[var(--ui-border-muted)]')}>
              {filteredDetails.map((detail) => (
                <div
                  key={detail.label}
                  className={buildClassName(
                    'px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center',
                    compact ? 'py-1.5' : 'py-2.5',
                  )}
                >
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    {detail.label}
                  </dt>
                  <dd
                    className={buildClassName(
                      'mt-1 text-sm/6 text-gray-700 dark:text-gray-300 sm:col-span-2 sm:mt-0',
                      detail.contentClass,
                    )}
                  >
                    {detail.value || '- -'}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    )
  },
)

DetailedInformation.displayName = 'DetailedInformation'
