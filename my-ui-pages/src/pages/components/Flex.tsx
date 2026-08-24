import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Flex, BodyText, TextContent } from '@pk-design/react-tailwind'

const basicExample = `import { Flex, TextContent } from '@pk-design/react-tailwind'

export default function BasicFlexDemo() {
  return (
    <Flex gap="md">
      <Flex.Item>
        <TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg">
          Flex Item 1
        </TextContent>
      </Flex.Item>
      <Flex.Item>
        <TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg">
          Flex Item 2
        </TextContent>
      </Flex.Item>
      <Flex.Item>
        <TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg">
          Flex Item 3
        </TextContent>
      </Flex.Item>
    </Flex>
  )
}`

const justifyExample = `import { Flex, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function JustifyFlexDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
justify="between" (Space Between Edges)
</BodyText>
        <Flex justify="between" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg">
              Left Edge
            </TextContent>
          </Flex.Item>
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg">
              Right Edge
            </TextContent>
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
justify="center" (Center Aligned)
</BodyText>
        <Flex justify="center" gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg">
              Centered 1
            </TextContent>
          </Flex.Item>
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg">
              Centered 2
            </TextContent>
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
justify="evenly" (Space Evenly Spaced)
</BodyText>
        <Flex justify="evenly" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs font-semibold rounded-lg">
              Item 1
            </TextContent>
          </Flex.Item>
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs font-semibold rounded-lg">
              Item 2
            </TextContent>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  )
}`

const growShrinkExample = `import { Flex, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function GrowShrinkFlexDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
grow={true}: Fluid item expands to fill available space
</BodyText>
        <Flex gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg">
              Fixed Item
            </TextContent>
          </Flex.Item>
          <Flex.Item grow>
            <TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center font-semibold rounded-lg border border-emerald-200 dark:border-emerald-800">
              Fluid Growing Item (grow=true - Fills Remaining Space)
            </TextContent>
          </Flex.Item>
          <Flex.Item>
            <TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg">
              Fixed Item
            </TextContent>
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
shrink={false}: Prevents item from shrinking
</BodyText>
        <Flex gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl overflow-x-auto">
          <Flex.Item shrink={false} className="w-64">
            <TextContent as="div" className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs font-semibold rounded-lg text-center">
              Non-Shrinking Item (shrink=false, 256px)
            </TextContent>
          </Flex.Item>
          <Flex.Item grow>
            <TextContent as="div" className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs text-center font-semibold rounded-lg">
              Fluid Item (grow=true)
            </TextContent>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  )
}`

const directionExample = `import { Flex, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function DirectionFlexDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
direction="row" (default)
</BodyText>
        <Flex direction="row" gap="sm" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          <Flex.Item><TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg">1</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg">2</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg">3</TextContent></Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
direction="row-reverse"
</BodyText>
        <Flex direction="row-reverse" gap="sm" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          <Flex.Item><TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg">1</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg">2</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg">3</TextContent></Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
direction="col"
</BodyText>
        <Flex direction="col" gap="sm" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          <Flex.Item><TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg">1</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg">2</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg">3</TextContent></Flex.Item>
        </Flex>
      </div>
    </div>
  )
}`

const wrapExample = `import { Flex, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function WrapFlexDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
wrap="wrap" (default): items flow onto new lines
</BodyText>
        <Flex wrap="wrap" gap="sm" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <Flex.Item key={i}>
              <TextContent as="div" className="p-3 w-24 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs text-center font-semibold rounded-lg">
                Item {i + 1}
              </TextContent>
            </Flex.Item>
          ))}
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
wrap="nowrap": items stay on one line and overflow scrolls
</BodyText>
        <Flex wrap="nowrap" gap="sm" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl overflow-x-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <Flex.Item key={i} shrink={false}>
              <TextContent as="div" className="p-3 w-24 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs text-center font-semibold rounded-lg">
                Item {i + 1}
              </TextContent>
            </Flex.Item>
          ))}
        </Flex>
      </div>
    </div>
  )
}`

