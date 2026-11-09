import { useState } from 'react'
import { ListRow, ListView } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const ALL = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  name: `Customer ${index + 1}`,
  due: (index + 1) * 450,
}))

export default function ListViewDocsPage() {
  const [shown, setShown] = useState(5)

  const examples = [
    {
      title: 'Rows with Load more',
      description:
        'The next page goes under the rows already shown, with "5 of 12 customers" and a button, then "End of list". With `loadMore`, the scroll position is restored when the user comes back.',
      render: (
        <div className="max-w-sm px-4">
          <ListView
            items={ALL.slice(0, shown)}
            isLoading={false}
            emptyTitle="No customers yet"
            renderItem={(customer) => (
              <ListRow
                key={customer.id}
                href={`#${customer.id}`}
                title={customer.name}
                trailing={`₹${customer.due}`}
              />
            )}
            loadMore={{
              shown,
              total: ALL.length,
              pageSize: 5,
              hasMore: shown < ALL.length,
              isLoadingMore: false,
              onLoadMore: () => setShown((n) => n + 5),
              noun: 'customer',
            }}
          />
        </div>
      ),
      code: `
<ListView
  items={customers}
  isLoading={query.isLoading}
  emptyTitle={search ? 'No customers found' : 'No customers yet'}
  emptyDescription="Add a customer to invoice them."
  renderItem={(customer) => <ListRow key={customer.id} href={...} title={customer.name} />}
  loadMore={{ shown: customers.length, total, pageSize: 25, hasMore, isLoadingMore, onLoadMore: fetchNextPage, noun: 'customer' }}
/>`,
    },
    {
      title: 'Empty',
      description: 'Say whether there is nothing yet or nothing matches, and what to do about it.',
      render: (
        <div className="max-w-sm px-4">
          <ListView
            items={[]}
            isLoading={false}
            emptyTitle="No customers yet"
            emptyDescription="Add a customer to invoice them."
            renderItem={() => <span />}
          />
        </div>
      ),
      code: `<ListView items={[]} isLoading={false} emptyTitle="No customers yet" emptyDescription="Add a customer to invoice them." renderItem={...} />`,
    },
  ]

  return (
    <DocsPageLayout
      component="ListView"
      description="A phone list: loading, empty, or rows as one flat divided surface running edge to edge, with Load more at the end. Pair it with ListRow; wider screens usually show a DataTable."
      examples={examples}
    />
  )
}
