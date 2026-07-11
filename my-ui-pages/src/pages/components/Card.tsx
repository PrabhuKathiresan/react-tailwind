import { BodyText, Card, HeadingText } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import { Link } from 'react-router'

export default function CardDocsPage() {
  const examples = [
    {
      title: 'Basic',
      description: 'Basic card container.',
      render: (
        <div className="mx-auto max-w-md">
          <Card className="space-y-4">
            <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
            <BodyText>
              React Tailwind is a React component library that provides a set of pre-built
              components for building user interfaces.
            </BodyText>
          </Card>
        </div>
      ),
      code: `
<Card className="space-y-4">
  <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
  <BodyText>React Tailwind is a React component library that provides a set of pre-built components for building user interfaces.</BodyText>
</Card>
      `,
    },
    {
      title: 'Card as Link',
      description: 'Card as a link.',
      render: (
        <Card as="a" href="#" target="_blank" hoverable>
          <HeadingText.SubTitle className="flex items-center justify-between gap-2">
            React Tailwind
            <SquareArrowOutUpRightIcon size={16} />
          </HeadingText.SubTitle>
          <BodyText>
            React Tailwind is a React component library that provides a set of pre-built components
            for building user interfaces.
          </BodyText>
        </Card>
      ),
      code: `
<Card as="a" href="#" target="_blank" hoverable>
  <HeadingText.SubTitle className="flex items-center justify-between gap-2">
    React Tailwind
    <SquareArrowOutUpRightIcon size={16} />
  </HeadingText.SubTitle>
  <BodyText>React Tailwind is a React component library that provides a set of pre-built components for building user interfaces.</BodyText>
</Card>
      `,
    },
    {
      title: 'Card as Custom Component',
      description: 'Card as react router Link.',
      render: (
        <Card as={Link} to="/alert" target="_blank" hoverable>
          <HeadingText.SubTitle className="flex items-center justify-between gap-2">
            React Tailwind Alerts
            <SquareArrowOutUpRightIcon size={16} />
          </HeadingText.SubTitle>
          <BodyText>React Tailwind Alerts can be used to show alerts to the user.</BodyText>
        </Card>
      ),
      code: `
<Card as={Link} to="/alert" target="_blank" hoverable>
  <HeadingText.SubTitle className="flex items-center justify-between gap-2">
    React Tailwind Alerts
    <SquareArrowOutUpRightIcon size={16} />
  </HeadingText.SubTitle>
  <BodyText>React Tailwind Alerts can be used to show alerts to the user.</BodyText>
</Card>
      `,
    },
    {
      title: 'Card with No Border',
      description: 'Card without border.',
      render: (
        <Card bordered={false}>
          <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
          <BodyText>
            React Tailwind is a React component library that provides a set of pre-built components
            for building user interfaces.
          </BodyText>
        </Card>
      ),
      code: `
<Card bordered={false}>
  <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
  <BodyText>React Tailwind is a React component library that provides a set of pre-built components for building user interfaces.</BodyText>
</Card>
      `,
    },
    {
      title: 'Card with Hoverable',
      description: 'Card that is hoverable.',
      render: (
        <Card hoverable>
          <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
          <BodyText>
            React Tailwind is a React component library that provides a set of pre-built components
            for building user interfaces.
          </BodyText>
        </Card>
      ),
      code: `
<Card hoverable>
  <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
  <BodyText>React Tailwind is a React component library that provides a set of pre-built components for building user interfaces.</BodyText>
</Card>
      `,
    },
    {
      title: 'Compact Card',
      description: 'Card with compact padding.',
      render: (
        <Card compact>
          <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
          <BodyText>
            React Tailwind is a React component library that provides a set of pre-built components
            for building user interfaces.
          </BodyText>
        </Card>
      ),
      code: `
<Card compact>
  <HeadingText.SubTitle>React Tailwind</HeadingText.SubTitle>
  <BodyText>React Tailwind is a React component library that provides a set of pre-built components for building user interfaces.</BodyText>
</Card>
      `,
    },
  ]

  return (
    <DocsPageLayout
      component="Card"
      description="A flexible surface container for grouping related content with a consistent bordered and padded wrapper. Comes with optional header and footer slots, making it a natural fit for product listings, profile summaries, dashboard metrics, and any elevated content block."
      playground={{
        render: (props) => (
          <Card {...props} className="w-80">
            <HeadingText.SubTitle2>React Tailwind</HeadingText.SubTitle2>
            <BodyText className="mt-2">
              A modern component library built for speed, consistency, and scalability.
            </BodyText>
          </Card>
        ),
      }}
      examples={examples}
    />
  )
}
