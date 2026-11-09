import { ListRow, StatusPill } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const Surface = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-sm divide-y divide-slate-200 border-y border-slate-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
    {children}
  </div>
)

export default function ListRowDocsPage() {
  const examples = [
    {
      title: 'A record with its own page',
      description:
        'With `href`, the whole content is one link, so keyboard, screen readers and "open in new tab" work. Pass `renderLink` to use a router Link.',
      render: (
        <Surface>
          <ListRow
            href="#invoice-0057"
            title="INV-0057"
            titleAdornment={<StatusPill theme="warning">Due</StatusPill>}
            meta="Sharma Traders · 19 Oct"
            trailing="₹1,200.00"
            trailingMeta="Due ₹400.00"
          />
          <ListRow
            href="#invoice-0056"
            title="INV-0056"
            meta="Gupta Stores · 18 Oct"
            trailing="₹8,450.00"
          />
        </Surface>
      ),
      code: `
<ListRow
  href={\`/invoices/\${invoice.id}\`}
  renderLink={({ href, ...props }) => <Link to={href} {...props} />}
  title="INV-0057"
  titleAdornment={<StatusPill theme="warning">Due</StatusPill>}
  meta="Sharma Traders · 19 Oct"
  trailing="₹1,200.00"
  trailingMeta="Due ₹400.00"
/>`,
    },
    {
      title: 'Opens in place, with actions beside it',
      description:
        'With `onOpen` the content is one button. `actions` (e.g. a ⋮ button) sit beside the content, never inside it.',
      render: (
        <Surface>
          <ListRow
            onOpen={() => {}}
            title="Sharma Traders"
            meta="33ABCDE1234F1Z5 · Chennai"
            trailing="₹12,000.00"
            actions={
              <button
                type="button"
                className="px-3 text-xl"
                aria-label="Actions for Sharma Traders"
              >
                ⋮
              </button>
            }
          />
        </Surface>
      ),
      code: `
<ListRow
  onOpen={() => editVendor(vendor)}
  title={vendor.name}
  meta="33ABCDE1234F1Z5 · Chennai"
  trailing="₹12,000.00"
  actions={<Button iconOnly aria-label={\`Actions for \${vendor.name}\`} onClick={openActions}>⋮</Button>}
/>`,
    },
    {
      title: 'Settings rows and muted records',
      description:
        '`disclosure` adds a chevron for a row that opens a setting. `muted` dims a record that no longer counts and strikes its amount; say why in `titleAdornment` too.',
      render: (
        <Surface>
          <ListRow onOpen={() => {}} disclosure title="Invoices" trailing="INV-0301" />
          <ListRow
            href="#void"
            muted
            title="INV-0042"
            titleAdornment={<StatusPill theme="secondary">Void</StatusPill>}
            meta="Rao & Sons · 2 Oct"
            trailing="₹950.00"
          />
        </Surface>
      ),
      code: `
<ListRow onOpen={openNumbering} disclosure title="Invoices" trailing="INV-0301" />
<ListRow href="/invoices/42" muted title="INV-0042" titleAdornment={<StatusPill>Void</StatusPill>} trailing="₹950.00" />`,
    },
    {
      title: 'Selection mode',
      description:
        'With `selection`, a checkbox leads the row and tapping the row toggles it instead of opening the record.',
      render: (
        <Surface>
          <ListRow
            href="#a"
            title="INV-0057"
            trailing="₹1,200.00"
            selection={{ selected: true, onToggle: () => {}, label: 'Select invoice 0057' }}
          />
          <ListRow
            href="#b"
            title="INV-0056"
            trailing="₹8,450.00"
            selection={{ selected: false, onToggle: () => {}, label: 'Select invoice 0056' }}
          />
        </Surface>
      ),
      code: `
<ListRow title="INV-0057" trailing="₹1,200.00" selection={{ selected, onToggle, label: 'Select invoice 0057' }} />`,
    },
  ]

  return (
    <DocsPageLayout
      component="ListRow"
      description="One record in a phone list: a divided row rather than a card, with two lines that each have their own right side. Use it inside ListView or SettingsGroup."
      examples={examples}
    />
  )
}
