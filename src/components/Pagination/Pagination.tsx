import React from 'react'
import { Button } from '../Button'
import { usePagination, DOTS } from './usePagination'
import { buildClassName } from '../../utils/build-classname'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import ChevronRightIcon from '../Icons/ChevronRight.svg'
import type { PaginationProps } from './Pagination.types'

export const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    className,
    ellipsis = true,
    onChange,
    isMobile,
    showSummary = true,
    showPageNumbers = true,
  } = props

  const currentPage =
    (props as any).page ?? (props as any).current ?? (props as any).currentPage ?? 1
  const limit = (props as any).limit ?? (props as any).pageSize ?? 10
  const total = props.total ?? 0

  const totalPages = Math.max(1, Math.ceil(total / limit))
  const isFirstPage = currentPage <= 1
  const isLastPage = total === 0 || currentPage >= totalPages

  const range = usePagination({ totalPages, currentPage })

  const handlePageChange = (nextVal: number) => {
    if (nextVal === currentPage || nextVal < 1 || nextVal > totalPages) return

    onChange({ page: nextVal })
  }

  const startResult = total === 0 ? 0 : Math.max((currentPage - 1) * limit + 1, 1)
  const endResult = Math.min(currentPage * limit, total)

  // Explicit Mobile UX (when isMobile=true)
  if (isMobile) {
    return (
      <div
        data-testid="pagination-container"
        className={buildClassName(
          'flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-xl border border-[var(--ui-border-muted)] w-full',
          className,
        )}
      >
        <Button
          size="xs"
          theme="secondary"
          variant="plain"
          disabled={isFirstPage}
          onClick={() => handlePageChange(currentPage - 1)}
          data-testid={ellipsis ? 'ellipsis-mobile-prev-btn' : 'mobile-prev-btn'}
          className="flex items-center gap-1 font-medium"
        >
          <ChevronLeftIcon className="size-4" />
          <span>Previous</span>
        </Button>
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="xs"
          theme="secondary"
          variant="plain"
          disabled={isLastPage}
          onClick={() => handlePageChange(currentPage + 1)}
          data-testid={ellipsis ? 'ellipsis-mobile-next-btn' : 'mobile-next-btn'}
          className="flex items-center gap-1 font-medium"
        >
          <span>Next</span>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    )
  }

  // Standard Responsive View
  return (
    <div
      data-testid="pagination-container"
      className={buildClassName(
        'flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-xl border border-[var(--ui-border-muted)] w-full',
        className,
      )}
    >
      {/* Mobile Layout (< 640px) */}
      <div className="flex flex-1 items-center justify-between sm:hidden">
        <Button
          size="xs"
          theme="secondary"
          variant="plain"
          disabled={isFirstPage}
          onClick={() => handlePageChange(currentPage - 1)}
          data-testid={ellipsis ? 'ellipsis-mobile-prev-btn' : 'mobile-prev-btn'}
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="size-4" />
          <span>Previous</span>
        </Button>
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="xs"
          theme="secondary"
          variant="plain"
          disabled={isLastPage}
          onClick={() => handlePageChange(currentPage + 1)}
          data-testid={ellipsis ? 'ellipsis-mobile-next-btn' : 'mobile-next-btn'}
          className="flex items-center gap-1"
        >
          <span>Next</span>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>

      {/* Desktop / Tablet Layout (>= 640px) */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {showSummary && (
          <p
            data-testid="pagination-summary"
            className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1"
          >
            Showing
            <span className="font-medium">{startResult}</span>
            to
            <span className="font-medium">{endResult}</span>
            of
            <span className="font-medium">{total}</span>
            results
          </p>
        )}

        {showPageNumbers && (
          <ul className="flex items-center space-x-2 text-sm">
            <li>
              <Button
                size="xs"
                theme="secondary"
                variant="plain"
                disabled={isFirstPage}
                onClick={() => handlePageChange(currentPage - 1)}
                data-testid={ellipsis ? 'ellipsis-prev-btn' : 'prev-btn'}
              >
                {ellipsis ? 'Prev' : 'Previous'}
              </Button>
            </li>
            {ellipsis
              ? range.map((pageItem, idx) => {
                  if (pageItem === DOTS) {
                    return (
                      <li
                        key={`${pageItem}-${idx}`}
                        data-testid={`page-${pageItem}`}
                        className="px-2 py-1 text-gray-400"
                      >
                        &hellip;
                      </li>
                    )
                  }
                  const pageNum = Number(pageItem)
                  return (
                    <li key={`${pageItem}-${idx}`}>
                      <Button
                        size="xs"
                        theme={pageNum === currentPage ? 'primary' : 'secondary'}
                        variant={pageNum === currentPage ? 'default' : 'plain'}
                        aria-current={pageNum === currentPage ? 'page' : undefined}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    </li>
                  )
                })
              : Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <li key={pageNum}>
                    <Button
                      size="xs"
                      theme={pageNum === currentPage ? 'primary' : 'secondary'}
                      variant={pageNum === currentPage ? 'default' : 'plain'}
                      aria-current={pageNum === currentPage ? 'page' : undefined}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      <span className="size-4 block">{pageNum}</span>
                    </Button>
                  </li>
                ))}
            <li>
              <Button
                size="xs"
                theme="secondary"
                variant="plain"
                disabled={isLastPage}
                onClick={() => handlePageChange(currentPage + 1)}
                data-testid={ellipsis ? 'ellipsis-next-btn' : 'next-btn'}
              >
                {ellipsis ? 'Next' : 'Next'}
              </Button>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

Pagination.displayName = 'Pagination'
