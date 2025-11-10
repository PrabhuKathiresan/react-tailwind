import React from 'react'
import { Button } from '../Button'
import { usePagination, DOTS } from './usePagination'
import { buildClassName } from '../../utils/build-classname'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import ChevronRightIcon from '../Icons/ChevronRight.svg'

export interface TPagination {
  /**
   * Defines current page number
   */
  page: number
  /**
   * Defines page limit
   */
  limit: number
  /**
   * Defines totol items in the list to be paginated.
   */
  total: number
}

export type PaginationProps = TPagination & {
  /**
   * Pagination component classname
   */
  className?: string
  /**
   * Handler for page change
   * @param pagination Partial<TPagination>
   * @returns void
   */
  onChange: (pagination: Partial<TPagination>) => void
  /**
   * Whether to show ellipsis for large page numbers
   * @default true
   */
  ellipsis?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  page: currentPage,
  limit,
  total,
  onChange,
  className,
  ellipsis = true, // Default to showing ellipsis
}) => {
  const pages = new Array(Math.ceil(total / limit)).fill(null).map((_, i) => i + 1)
  const isFirstPage = currentPage === 1
  const isLastPage = total === 0 || pages.length === currentPage

  const range = usePagination({ totalPages: pages.length, currentPage })

  const handlePageChange = (nextVal: number) => {
    if (nextVal === currentPage) return

    onChange({ page: nextVal })
  }

  if (ellipsis) {
    return (
      <div className={buildClassName('flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6', className)}>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            Showing
            <span className="font-medium">{total === 0 ? 0 : Math.max(currentPage * limit - limit + 1, 1)}</span>
            to
            <span className="font-medium">{Math.min(currentPage * limit, total)}</span>
            of
            <span className="font-medium">{total}</span>
            results
          </p>
          <ul className="flex items-center space-x-2 text-sm">
            <li>
              <Button size="xs" theme="secondary" variant="plain" disabled={isFirstPage} onClick={() => handlePageChange(currentPage - 1)}>
                Prev
              </Button>
            </li>
            {
              range.map((page, idx) => {
                if (page === DOTS) {
                  return (
                    <li key={page + idx} className="px-2 py-1 text-gray-400">
                      &hellip;
                    </li>
                  )
                }
                return (
                  <li key={page}>
                    <Button key={page} size="xs" theme={page === currentPage ? 'primary' : 'secondary'} variant={page === currentPage ? 'default' : 'plain'} aria-current={page === currentPage ? 'page' : undefined} onClick={() => handlePageChange(page as number)}>
                      {page}
                    </Button>
                  </li>
                )
              })
            }
            <li>
              <Button size="xs" theme="secondary" variant="plain" disabled={isLastPage} onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className={buildClassName('flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6', className)}>
      <div className="flex flex-1 justify-between sm:hidden">
        <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
        <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          Showing
          <span className="font-medium">{total === 0 ? 0 : Math.max(currentPage * limit - limit + 1, 1)}</span>
          to
          <span className="font-medium">{Math.min(currentPage * limit, total)}</span>
          of
          <span className="font-medium">{total}</span>
          results
        </p>
        <nav className="isolate inline-flex items-center rounded-md" aria-label="Pagination">
          <Button size="xs" theme="secondary" variant="plain" disabled={isFirstPage} onClick={() => handlePageChange(currentPage - 1)}>
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          {
            pages.map((page) => (
              <Button key={page} size="xs" theme={page === currentPage ? 'primary' : 'secondary'} variant={page === currentPage ? 'default' : 'plain'} aria-current={page === currentPage ? 'page' : undefined} onClick={() => handlePageChange(page)}>
                <span className="size-4 block">{page}</span>
              </Button>
            ))
          }
          <Button size="xs" theme="secondary" variant="plain" disabled={isLastPage} onClick={() => handlePageChange(currentPage + 1)}>
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="size-4" />
          </Button>
        </nav>
      </div>
    </div>
  )
}
