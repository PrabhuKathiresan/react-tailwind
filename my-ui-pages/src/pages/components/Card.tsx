import { BodyText, Button, Card, StatusPill } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { ExternalLink, Sparkles, Check } from 'lucide-react'
import { Link } from 'react-router'

export default function CardDocsPage() {
  const examples = [
    {
      title: 'Structured Card with Sub-Components',
      description:
        'Use Card.Header, Card.Title, Card.Description, Card.Content, and Card.Footer for clean, structured layouts.',
      render: (
        <div className="mx-auto max-w-md">
          <Card variant="outlined">
            <Card.Header bordered>
              <div>
                <Card.Title>Enterprise Subscription</Card.Title>
                <Card.Description>Billing period: Annual</Card.Description>
              </div>
              <StatusPill color="success">Active</StatusPill>
            </Card.Header>
            <Card.Content>
              <BodyText className="text-gray-600 dark:text-gray-300">
                Includes unlimited team members, dedicated priority support, custom SSO
                integrations, and SLA guarantees.
              </BodyText>
            </Card.Content>
            <Card.Footer bordered>
              <Button variant="outlined" size="sm">
                Cancel
              </Button>
              <Button size="sm">Manage Plan</Button>
            </Card.Footer>
          </Card>
        </div>
      ),
      code: `
<Card variant="outlined">
  <Card.Header bordered>
    <div>
      <Card.Title>Enterprise Subscription</Card.Title>
      <Card.Description>Billing period: Annual</Card.Description>
    </div>
    <StatusPill color="success">Active</StatusPill>
  </Card.Header>
  <Card.Content>
    <p>Includes unlimited team members, priority support, and custom SSO integrations.</p>
  </Card.Content>
  <Card.Footer bordered>
    <Button variant="outlined" size="sm">Cancel</Button>
    <Button size="sm">Manage Plan</Button>
  </Card.Footer>
</Card>`,
    },
    {
      title: 'Surface Variants (Outlined, Elevated & Filled)',
      description: 'Choose between outlined, elevated shadow, or filled background variants.',
      render: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="outlined">
            <Card.Title>Outlined</Card.Title>
            <Card.Description>Clean 1px border outline.</Card.Description>
          </Card>
          <Card variant="elevated">
            <Card.Title className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-500" /> Elevated
            </Card.Title>
            <Card.Description>Subtle drop shadow & border.</Card.Description>
          </Card>
          <Card variant="filled">
            <Card.Title>Filled</Card.Title>
            <Card.Description>Soft tinted background fill.</Card.Description>
          </Card>
        </div>
      ),
      code: `
{/* Outlined Variant */}
<Card variant="outlined">
  <Card.Title>Outlined</Card.Title>
  <Card.Description>Clean 1px border outline.</Card.Description>
</Card>

{/* Elevated Variant */}
<Card variant="elevated">
  <Card.Title>Elevated</Card.Title>
  <Card.Description>Subtle drop shadow & border.</Card.Description>
</Card>

{/* Filled Variant */}
<Card variant="filled">
  <Card.Title>Filled</Card.Title>
  <Card.Description>Soft tinted background fill.</Card.Description>
</Card>`,
    },
    {
      title: 'Interactive & Selected Cards',
      description: 'Add clickable hover elevation lift and selected brand highlight rings.',
      render: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <Card clickable variant="elevated">
            <Card.Title>Clickable Card</Card.Title>
            <Card.Description>Hover over me to see the elevation lift effect.</Card.Description>
          </Card>
          <Card selected clickable>
            <Card.Header>
              <Card.Title>Pro Plan</Card.Title>
              <Check className="size-4 text-blue-600 dark:text-blue-400 font-bold" />
            </Card.Header>
            <Card.Description>Selected card with active brand ring outline.</Card.Description>
          </Card>
        </div>
      ),
      code: `
{/* Clickable Card */}
<Card clickable variant="elevated">
  <Card.Title>Clickable Card</Card.Title>
  <Card.Description>Hover over me to see the elevation lift effect.</Card.Description>
</Card>

{/* Selected Card */}
<Card selected clickable>
  <Card.Header>
    <Card.Title>Pro Plan</Card.Title>
    <Check className="size-4 text-blue-600" />
  </Card.Header>
  <Card.Description>Selected card with active brand ring outline.</Card.Description>
</Card>`,
    },
    {
      title: 'Card with Media Cover',
      description: 'Embed cover imagery seamlessly at the top of the card using Card.Media.',
      render: (
        <div className="mx-auto max-w-sm">
          <Card variant="elevated">
            <Card.Media
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
              alt="Abstract background"
              aspectRatio="video"
            />
            <Card.Title>Design Systems in 2026</Card.Title>
            <Card.Description>
              Exploring modern UI component architecture and Tailwind CSS v4 patterns.
            </Card.Description>
            <Card.Footer>
              <Button size="sm" variant="outlined">
                Read Article
              </Button>
            </Card.Footer>
          </Card>
        </div>
      ),
      code: `
<Card variant="elevated">
  <Card.Media
    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    alt="Cover image"
    aspectRatio="video"
  />
  <Card.Title>Design Systems in 2026</Card.Title>
  <Card.Description>Exploring modern UI component architecture and Tailwind CSS v4 patterns.</Card.Description>
  <Card.Footer>
    <Button size="sm" variant="outlined">Read Article</Button>
  </Card.Footer>
</Card>`,
    },
    {
      title: 'Polymorphic Link Card',
      description: 'Render Card as a native link or React Router Link via the "as" prop.',
      render: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card as="a" href="#" target="_blank" clickable variant="outlined">
            <Card.Title className="flex items-center justify-between">
              External Documentation
              <ExternalLink className="size-4 text-gray-400" />
            </Card.Title>
            <Card.Description>Opens external link in a new browser tab.</Card.Description>
          </Card>
          <Card as={Link} to="/alert" clickable variant="outlined">
            <Card.Title className="flex items-center justify-between">
              Alert Component
              <ExternalLink className="size-4 text-gray-400" />
            </Card.Title>
            <Card.Description>Navigate internally via React Router Link.</Card.Description>
          </Card>
        </div>
      ),
      code: `
{/* Native Link Card */}
<Card as="a" href="https://example.com" target="_blank" clickable>
  <Card.Title>External Link</Card.Title>
  <Card.Description>Opens in a new tab.</Card.Description>
</Card>

{/* React Router Link Card */}
<Card as={Link} to="/alert" clickable>
  <Card.Title>Alert Component</Card.Title>
  <Card.Description>Navigate internally.</Card.Description>
</Card>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Card"
      description="A versatile surface container for grouping related content with composable sub-components (Card.Header, Card.Title, Card.Description, Card.Content, Card.Footer, Card.Media), multiple surface variants (outlined, elevated, filled, ghost), and interactive selection states."
      examples={examples}
    />
  )
}
