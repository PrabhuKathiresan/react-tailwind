import { useState } from 'react'
import { Pagination, type PaginationProps } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const PaginationDocsPage = () => {
  const [page, setPage] = useState(1)

  const handleChange: PaginationProps['onChange'] = (pagination) => {
    if (pagination.page) setPage(pagination.page)
  }

  return (
    <DocsPageLayout
      component="Pagination"
      description="Navigation controls for stepping through paged data. Renders previous and next buttons alongside a configurable page window that shrinks gracefully on small screens. Emits a page-change event so your data layer stays in sync without any internal state management."
      playground={{
        render: (props) => (
          <Pagination
            page={props.page ?? 1}
            limit={props.limit ?? 10}
            total={props.total ?? 100}
            ellipsis={props.ellipsis ?? true}
            onChange={() => {}}
          />
        ),
        initialProps: { page: 1, limit: 10, total: 100, ellipsis: true },
      }}
      examples={[
        {
          title: 'Default Pagination',
          description: 'A simple pagination component with ellipsis enabled by default.',
          code: `
<Pagination 
  page={${page}} 
  limit={10} 
  total={100} 
  onChange={handleChange} 
/>`,
          render: <Pagination page={page} limit={10} total={100} onChange={handleChange} />,
        },
        {
          title: 'Pagination Without Ellipsis',
          description: 'Hide ellipsis for smaller datasets or simpler pagination.',
          code: `
<Pagination 
  page={1} 
  limit={5} 
  total={25} 
  ellipsis={false} 
  onChange={() => {}} 
/>`,
          render: <Pagination page={1} limit={5} total={25} ellipsis={false} onChange={() => {}} />,
        },
      ]}
    />
  )
}

export default PaginationDocsPage
