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
      description="Pagination allows users to navigate through a large dataset split into multiple pages."
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