const alignExample = `import { Flex, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function AlignFlexDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="start"
</BodyText>
        <Flex align="start" gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl h-24">
          <Flex.Item><TextContent as="div" className="p-2 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">Short</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-2 h-16 flex items-center bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">Tall</TextContent></Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="center"
</BodyText>
        <Flex align="center" gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl h-24">
          <Flex.Item><TextContent as="div" className="p-2 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">Short</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-2 h-16 flex items-center bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">Tall</TextContent></Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="end"
</BodyText>
        <Flex align="end" gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl h-24">
          <Flex.Item><TextContent as="div" className="p-2 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">Short</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-2 h-16 flex items-center bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">Tall</TextContent></Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="stretch" (default): items fill the cross-axis
</BodyText>
        <Flex align="stretch" gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl h-24">
          <Flex.Item><TextContent as="div" className="p-2 h-full flex items-center bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">Stretched</TextContent></Flex.Item>
          <Flex.Item><TextContent as="div" className="p-2 h-16 flex items-center bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">Tall (reference)</TextContent></Flex.Item>
        </Flex>
      </div>
    </div>
  )
}`

const responsiveSpanExample = `import { Flex, TextContent } from '@pk-design/react-tailwind'

export default function ResponsiveSpanFlexDemo() {
  return (
    <Flex gap="md">
      <Flex.Item span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Flex.Item>
      <Flex.Item span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Flex.Item>
      <Flex.Item span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Flex.Item>
      <Flex.Item span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Flex.Item>
    </Flex>
  )
}`

const gapAxisFlexExample = `import { Flex, TextContent } from '@pk-design/react-tailwind'

export default function GapAxisFlexDemo() {
  return (
    <Flex gapX="2xl" gapY="xs" wrap="wrap">
      {Array.from({ length: 6 }).map((_, i) => (
        <Flex.Item key={i} span={4}>
          <TextContent as="div" className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold">
            Wide X / Tight Y
          </TextContent>
        </Flex.Item>
      ))}
    </Flex>
  )
}`

const orderInlineExample = `import { Flex, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function OrderInlineFlexDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
order: visual position independent of markup order
</BodyText>
        <Flex gap="md">
          <Flex.Item order="last">
            <TextContent as="div" className="p-4 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">
              1st in markup, order="last"
            </TextContent>
          </Flex.Item>
          <Flex.Item order={-1}>
            <TextContent as="div" className="p-4 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">
              2nd in markup, order={-1}
            </TextContent>
          </Flex.Item>
          <Flex.Item>
            <TextContent as="div" className="p-4 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg font-semibold">
              3rd in markup, no order
            </TextContent>
          </Flex.Item>
        </Flex>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
inline: renders as inline-flex instead of flex
</BodyText>
        <BodyText as="div" size="xs" muted>
          Text before{' '}
          <Flex inline gap="xs" className="align-middle">
            <Flex.Item><TextContent as="div" className="px-2 py-1 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs rounded-md font-semibold">inline</TextContent></Flex.Item>
            <Flex.Item><TextContent as="div" className="px-2 py-1 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs rounded-md font-semibold">flex</TextContent></Flex.Item>
          </Flex>{' '}
          text after, flowing on the same line.
        </BodyText>
      </div>
    </div>
  )
}`

