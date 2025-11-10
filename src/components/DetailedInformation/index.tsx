import React, { type ReactNode, type JSX, type JSXElementConstructor } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { HeadingText } from '../HeadingText';

export type Detail = {
  /**
   * Label of the information to be displayed
   */
  label: string;
  /**
   * Information to be displayed
   */
  value?: ReactNode;
  /**
   * Classname of the value content sections
   */
  contentClass?: string;
  /**
   * Defines if the items should be hidden.
   */
  hidden?: boolean;
}

export interface DetailedInformationProps {
  className?: string;
  /**
   * Title for the information section
   */
  title?: ReactNode;
  /**
   * Subtitle for the information section
   */
  subTitle?: ReactNode;
  /**
   * List of details / information to be displayed
   */
  details: Detail[];
  /**
   * Defines if the layout should be compact
   */
  compact?: boolean;
  /**
   * Defines if the section should have borders
   */
  bordered?: boolean;
  /**
   * Defines if each item in section should have divider
   */
  divider?: boolean;
  /**
   * Classname for title element
   */
  titleClass?: string;
  /**
   * Classname for details section
   */
  detailsClass?: string;
  /**
   * JSX element to be rendered as.
   */
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
  /**
   * When rendering as Link, use `to` prop for navigation
   */
  to?: string;
}

export const DetailedInformation: React.FC<DetailedInformationProps> = ({
  className,
  title,
  subTitle,
  details,
  compact = false,
  divider = true,
  titleClass,
  detailsClass,
}) => {
  const hasTitles = title || subTitle
  const filteredDetails = details.filter((detail) => !detail.hidden)
  return (
    <div className={buildClassName('p-2 md:p-4', compact ? 'md:p-2' : '', className)}>
      {
        hasTitles && (
          <div className="px-4 sm:px-0 pt-2 sm:pt-0 mb-2">
            {title && <HeadingText.SubTitle2 className={buildClassName(titleClass)}>{title}</HeadingText.SubTitle2>}
            {subTitle && <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-300">{subTitle}</p>}
          </div>
        )
      }
      {
        filteredDetails.length ? (
          <div className={buildClassName('border-gray-100 dark:border-gray-700', hasTitles && 'border-t', detailsClass)}>
            <dl className={buildClassName(divider && 'divide-y divide-gray-100 dark:divide-gray-700')}>
              {
                filteredDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className={buildClassName(
                      'px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center',
                      compact ? 'py-1.5' : 'py-2.5'
                    )}
                  >
                    <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">{detail.label}</dt>
                    <dd className={buildClassName('mt-1 text-sm/6 text-gray-700 dark:text-gray-300 sm:col-span-2 sm:mt-0', detail.contentClass)}>{detail.value || '- -'}</dd>
                  </div>
                ))
              }
            </dl>
          </div>
        ) : null
      }
    </div>
  )
}
