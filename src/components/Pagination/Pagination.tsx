import React from 'react'
import { Button } from '../Button'
import { usePagination, DOTS } from './usePagination'
import { buildClassName } from '../../utils/build-classname'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import ChevronRightIcon from '../Icons/ChevronRight.svg'
import type { PaginationProps } from './Pagination.types'

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
      <div
        data-testid="pagination-container"
        className={buildClassName(
          'flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6',
          className,
        )}
      >
        <div className="flex flex-1 justify-between sm:hidden">
          <Button
            size="xs"
            theme="secondary"
            variant="plain"
            disabled={isFirstPage}
            onClick={() => handlePageChange(currentPage - 1)}
            data-testid="ellipsis-mobile-prev-btn"
          >
            <span>Previous</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            size="xs"
            theme="secondary"
            variant="plain"
            disabled={isLastPage}
            onClick={() => handlePageChange(currentPage + 1)}
            data-testid="ellipsis-mobile-next-btn"
          >
            <span>Next</span>
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p
            data-testid="pagination-summary"
            className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1"
          >
            Showing
            <span className="font-medium">
              {total === 0 ? 0 : Math.max(currentPage * limit - limit + 1, 1)}
            </span>
            to
            <span className="font-medium">{Math.min(currentPage * limit, total)}</span>
            of
            <span className="font-medium">{total}</span>
            results
          </p>
          <ul className="flex items-center space-x-2 text-sm">
            <li>
              <Button
                size="xs"
                theme="secondary"
                variant="plain"
                disabled={isFirstPage}
                onClick={() => handlePageChange(currentPage - 1)}
                data-testid="ellipsis-prev-btn"
              >
                Prev
              </Button>
            </li>
            {range.map((page, idx) => {
              if (page === DOTS) {
                return (
                  <li
                    key={`${page}-${idx}`}
                    data-testid={`page-${page}`}
                    className="px-2 py-1 text-gray-400"
                  >
                    &hellip;
                  </li>
                )
              }
              return (
                <li key={`${page}-${idx}`}>
                  <Button
                    size="xs"
                    theme={page === currentPage ? 'primary' : 'secondary'}
                    variant={page === currentPage ? 'default' : 'plain'}
                    aria-current={page === currentPage ? 'page' : undefined}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </Button>
                </li>
              )
            })}
            <li>
              <Button
                size="xs"
                theme="secondary"
                variant="plain"
                disabled={isLastPage}
                onClick={() => handlePageChange(currentPage + 1)}
                data-testid="ellipsis-next-btn"
              >
                Next
              </Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div
      data-testid="pagination-container"
      className={buildClassName(
        'flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 sm:px-6',
        className,
      )}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          size="xs"
          theme="secondary"
          variant="plain"
          disabled={isFirstPage}
          onClick={() => handlePageChange(currentPage - 1)}
          data-testid="mobile-prev-btn"
        >
          <span>Previous</span>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          size="xs"
          theme="secondary"
          variant="plain"
          disabled={isLastPage}
          onClick={() => handlePageChange(currentPage + 1)}
          data-testid="mobile-next-btn"
        >
          <span>Next</span>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p
          data-testid="pagination-summary"
          className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1"
        >
          Showing
          <span className="font-medium">
            {total === 0 ? 0 : Math.max(currentPage * limit - limit + 1, 1)}
          </span>
          to
          <span className="font-medium">{Math.min(currentPage * limit, total)}</span>
          of
          <span className="font-medium">{total}</span>
          results
        </p>
        <nav className="isolate inline-flex items-center rounded-md" aria-label="Pagination">
          <Button
            size="xs"
            theme="secondary"
            variant="plain"
            disabled={isFirstPage}
            onClick={() => handlePageChange(currentPage - 1)}
            data-testid="prev-btn"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              size="xs"
              theme={page === currentPage ? 'primary' : 'secondary'}
              variant={page === currentPage ? 'default' : 'plain'}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => handlePageChange(page)}
            >
              <span className="size-4 block">{page}</span>
            </Button>
          ))}
          <Button
            size="xs"
            theme="secondary"
            variant="plain"
            disabled={isLastPage}
            onClick={() => handlePageChange(currentPage + 1)}
            data-testid="next-btn"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="size-4" />
          </Button>
        </nav>
      </div>
    </div>
  )
}
