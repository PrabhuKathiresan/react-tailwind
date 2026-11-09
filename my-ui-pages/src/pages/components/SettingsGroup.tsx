import { Checkbox, ListRow, SettingsGroup } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function SettingsGroupDocsPage() {
  const examples = [
    {
      title: 'A phone settings page',
      description:
        'A heading per group in the page gutter, then its rows edge to edge. Rows that open a form show their current value and a chevron; a control sits in a padded row.',
      render: (
        <div className="max-w-sm space-y-6 px-4">
          <SettingsGroup title="Numbering" description="The next number each document gets.">
            <ListRow onOpen={() => {}} disclosure title="Invoices" trailing="INV-0301" />
            <ListRow onOpen={() => {}} disclosure title="Credit notes" trailing="CN-0011" />
          </SettingsGroup>
          <SettingsGroup title="Stock">
            <div className="px-4 py-3.5">
              <Checkbox id="beyond-stock" label="Allow invoicing beyond available stock" />
            </div>
          </SettingsGroup>
        </div>
      ),
      code: `
<SettingsGroup title="Numbering" description="The next number each document gets.">
  <ListRow onOpen={() => edit('invoice')} disclosure title="Invoices" trailing="INV-0301" />
  <ListRow onOpen={() => edit('credit_note')} disclosure title="Credit notes" trailing="CN-0011" />
</SettingsGroup>
<SettingsGroup title="Stock">
  <div className="px-4 py-3.5">
    <Checkbox id="beyond-stock" label="Allow invoicing beyond available stock" />
  </div>
</SettingsGroup>`,
    },
  ]

  return (
    <DocsPageLayout
      component="SettingsGroup"
      description="One group of a phone settings page: grouped, divided rows rather than a card per group. Use ListRow with disclosure for rows that open a form."
      examples={examples}
    />
  )
}
