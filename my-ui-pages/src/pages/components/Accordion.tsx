import { useState } from 'react'
import { Accordion } from '@pk-design/react-tailwind'
import { CreditCard, Minus, Plus, Settings, Shield } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const faqItems = [
  {
    id: 'shipping',
    title: 'How long does shipping take?',
    content: 'Orders typically arrive within 3-5 business days for domestic shipping.',
  },
  {
    id: 'returns',
    title: 'What is your return policy?',
    content: 'You can return any item within 30 days of delivery for a full refund.',
  },
  {
    id: 'support',
    title: 'How do I contact support?',
    content: 'Reach us any time at support@example.com or through the in-app chat.',
  },
]

export default function AccordionDocsPage() {
  const [openIds, setOpenIds] = useState<Array<string | number>>(['shipping'])

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Only one item can be open at a time (the default `type="single"`).',
      render: <Accordion items={faqItems} />,
      code: `
<Accordion
  items={[
    { id: "shipping", title: "How long does shipping take?", content: "..." },
    { id: "returns", title: "What is your return policy?", content: "..." },
    { id: "support", title: "How do I contact support?", content: "..." },
  ]}
/>`,
    },
    {
      title: 'Multiple Open at Once',
      description: 'Use `type="multiple"` to let users expand more than one item at a time.',
      render: (
        <Accordion items={faqItems} type="multiple" defaultOpenIds={['shipping', 'returns']} />
      ),
      code: `
<Accordion items={faqItems} type="multiple" defaultOpenIds={["shipping", "returns"]} />`,
    },
    {
      title: 'Variants',
      description:
        'Choose between a single bordered card (`bordered`, default), individually separated cards (`separated`), or a minimal divided list (`plain`).',
      render: (
        <div className="flex flex-col gap-6">
          <Accordion items={faqItems} variant="separated" />
          <Accordion items={faqItems} variant="plain" />
        </div>
      ),
      code: `
<Accordion items={faqItems} variant="separated" />
<Accordion items={faqItems} variant="plain" />`,
    },
    {
      title: 'With Icons',
      description: 'Each item can render a leading icon alongside its title.',
      render: (
        <Accordion
          items={[
            {
              id: 'billing',
              title: 'Billing',
              icon: <CreditCard className="size-4" />,
              content: 'Manage your subscription, invoices, and payment methods.',
            },
            {
              id: 'security',
              title: 'Security',
              icon: <Shield className="size-4" />,
              content: 'Set up two-factor authentication and manage active sessions.',
            },
            {
              id: 'preferences',
              title: 'Preferences',
              icon: <Settings className="size-4" />,
              content: 'Customize notifications, theme, and language settings.',
            },
          ]}
        />
      ),
      code: `
<Accordion
  items={[
    { id: "billing", title: "Billing", icon: <CreditCard />, content: "..." },
    { id: "security", title: "Security", icon: <Shield />, content: "..." },
    { id: "preferences", title: "Preferences", icon: <Settings />, content: "..." },
  ]}
/>`,
    },
    {
      title: 'Custom Expand Icon',
      description:
        'Swap the trailing chevron with `expandIcon` — pass a node to keep the default rotate-on-open behavior, or a function of the open state for full control (e.g. swapping plus/minus icons).',
      render: (
        <div className="flex flex-col gap-6">
          <Accordion items={faqItems} expandIcon={<Plus className="size-4" />} />
          <Accordion
            items={faqItems}
            expandIcon={(isOpen) =>
              isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />
            }
          />
        </div>
      ),
      code: `
// keeps the default rotate-180deg-on-open behavior
<Accordion items={faqItems} expandIcon={<Plus />} />

// full control — swap icons instead of rotating
<Accordion
  items={faqItems}
  expandIcon={(isOpen) => (isOpen ? <Minus /> : <Plus />)}
/>`,
    },
    {
      title: 'Non-collapsible',
      description: 'With `collapsible={false}`, clicking the currently open item keeps it open.',
      render: <Accordion items={faqItems} collapsible={false} defaultOpenIds={['shipping']} />,
      code: `
<Accordion items={faqItems} collapsible={false} defaultOpenIds={["shipping"]} />`,
    },
    {
      title: 'Disabled Item',
      description: 'Individual items can be disabled with `disabled`.',
      render: (
        <Accordion
          items={[
            faqItems[0],
            { id: 'disabled', title: 'Currently unavailable', content: '...', disabled: true },
            faqItems[2],
          ]}
        />
      ),
      code: `
<Accordion
  items={[
    { id: "shipping", title: "...", content: "..." },
    { id: "disabled", title: "Currently unavailable", content: "...", disabled: true },
    { id: "support", title: "...", content: "..." },
  ]}
/>`,
    },
    {
      title: 'Controlled',
      description: 'Drive the open item(s) externally with `openIds` and `onChange`.',
      render: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Open: {openIds.length ? openIds.join(', ') : 'none'}
          </p>
          <Accordion items={faqItems} openIds={openIds} onChange={setOpenIds} />
        </div>
      ),
      code: `
const [openIds, setOpenIds] = useState(["shipping"])

<Accordion items={faqItems} openIds={openIds} onChange={setOpenIds} />`,
    },
  ]

  return (
    <DocsPageLayout
      component="Accordion"
      description="A vertically stacked set of collapsible sections for progressively disclosing content, such as FAQs or settings groups. Supports single or multiple open items, three visual variants, leading icons, disabled items, and both controlled and uncontrolled open state."
      playground={{
        render: (props) => <Accordion {...props} items={faqItems} />,
        initialProps: { type: 'single', variant: 'bordered', collapsible: true },
      }}
      examples={examples}
    />
  )
}
