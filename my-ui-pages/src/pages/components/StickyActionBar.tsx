import { Button, StickyActionBar } from '@pk-design/react-tailwind'
import { SaveIcon } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function StickyActionBarDocsPage() {
  const examples = [
    {
      title: 'Basic Fixed Action Bar',
      description:
        'Fixed bottom action bar providing a summary view on the left and action buttons on the right.',
      render: (
        <div className="relative h-80 overflow-y-auto border border-gray-200/80 dark:border-gray-700/80 rounded-xl bg-gray-50/60 dark:bg-gray-800/30 p-4 space-y-4">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Scroll down inside this box to test sticky behavior ↓
          </div>
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            New Invoice Form
          </div>
          <div className="space-y-2">
            {[
              { id: 1, name: 'UI & Systems Design', price: '$1,200.00' },
              { id: 2, name: 'Frontend Architecture & Setup', price: '$2,400.00' },
              { id: 3, name: 'Accessibility (a11y) Audit', price: '$850.00' },
              { id: 4, name: 'Performance Optimization', price: '$1,100.00' },
              { id: 5, name: 'Component Library Construction', price: '$3,000.00' },
              { id: 6, name: 'Interactive Documentation Site', price: '$1,500.00' },
              { id: 7, name: 'Design Tokens & Theme Setup', price: '$950.00' },
              { id: 8, name: 'CI/CD Automated Deployment', price: '$600.00' },
            ].map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between text-xs sm:text-sm"
              >
                <span className="font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 pt-2">
            Form notes & terms: All invoices are due Net 30 days from date of issue.
          </p>
          <StickyActionBar
            position="sticky"
            summaryContent={
              <div>
                <div className="text-xs font-medium text-gray-500">8 items selected</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">$11,600.00</div>
              </div>
            }
            actionsContent={
              <>
                <Button theme="secondary" variant="outlined" size="sm">
                  Save Draft
                </Button>
                <Button theme="primary" size="sm">
                  <SaveIcon className="size-4 mr-1.5" /> Save Invoice
                </Button>
              </>
            }
          />
        </div>
      ),
      code: `
<StickyActionBar
  position="sticky"
  summaryContent={
    <div>
      <div className="text-xs font-medium text-gray-500">8 items selected</div>
      <div className="text-lg font-bold text-blue-600">$11,600.00</div>
    </div>
  }
  actionsContent={
    <>
      <Button theme="secondary" variant="outlined" size="sm">Save Draft</Button>
      <Button theme="primary" size="sm"><SaveIcon className="size-4 mr-1.5" /> Save Invoice</Button>
    </>
  }
/>`,
    },
    {
      title: 'Expandable Summary Drawer',
      description:
        'Pass `drawerContent` to allow users to click the left summary trigger to expand a detailed bottom drawer breakdown.',
      render: (
        <div className="relative h-80 overflow-y-auto border border-gray-200/80 dark:border-gray-700/80 rounded-xl bg-gray-50/60 dark:bg-gray-800/30 p-4 space-y-4">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Scroll down inside this box to test sticky behavior ↓
          </div>
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Checkout Items List
          </div>
          <div className="space-y-2">
            {[
              { id: 1, name: 'Enterprise Design System License', price: '$8,000.00' },
              { id: 2, name: 'Multi-Tenant Support Package', price: '$2,500.00' },
              { id: 3, name: 'Priority Support (12 Months)', price: '$1,800.00' },
              { id: 4, name: 'Custom Brand Theme Token Setup', price: '$1,200.00' },
              { id: 5, name: 'WCAG 2.1 AA Accessibility Package', price: '$950.00' },
            ].map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between text-xs sm:text-sm"
              >
                <span className="font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{item.price}</span>
              </div>
            ))}
          </div>
          <StickyActionBar
            position="sticky"
            summaryContent={
              <div>
                <div className="text-xs font-medium text-gray-500">View Breakdown (Click)</div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  $14,450.00 Total
                </div>
              </div>
            }
            drawerTitle="Order Summary Breakdown"
            drawerContent={
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>$14,450.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-2">
                  <span>Total Due</span>
                  <span>$14,450.00</span>
                </div>
              </div>
            }
            actionsContent={<Button theme="primary">Confirm Order</Button>}
          />
        </div>
      ),
      code: `
<StickyActionBar
  summaryContent={<div>Total: $14,450.00</div>}
  drawerTitle="Order Summary Breakdown"
  drawerContent={<BreakdownContent />}
  actionsContent={<Button theme="primary">Confirm Order</Button>}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="StickyActionBar"
      description="Docked bottom action bar container for long forms, multi-step checkout processes, and batch record operations. Supports summary slots, expandable detail drawers, and custom action button stacks."
      playground={{
        render: (props) => (
          <div className="relative h-80 overflow-y-auto border border-gray-200/80 dark:border-gray-700/80 rounded-xl bg-gray-50/60 dark:bg-gray-800/30 p-4 space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Scroll down inside this box to test sticky behavior ↓
            </div>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200/60 dark:border-gray-700/60 text-xs sm:text-sm text-gray-700 dark:text-gray-200"
              >
                Line Item Row #{idx} — Sample description text
              </div>
            ))}
            <StickyActionBar
              {...props}
              summaryContent={
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Total: $99.00
                </span>
              }
              actionsContent={
                <Button theme="primary" size="sm">
                  Submit
                </Button>
              }
            />
          </div>
        ),
        initialProps: { position: 'sticky', drawerTitle: 'Summary Details' },
      }}
      examples={examples}
    />
  )
}