export default function FlexDocsPage() {
  return (
    <DocsPageLayout
      component="Flex"
      description="A flexible, 1D Flexbox layout component for fluid horizontal and vertical alignment, justification, growing, and shrinking."
      examples={[
        {
          title: 'Basic Flex Container',
          description: 'Basic flex container with gap="md" spacing preset.',
          code: basicExample,
          render: (
            <Flex gap="md">
              <Flex.Item>
                <TextContent
                  as="div"
                  className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg"
                >
                  Flex Item 1
                </TextContent>
              </Flex.Item>
              <Flex.Item>
                <TextContent
                  as="div"
                  className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg"
                >
                  Flex Item 2
                </TextContent>
              </Flex.Item>
              <Flex.Item>
                <TextContent
                  as="div"
                  className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg"
                >
                  Flex Item 3
                </TextContent>
              </Flex.Item>
            </Flex>
          ),
        },
        {
          title: 'Horizontal Space Justification (justify)',
          description:
            'Distribute items across the main axis using justify="between", justify="center", or justify="evenly".',
          code: justifyExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  justify="between" (Space Between Edges)
                </BodyText>
                <Flex justify="between" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg"
                    >
                      Left Edge
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg"
                    >
                      Right Edge
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  justify="center" (Center Aligned)
                </BodyText>
                <Flex
                  justify="center"
                  gap="md"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl"
                >
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg"
                    >
                      Centered 1
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs font-semibold rounded-lg"
                    >
                      Centered 2
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  justify="evenly" (Space Evenly Spaced)
                </BodyText>
                <Flex justify="evenly" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs font-semibold rounded-lg"
                    >
                      Item 1
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs font-semibold rounded-lg"
                    >
                      Item 2
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>
            </div>
          ),
        },
        {
          title: 'Flex Grow & Shrink Controls (grow & shrink)',
          description:
            'Use grow={true} to allow a fluid item to expand and absorb all remaining row space, or shrink={false} to prevent shrinking.',
          code: growShrinkExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  grow={true}: Fluid item expands to fill available space
                </BodyText>
                <Flex gap="md" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg"
                    >
                      Fixed Item
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item grow>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center font-semibold rounded-lg border border-emerald-200 dark:border-emerald-800"
                    >
                      Fluid Growing Item (grow=true - Fills Remaining Space)
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg"
                    >
                      Fixed Item
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  shrink={false}: Prevents item from shrinking
                </BodyText>
                <Flex
                  gap="md"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl overflow-x-auto"
                >
                  <Flex.Item shrink={false} className="w-64">
                    <TextContent
                      as="div"
                      className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs font-semibold rounded-lg text-center"
                    >
                      Non-Shrinking Item (shrink=false, 256px)
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item grow>
                    <TextContent
                      as="div"
                      className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs text-center font-semibold rounded-lg"
                    >
                      Fluid Item (grow=true)
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>
            </div>
          ),
        },
        {
          title: 'Flex Direction (row, row-reverse, col, col-reverse)',
          description:
            'direction controls the main axis and its flow order: row/row-reverse lay items out horizontally, col/col-reverse lay them out vertically.',
          code: directionExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  direction="row" (default)
                </BodyText>
                <Flex
                  direction="row"
                  gap="sm"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl"
                >
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg"
                    >
                      1
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg"
                    >
                      2
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg"
                    >
                      3
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  direction="row-reverse"
                </BodyText>
                <Flex
                  direction="row-reverse"
                  gap="sm"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl"
                >
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg"
                    >
                      1
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg"
                    >
                      2
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg"
                    >
                      3
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  direction="col"
                </BodyText>
                <Flex
                  direction="col"
                  gap="sm"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl"
                >
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg"
                    >
                      1
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg"
                    >
                      2
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg"
                    >
                      3
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>
            </div>
          ),
        },
        {
          title: 'Wrap Behavior (wrap)',
          description:
            'wrap="wrap" (the default) flows overflowing items onto new lines; wrap="nowrap" keeps everything on a single line, which is useful for a horizontally scrollable row.',
          code: wrapExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  wrap="wrap" (default): items flow onto new lines
                </BodyText>
                <Flex
                  wrap="wrap"
                  gap="sm"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Flex.Item key={i}>
                      <TextContent
                        as="div"
                        className="p-3 w-24 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs text-center font-semibold rounded-lg"
                      >
                        Item {i + 1}
                      </TextContent>
                    </Flex.Item>
                  ))}
                </Flex>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  wrap="nowrap": items stay on one line and overflow scrolls
                </BodyText>
                <Flex
                  wrap="nowrap"
                  gap="sm"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl overflow-x-auto"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Flex.Item key={i} shrink={false}>
                      <TextContent
                        as="div"
                        className="p-3 w-24 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs text-center font-semibold rounded-lg"
                      >
                        Item {i + 1}
                      </TextContent>
                    </Flex.Item>
                  ))}
                </Flex>
              </div>
            </div>
          ),
        },
        {
          title: 'Cross-Axis Alignment (align)',
          description:
            'align controls how items are positioned along the cross axis: start, center, end, or stretch (default) to fill the container height.',
          code: alignExample,
          render: (
            <div className="space-y-6">
              {(['start', 'center', 'end', 'stretch'] as const).map((a) => (
                <div key={a}>
                  <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                    align="{a}"{a === 'stretch' ? ' (default): items fill the cross-axis' : ''}
                  </BodyText>
                  <Flex
                    align={a}
                    gap="md"
                    className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl h-24"
                  >
                    <Flex.Item>
                      <TextContent
                        as="div"
                        className={
                          a === 'stretch'
                            ? 'p-2 h-full flex items-center bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold'
                            : 'p-2 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold'
                        }
                      >
                        {a === 'stretch' ? 'Stretched' : 'Short'}
                      </TextContent>
                    </Flex.Item>
                    <Flex.Item>
                      <TextContent
                        as="div"
                        className="p-2 h-16 flex items-center bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold"
                      >
                        Tall
                      </TextContent>
                    </Flex.Item>
                  </Flex>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: 'Responsive Item Widths (sm → 2xl)',
          description:
            'Flex.Item accepts span, sm, md, lg, xl, and xxl — the same six-tier responsive width-fraction system as Grid.Col — so a Flex row can reflow its item widths at every breakpoint.',
          code: responsiveSpanExample,
          render: (
            <Flex gap="md">
              {Array.from({ length: 4 }).map((_, i) => (
                <Flex.Item key={i} span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
                  <TextContent
                    as="div"
                    className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700"
                  >
                    12 / 6 / 4 / 3 / 2 / 1
                  </TextContent>
                </Flex.Item>
              ))}
            </Flex>
          ),
        },
        {
          title: 'Independent Row & Column Gaps (gapX / gapY)',
          description:
            'gapX and gapY override gap on their respective axis, giving independent control over horizontal and vertical spacing when items wrap onto multiple lines.',
          code: gapAxisFlexExample,
          render: (
            <Flex gapX="2xl" gapY="xs" wrap="wrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <Flex.Item key={i} span={4}>
                  <TextContent
                    as="div"
                    className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold"
                  >
                    Wide X / Tight Y
                  </TextContent>
                </Flex.Item>
              ))}
            </Flex>
          ),
        },
        {
          title: 'Visual Reordering & Inline Flex (order, inline)',
          description:
            'order repositions an item visually without touching markup order — "first"/"last" use Tailwind\'s static utilities, any numeric value (including negative) is applied via inline style so it always works. inline renders the container as inline-flex so it can sit within a text flow.',
          code: orderInlineExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  order: visual position independent of markup order
                </BodyText>
                <Flex gap="md">
                  <Flex.Item order="last">
                    <TextContent
                      as="div"
                      className="p-4 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold"
                    >
                      1st in markup, order="last"
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item order={-1}>
                    <TextContent
                      as="div"
                      className="p-4 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold"
                    >
                      2nd in markup, order={-1}
                    </TextContent>
                  </Flex.Item>
                  <Flex.Item>
                    <TextContent
                      as="div"
                      className="p-4 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg font-semibold"
                    >
                      3rd in markup, no order
                    </TextContent>
                  </Flex.Item>
                </Flex>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  inline: renders as inline-flex instead of flex
                </BodyText>
                <BodyText as="div" size="xs" muted>
                  Text before{' '}
                  <Flex inline gap="xs" className="align-middle">
                    <Flex.Item>
                      <TextContent className="px-2 py-1 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs rounded-md font-semibold">
                        inline
                      </TextContent>
                    </Flex.Item>
                    <Flex.Item>
                      <TextContent className="px-2 py-1 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs rounded-md font-semibold">
                        flex
                      </TextContent>
                    </Flex.Item>
                  </Flex>{' '}
                  text after, flowing on the same line.
                </BodyText>
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
