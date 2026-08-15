import { Skeleton } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function SkeletonDocsPage() {
  const examples = [
    {
      title: 'Shapes & Variants',
      description: 'Supports `text`, `circular`, `rectangular`, and `rounded` placeholder shapes.',
      render: (
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="50%" />
            </div>
          </div>
          <Skeleton variant="rounded" height={120} />
        </div>
      ),
      code: `
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="50%" />
<Skeleton variant="rounded" height={120} />`,
    },
    {
      title: 'Animations',
      description: 'Choose between `pulse` (default), `wave` (shimmer), or `none`.',
      render: (
        <div className="space-y-4 max-w-md">
          <div>
            <div className="text-xs text-gray-500 mb-1">Pulse Animation (Default)</div>
            <Skeleton animation="pulse" height={32} />
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Wave Shimmer Animation</div>
            <Skeleton animation="wave" height={32} />
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Static Placeholder (None)</div>
            <Skeleton animation="none" height={32} />
          </div>
        </div>
      ),
      code: `
<Skeleton animation="pulse" height={32} />
<Skeleton animation="wave" height={32} />
<Skeleton animation="none" height={32} />`,
    },
    {
      title: 'Card Placeholder Pattern',
      description: 'Compose multiple skeletons to match the exact shape of content while loading.',
      render: (
        <div className="p-4 border border-gray-200/80 dark:border-gray-700/80 rounded-xl space-y-3 max-w-sm bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1 space-y-1.5">
              <Skeleton variant="text" height={16} width="60%" />
              <Skeleton variant="text" height={12} width="40%" />
            </div>
          </div>
          <Skeleton variant="rounded" height={80} />
          <div className="flex gap-2 justify-end">
            <Skeleton variant="rounded" width={60} height={28} />
            <Skeleton variant="rounded" width={80} height={28} />
          </div>
        </div>
      ),
      code: `
<div className="p-4 border rounded-xl space-y-3">
  <div className="flex items-center gap-3">
    <Skeleton variant="circular" width={40} height={40} />
    <div className="flex-1 space-y-1.5">
      <Skeleton variant="text" height={16} width="60%" />
      <Skeleton variant="text" height={12} width="40%" />
    </div>
  </div>
  <Skeleton variant="rounded" height={80} />
</div>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Skeleton"
      description="Placeholder element rendered while content is loading. Prevents layout shift (CLS) by visually matching the dimensions of incoming content."
      playground={{
        render: (props) => <Skeleton {...props} height={40} width={200} />,
        initialProps: { variant: 'rounded', animation: 'pulse' },
      }}
      examples={examples}
    />
  )
}
