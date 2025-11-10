import React, { type ReactNode } from 'react'
import FolderPlusIcon from '../Icons/FolderPlus.svg'
import { HeadingText } from '../HeadingText'
import { BodyText } from '../BodyText'
import { buildClassName } from '../../utils/build-classname'

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, className, action = null }) => {
  return (
    <div className={buildClassName('w-full flex justify-center px-4 pt-16', className)}>
      <div className="max-w-md flex flex-col items-center gap-4">
        <FolderPlusIcon className="size-8" />
        <HeadingText.SubTitle>{title}</HeadingText.SubTitle>
        {description && <BodyText as="p" className="text-center" muted small>{description}</BodyText>}
        {action}
      </div>
    </div>
  )
}
