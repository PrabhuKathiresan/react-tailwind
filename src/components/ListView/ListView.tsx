import { useRef } from 'react'
import { useScrollRestoration } from '../../hooks/use-scroll-restoration'
import { buildClassName } from '../../utils/build-classname'
import { BodyText } from '../BodyText'
import { Button } from '../Button'
import { EmptyState } from '../EmptyState'
import { Loader } from '../Loader'
import type { ListViewLoadMore, ListViewProps } from './ListView.types'

/**
 * A phone list: loading, empty, or rows as one flat, divided surface running
 * edge to edge, with "Load more" at the end. Pair with ListRow. Wider screens
 * usually show a DataTable instead.
 */
export const ListView = <T,>({
  items,
  isLoading,
  emptyTitle,
  emptyDescription,
  renderItem,
  loadMore,
  bleed = true,
}: ListViewProps<T>) => {
  // A growing list is only worth coming back to where you left it.
  const listRef = useRef<HTMLDivElement>(null)
  useScrollRestoration(listRef, !isLoading && items.length > 0, Boolean(loadMore))

  return (
    <div ref={listRef} className="space-y-2">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : items.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div
          className={buildClassName(
            'divide-y divide-slate-200 border-y border-slate-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900',
            bleed && '-mx-4',
          )}
        >
          {items.map(renderItem)}
        </div>
      )}
      {loadMore && !isLoading && items.length > 0 && <LoadMoreFooter {...loadMore} />}
    </div>
  )
}

const LoadMoreFooter = ({
  shown,
  total,
  pageSize,
  hasMore,
  isLoadingMore,
  onLoadMore,
  noun,
}: ListViewLoadMore) => {
  const plural = (count: number) => `${noun}${count === 1 ? '' : 's'}`
  const next = Math.min(pageSize, Math.max(total - shown, 0))

  return (
    <div className="flex flex-col items-center gap-3 pt-4">
      {/* Announced, so screen reader users hear the new rows arrive. */}
      <BodyText small muted aria-live="polite">
        {hasMore ? `${shown} of ${total} ${plural(total)}` : 'End of list'}
      </BodyText>
      {hasMore && (
        <Button
          theme="secondary"
          variant="outlined"
          fullWidth
          loading={isLoadingMore}
          loadingText="Loading…"
          onClick={onLoadMore}
        >
          {next > 0 ? `Show ${next} more` : 'Show more'}
        </Button>
      )}
    </div>
  )
}

ListView.displayName = 'ListView'
