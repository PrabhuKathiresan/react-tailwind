import { DetailedInformation } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function DetailedInformationDocsPage() {
  return (
    <DocsPageLayout
      component="DetailedInformation"
      description="A structured key-value display for detail views, profile pages, and summary panels. Each row pairs a label with its value, and the component optionally adds a section title, dividers between rows, and a hover highlight to help users scan dense information at a glance."
      playground={{
        render: (props) => (
          <DetailedInformation
            {...props}
            title="User Information"
            details={[
              { label: 'Name', value: 'Prabhu Kathiresan' },
              { label: 'Role', value: 'Developer' },
              { label: 'Status', value: 'Active' },
              { label: 'Plan', value: 'Pro' },
            ]}
          />
        ),
      }}
      examples={[
        {
          title: 'Default',
          description: 'Basic example showing details with a title and values.',
          render: (
            <DetailedInformation
              title="User Information"
              details={[
                { label: 'Name', value: 'Prabhu Kathiresan' },
                { label: 'Email', value: 'prabhu@example.com' },
                { label: 'Role', value: 'Founder' },
                { label: 'Phone', value: '+91 9876543210' },
              ]}
            />
          ),
          code: `
<DetailedInformation
  title="User Information"
  details={[
    { label: "Name", value: "Prabhu Kathiresan" },
    { label: "Email", value: "prabhu@example.com" },
    { label: "Role", value: "Founder" },
    { label: "Phone", value: "+91 9876543210" },
  ]}
/>
          `,
        },
        {
          title: 'Compact information',
          description: 'Adds divider effects with a compact layout.',
          render: (
            <DetailedInformation
              title="Account Details"
              compact
              bordered
              divider
              details={[
                { label: 'Plan', value: 'Pro' },
                { label: 'Renewal Date', value: 'Nov 20, 2025' },
                { label: 'Status', value: <span className="text-green-600">Active</span> },
              ]}
            />
          ),
          code: `
<DetailedInformation
  title="Account Details"
  compact
  hoverable
  bordered
  divider
  details={[
    { label: "Plan", value: "Pro" },
    { label: "Renewal Date", value: "Nov 20, 2025" },
    { label: "Status", value: <span className='text-green-600'>Active</span> },
  ]}
/>
          `,
        },
        {
          title: 'Hidden and Custom Content',
          description: 'Demonstrates hidden rows and JSX values for customization.',
          render: (
            <DetailedInformation
              title="Profile Overview"
              details={[
                { label: 'Username', value: 'theprabhu' },
                { label: 'Followers', value: <strong>120K</strong> },
                { label: 'Private Notes', value: 'Confidential', hidden: true },
              ]}
            />
          ),
          code: `
<DetailedInformation
  title="Profile Overview"
  details={[
    { label: "Username", value: "theprabhu" },
    { label: "Followers", value: <strong>120K</strong> },
    { label: "Private Notes", value: "Confidential", hidden: true },
  ]}
/>
          `,
        },
      ]}
    />
  )
}
