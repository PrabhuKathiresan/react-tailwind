import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Grid, Card, BodyText, TextContent, Badge, Input } from '@pk-design/react-tailwind'

const basicExample = `import { Grid, TextContent } from '@pk-design/react-tailwind'

export default function BasicGridDemo() {
  return (
    <Grid gap="md">
      <Grid.Col span={4}>
        <TextContent as="div" className="p-4 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 rounded-xl text-center font-semibold text-xs border border-blue-200 dark:border-blue-800">
          Column 1 (span 4 / 12)
        </TextContent>
      </Grid.Col>
      <Grid.Col span={4}>
        <TextContent as="div" className="p-4 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 rounded-xl text-center font-semibold text-xs border border-emerald-200 dark:border-emerald-800">
          Column 2 (span 4 / 12)
        </TextContent>
      </Grid.Col>
      <Grid.Col span={4}>
        <TextContent as="div" className="p-4 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 rounded-xl text-center font-semibold text-xs border border-purple-200 dark:border-purple-800">
          Column 3 (span 4 / 12)
        </TextContent>
      </Grid.Col>
    </Grid>
  )
}`

const alignExample = `import { Grid, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function AlignGridDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="start" (Top Aligned)
</BodyText>
        <Grid gap="md" align="start" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28">
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-10 flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800">
              Short Box (40px)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800">
              Tall Box (80px)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-14 flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800">
              Medium Box (56px)
            </TextContent>
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="center" (Vertically Centered)
</BodyText>
        <Grid gap="md" align="center" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28">
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-10 flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800">
              Short Box (40px)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800">
              Tall Box (80px)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-14 flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800">
              Medium Box (56px)
            </TextContent>
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="end" (Bottom Aligned)
</BodyText>
        <Grid gap="md" align="end" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28">
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-10 flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800">
              Short Box (40px)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800">
              Tall Box (80px)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-14 flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800">
              Medium Box (56px)
            </TextContent>
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
align="stretch" (Stretch Full Height)
</BodyText>
        <Grid gap="md" align="stretch" className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28">
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-full flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800">
              Stretched (Full Height)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800">
              Tall Reference Box (80px)
            </TextContent>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-full flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800">
              Stretched (Full Height)
            </TextContent>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  )
}`

const sidebarExample = `import { Grid, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function SidebarLayoutDemo() {
  return (
    <Grid gap="md">
      <Grid.Col span={8}>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
          <TextContent as="div" size="sm" weight="bold">
            Main Content Area (span 8 / 12)
          </TextContent>
          <BodyText as="p" size="xs" muted>
            Takes up 2/3 of the available row width. Perfect for main feed, article content, or primary data tables.
          </BodyText>
        </div>
      </Grid.Col>
      <Grid.Col span={4}>
        <div className="p-6 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
          <TextContent as="div" size="sm" weight="bold">
Sidebar (span 4 / 12)
</TextContent>
          <BodyText as="p" size="xs" muted>
Takes up 1/3 of the row width. Great for widgets and actions.
</BodyText>
        </div>
      </Grid.Col>
    </Grid>
  )
}`

const metricsExample = `import { Grid, Card, Badge, TextContent } from '@pk-design/react-tailwind'

export default function MetricsGridDemo() {
  return (
    <Grid gap="md">
      <Grid.Col span={3}>
        <Card compact title="Total Revenue" badge={<Badge theme="success" size="sm">+12.5%</Badge>}>
          <TextContent as="div" size="xl" className="font-extrabold">$45,210</TextContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card compact title="Active Users" badge={<Badge theme="info" size="sm">+8.1%</Badge>}>
          <TextContent as="div" size="xl" className="font-extrabold">2,840</TextContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card compact title="Conversion Rate" badge={<Badge theme="warning" size="sm">-0.4%</Badge>}>
          <TextContent as="div" size="xl" className="font-extrabold">3.42%</TextContent>
        </Card>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card compact title="Pending Orders" badge={<Badge theme="secondary" size="sm">14 New</Badge>}>
          <TextContent as="div" size="xl" className="font-extrabold">58</TextContent>
        </Card>
      </Grid.Col>
    </Grid>
  )
}`

const formExample = `import { Grid, Input } from '@pk-design/react-tailwind'

export default function FormGridDemo() {
  return (
    <Grid gap="md">
      <Grid.Col span={6}>
        <Input label="First Name" placeholder="Jane" size="sm" />
      </Grid.Col>
      <Grid.Col span={6}>
        <Input label="Last Name" placeholder="Doe" size="sm" />
      </Grid.Col>
      <Grid.Col span={12}>
        <Input label="Email Address" placeholder="jane.doe@example.com" size="sm" />
      </Grid.Col>
      <Grid.Col span={8}>
        <Input label="Street Address" placeholder="123 Market Street" size="sm" />
      </Grid.Col>
      <Grid.Col span={4}>
        <Input label="Zip Code" placeholder="94103" size="sm" />
      </Grid.Col>
    </Grid>
  )
}`

const gapExample = `import { Grid, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function GapGridDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
Compact Gap (xs = 4px)
</BodyText>
        <Grid gap="xs">
          <Grid.Col span={4}><TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">Col 1</TextContent></Grid.Col>
          <Grid.Col span={4}><TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">Col 2</TextContent></Grid.Col>
          <Grid.Col span={4}><TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">Col 3</TextContent></Grid.Col>
        </Grid>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
Spacious Gap (xl = 32px)
</BodyText>
        <Grid gap="xl">
          <Grid.Col span={4}><TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">Col 1</TextContent></Grid.Col>
          <Grid.Col span={4}><TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">Col 2</TextContent></Grid.Col>
          <Grid.Col span={4}><TextContent as="div" className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">Col 3</TextContent></Grid.Col>
        </Grid>
      </div>
    </div>
  )
}`

const responsiveExample = `import { Grid, TextContent } from '@pk-design/react-tailwind'

export default function ResponsiveGridDemo() {
  return (
    <Grid gap="md">
      <Grid.Col span={12} sm={6} md={3}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          Mobile: 12 / Tablet: 6 / Desktop: 3
        </TextContent>
      </Grid.Col>
      <Grid.Col span={12} sm={6} md={3}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          Mobile: 12 / Tablet: 6 / Desktop: 3
        </TextContent>
      </Grid.Col>
      <Grid.Col span={12} sm={6} md={3}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          Mobile: 12 / Tablet: 6 / Desktop: 3
        </TextContent>
      </Grid.Col>
      <Grid.Col span={12} sm={6} md={3}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          Mobile: 12 / Tablet: 6 / Desktop: 3
        </TextContent>
      </Grid.Col>
    </Grid>
  )
}`

const fullBreakpointExample = `import { Grid, TextContent } from '@pk-design/react-tailwind'

export default function FullBreakpointGridDemo() {
  return (
    <Grid gap="md">
      <Grid.Col span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Grid.Col>
      <Grid.Col span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Grid.Col>
      <Grid.Col span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Grid.Col>
      <Grid.Col span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
        <TextContent as="div" className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700">
          12 / 6 / 4 / 3 / 2 / 1
        </TextContent>
      </Grid.Col>
    </Grid>
  )
}`

const gapAxisExample = `import { Grid, TextContent } from '@pk-design/react-tailwind'

export default function GapAxisGridDemo() {
  return (
    <Grid gapX="2xl" gapY="xs">
      <Grid.Col span={4}><TextContent as="div" className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold">Wide X / Tight Y</TextContent></Grid.Col>
      <Grid.Col span={4}><TextContent as="div" className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold">Wide X / Tight Y</TextContent></Grid.Col>
      <Grid.Col span={4}><TextContent as="div" className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold">Wide X / Tight Y</TextContent></Grid.Col>
      <Grid.Col span={4}><TextContent as="div" className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold">Wide X / Tight Y</TextContent></Grid.Col>
      <Grid.Col span={4}><TextContent as="div" className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold">Wide X / Tight Y</TextContent></Grid.Col>
      <Grid.Col span={4}><TextContent as="div" className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold">Wide X / Tight Y</TextContent></Grid.Col>
    </Grid>
  )
}`

const autoFitExample = `import { Grid, BodyText, TextContent } from '@pk-design/react-tailwind'

// Container is wide enough for 4 columns at 140px, but only 3 cards are
// rendered — that spare column is what makes autoFit vs autoFill visible.
// (With exactly enough items to fill every column, there's no spare track
// and the two modes render identically.)
export default function AutoFitGridDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
minColWidth="140px" autoFit (default): the spare 4th column collapses, so the 3 cards stretch to fill the row
</BodyText>
        <div className="max-w-2xl border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-3">
          <Grid minColWidth="140px" gap="md">
            <Grid.Col><TextContent as="div" className="p-4 bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-100 text-xs text-center rounded-lg font-semibold">Card</TextContent></Grid.Col>
            <Grid.Col><TextContent as="div" className="p-4 bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-100 text-xs text-center rounded-lg font-semibold">Card</TextContent></Grid.Col>
            <Grid.Col><TextContent as="div" className="p-4 bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-100 text-xs text-center rounded-lg font-semibold">Card</TextContent></Grid.Col>
          </Grid>
        </div>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
minColWidth="140px" autoFit={false}: uses auto-fill, the empty 4th column stays reserved so the cards stay narrow and leave a gap
</BodyText>
        <div className="max-w-2xl border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-3">
          <Grid minColWidth="140px" autoFit={false} gap="md">
            <Grid.Col><TextContent as="div" className="p-4 bg-cyan-100 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-100 text-xs text-center rounded-lg font-semibold">Card</TextContent></Grid.Col>
            <Grid.Col><TextContent as="div" className="p-4 bg-cyan-100 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-100 text-xs text-center rounded-lg font-semibold">Card</TextContent></Grid.Col>
            <Grid.Col><TextContent as="div" className="p-4 bg-cyan-100 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-100 text-xs text-center rounded-lg font-semibold">Card</TextContent></Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  )
}`

const extendedColsExample = `import { Grid, BodyText, TextContent } from '@pk-design/react-tailwind'

export default function ExtendedColsGridDemo() {
  return (
    <div className="space-y-6">
      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
          cols={5}
        </BodyText>
        <Grid cols={5} gap="sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <TextContent
              key={i}
              as="div"
              className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs text-center rounded-lg font-semibold"
            >
              {i + 1}
            </TextContent>
          ))}
        </Grid>
      </div>

      <div>
        <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
          cols={9}
        </BodyText>
        <Grid cols={9} gap="sm">
          {Array.from({ length: 9 }).map((_, i) => (
            <TextContent
              key={i}
              as="div"
              className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs text-center rounded-lg font-semibold"
            >
              {i + 1}
            </TextContent>
          ))}
        </Grid>
      </div>
    </div>
  )
}`

const flexModeExample = `import { Grid, TextContent } from '@pk-design/react-tailwind'

// The container needs an explicit height (h-64 here) — a column flex layout
// only has "remaining space" for grow to fill in if the container itself is
// taller than its children's natural content height.
export default function FlexModeGridDemo() {
  return (
    <Grid flex direction="col" wrap="nowrap" gap="sm" className="h-64 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
      <Grid.Col>
        <TextContent as="div" className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg">
          Fixed Header
        </TextContent>
      </Grid.Col>
      <Grid.Col grow>
        <TextContent as="div" className="h-full flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg text-center">
          Growing Content (grow=true fills remaining vertical space)
        </TextContent>
      </Grid.Col>
      <Grid.Col shrink={false}>
        <TextContent as="div" className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg">
          Fixed Footer (shrink=false)
        </TextContent>
      </Grid.Col>
    </Grid>
  )
}`

const orderExample = `import { Grid, TextContent } from '@pk-design/react-tailwind'

export default function OrderGridDemo() {
  return (
    <Grid gap="md">
      <Grid.Col span={4} order="last">
        <TextContent as="div" className="p-4 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold">
          1st in markup, order="last"
        </TextContent>
      </Grid.Col>
      <Grid.Col span={4} order={-1}>
        <TextContent as="div" className="p-4 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold">
          2nd in markup, order={-1}
        </TextContent>
      </Grid.Col>
      <Grid.Col span={4}>
        <TextContent as="div" className="p-4 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg font-semibold">
          3rd in markup, no order
        </TextContent>
      </Grid.Col>
    </Grid>
  )
}`

export default function GridDocsPage() {
  return (
    <DocsPageLayout
      component="Grid"
      description="A flexible, 12-column CSS Grid component for responsive multi-column web & mobile app layouts."
      examples={[
        {
          title: '3-Column Equal Grid',
          description: 'Basic equal-width 3-column grid using span={4} (4 + 4 + 4 = 12 tracks).',
          code: basicExample,
          render: (
            <Grid gap="md">
              <Grid.Col span={4}>
                <TextContent
                  as="div"
                  className="p-4 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 rounded-xl text-center font-semibold text-xs border border-blue-200 dark:border-blue-800"
                >
                  Column 1 (span 4 / 12)
                </TextContent>
              </Grid.Col>
              <Grid.Col span={4}>
                <TextContent
                  as="div"
                  className="p-4 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 rounded-xl text-center font-semibold text-xs border border-emerald-200 dark:border-emerald-800"
                >
                  Column 2 (span 4 / 12)
                </TextContent>
              </Grid.Col>
              <Grid.Col span={4}>
                <TextContent
                  as="div"
                  className="p-4 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 rounded-xl text-center font-semibold text-xs border border-purple-200 dark:border-purple-800"
                >
                  Column 3 (span 4 / 12)
                </TextContent>
              </Grid.Col>
            </Grid>
          ),
        },
        {
          title: 'Vertical Alignment Options (align)',
          description:
            'All 4 vertical alignment options: align="start", align="center", align="end", and align="stretch".',
          code: alignExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  align="start" (Top Aligned)
                </BodyText>
                <Grid
                  gap="md"
                  align="start"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28"
                >
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-10 flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800"
                    >
                      Short Box (40px)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800"
                    >
                      Tall Box (80px)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-14 flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800"
                    >
                      Medium Box (56px)
                    </TextContent>
                  </Grid.Col>
                </Grid>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  align="center" (Vertically Centered)
                </BodyText>
                <Grid
                  gap="md"
                  align="center"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28"
                >
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-10 flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800"
                    >
                      Short Box (40px)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800"
                    >
                      Tall Box (80px)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-14 flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800"
                    >
                      Medium Box (56px)
                    </TextContent>
                  </Grid.Col>
                </Grid>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  align="end" (Bottom Aligned)
                </BodyText>
                <Grid
                  gap="md"
                  align="end"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28"
                >
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-10 flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800"
                    >
                      Short Box (40px)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800"
                    >
                      Tall Box (80px)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-14 flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800"
                    >
                      Medium Box (56px)
                    </TextContent>
                  </Grid.Col>
                </Grid>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  align="stretch" (Stretch Full Height)
                </BodyText>
                <Grid
                  gap="md"
                  align="stretch"
                  className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl min-h-28"
                >
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg h-full flex items-center justify-center font-semibold border border-blue-200 dark:border-blue-800"
                    >
                      Stretched (Full Height)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg h-20 flex items-center justify-center font-semibold border border-emerald-200 dark:border-emerald-800"
                    >
                      Tall Reference Box (80px)
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg h-full flex items-center justify-center font-semibold border border-purple-200 dark:border-purple-800"
                    >
                      Stretched (Full Height)
                    </TextContent>
                  </Grid.Col>
                </Grid>
              </div>
            </div>
          ),
        },
        {
          title: 'Main Content & Sidebar Layout',
          description:
            'Asymmetric 2-column layout with 2/3 main area (span={8}) and 1/3 sidebar (span={4}).',
          code: sidebarExample,
          render: (
            <Grid gap="md">
              <Grid.Col span={8}>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
                  <TextContent as="div" size="sm" weight="bold">
                    Main Content Area (span 8 / 12)
                  </TextContent>
                  <BodyText size="xs" muted>
                    Takes up 2/3 of the available row width. Perfect for main feeds, articles, or
                    primary data tables.
                  </BodyText>
                </div>
              </Grid.Col>
              <Grid.Col span={4}>
                <div className="p-6 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                  <TextContent as="div" size="sm" weight="bold">
                    Sidebar (span 4 / 12)
                  </TextContent>
                  <BodyText size="xs" muted>
                    Takes up 1/3 of the row width. Great for widgets and filter panels.
                  </BodyText>
                </div>
              </Grid.Col>
            </Grid>
          ),
        },
        {
          title: '4-Column Metric Cards Grid',
          description: 'Dashboard KPI card grid with 4 equal columns (span={3}).',
          code: metricsExample,
          render: (
            <Grid gap="md">
              <Grid.Col span={3}>
                <Card
                  compact
                  title="Total Revenue"
                  badge={
                    <Badge theme="success" size="sm">
                      +12.5%
                    </Badge>
                  }
                >
                  <TextContent as="div" size="xl" className="font-extrabold">
                    $45,210
                  </TextContent>
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card
                  compact
                  title="Active Users"
                  badge={
                    <Badge theme="info" size="sm">
                      +8.1%
                    </Badge>
                  }
                >
                  <TextContent as="div" size="xl" className="font-extrabold">
                    2,840
                  </TextContent>
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card
                  compact
                  title="Conversion Rate"
                  badge={
                    <Badge theme="warning" size="sm">
                      -0.4%
                    </Badge>
                  }
                >
                  <TextContent as="div" size="xl" className="font-extrabold">
                    3.42%
                  </TextContent>
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card
                  compact
                  title="Pending Orders"
                  badge={
                    <Badge theme="secondary" size="sm">
                      14 New
                    </Badge>
                  }
                >
                  <TextContent as="div" size="xl" className="font-extrabold">
                    58
                  </TextContent>
                </Card>
              </Grid.Col>
            </Grid>
          ),
        },
        {
          title: 'Multi-Row Form Field Layout',
          description:
            'Real-world form layout combining 50% split inputs (span={6}), 100% full-width inputs (span={12}), and 2/3 + 1/3 split inputs (span={8} & span={4}).',
          code: formExample,
          render: (
            <Grid gap="md">
              <Grid.Col span={6}>
                <Input label="First Name" placeholder="Jane" size="sm" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Input label="Last Name" placeholder="Doe" size="sm" />
              </Grid.Col>
              <Grid.Col span={12}>
                <Input label="Email Address" placeholder="jane.doe@example.com" size="sm" />
              </Grid.Col>
              <Grid.Col span={8}>
                <Input label="Street Address" placeholder="123 Market Street" size="sm" />
              </Grid.Col>
              <Grid.Col span={4}>
                <Input label="Zip Code" placeholder="94103" size="sm" />
              </Grid.Col>
            </Grid>
          ),
        },
        {
          title: 'Grid Gap Spacing Presets',
          description:
            'Control spacing between grid columns using gap="xs" (4px) or gap="xl" (32px).',
          code: gapExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  Compact Gap (xs = 4px)
                </BodyText>
                <Grid gap="xs">
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold"
                    >
                      Col 1
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold"
                    >
                      Col 2
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold"
                    >
                      Col 3
                    </TextContent>
                  </Grid.Col>
                </Grid>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  Spacious Gap (xl = 32px)
                </BodyText>
                <Grid gap="xl">
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold"
                    >
                      Col 1
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold"
                    >
                      Col 2
                    </TextContent>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextContent
                      as="div"
                      className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold"
                    >
                      Col 3
                    </TextContent>
                  </Grid.Col>
                </Grid>
              </div>
            </div>
          ),
        },
        {
          title: 'Responsive Breakpoint Grid',
          description:
            'Adapts column spans dynamically across mobile (100%), tablet (sm: 50%), and desktop (md: 25%).',
          code: responsiveExample,
          render: (
            <Grid gap="md">
              <Grid.Col span={12} sm={6} md={3}>
                <TextContent
                  as="div"
                  className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700"
                >
                  Mobile: 12 / Tablet: 6 / Desktop: 3
                </TextContent>
              </Grid.Col>
              <Grid.Col span={12} sm={6} md={3}>
                <TextContent
                  as="div"
                  className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700"
                >
                  Mobile: 12 / Tablet: 6 / Desktop: 3
                </TextContent>
              </Grid.Col>
              <Grid.Col span={12} sm={6} md={3}>
                <TextContent
                  as="div"
                  className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700"
                >
                  Mobile: 12 / Tablet: 6 / Desktop: 3
                </TextContent>
              </Grid.Col>
              <Grid.Col span={12} sm={6} md={3}>
                <TextContent
                  as="div"
                  className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700"
                >
                  Mobile: 12 / Tablet: 6 / Desktop: 3
                </TextContent>
              </Grid.Col>
            </Grid>
          ),
        },
        {
          title: 'Full Breakpoint Range (sm → 2xl)',
          description:
            "Every responsive tier at once: span, sm, md, lg, xl, and xxl (Tailwind's 2xl) all control the column span independently at their own viewport width.",
          code: fullBreakpointExample,
          render: (
            <Grid gap="md">
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid.Col key={i} span={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
                  <TextContent
                    as="div"
                    className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-center font-semibold text-xs border border-gray-200 dark:border-gray-700"
                  >
                    12 / 6 / 4 / 3 / 2 / 1
                  </TextContent>
                </Grid.Col>
              ))}
            </Grid>
          ),
        },
        {
          title: 'Independent Row & Column Gaps (gapX / gapY)',
          description:
            'gapX and gapY control horizontal and vertical spacing independently, overriding gap on their respective axis. Handy for dense photo/card grids that want tight vertical rhythm but airy columns.',
          code: gapAxisExample,
          render: (
            <Grid gapX="2xl" gapY="xs">
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid.Col key={i} span={4}>
                  <TextContent
                    as="div"
                    className="p-3 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 text-xs text-center rounded-lg font-semibold"
                  >
                    Wide X / Tight Y
                  </TextContent>
                </Grid.Col>
              ))}
            </Grid>
          ),
        },
        {
          title: 'Breakpoint-Free Auto-Fit Grid (minColWidth)',
          description:
            "Skip manual breakpoints entirely: minColWidth renders repeat(auto-fit|auto-fill, minmax(minColWidth, 1fr)), so the column count adapts continuously to the container width. The difference between autoFit and autoFill only shows up when the row is wide enough for more columns than there are items — the dashed box below is sized for 4 columns at 140px but holds only 3 cards, so there's one spare column: autoFit (default) collapses it and stretches the 3 cards to fill the row; autoFit={false} switches to auto-fill, which keeps that spare column reserved, leaving the cards narrower with a gap at the end.",
          code: autoFitExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  minColWidth="140px" autoFit (default): the spare 4th column collapses, so the 3
                  cards stretch to fill the row
                </BodyText>
                <div className="max-w-2xl border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-3">
                  <Grid minColWidth="140px" gap="md">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Grid.Col key={i}>
                        <TextContent
                          as="div"
                          className="p-4 bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-100 text-xs text-center rounded-lg font-semibold"
                        >
                          Card
                        </TextContent>
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  minColWidth="140px" autoFit={'{false}'}: auto-fill keeps the empty 4th column
                  reserved, cards stay narrow and leave a gap
                </BodyText>
                <div className="max-w-2xl border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-3">
                  <Grid minColWidth="140px" autoFit={false} gap="md">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Grid.Col key={i}>
                        <TextContent
                          as="div"
                          className="p-4 bg-cyan-100 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-100 text-xs text-center rounded-lg font-semibold"
                        >
                          Card
                        </TextContent>
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: 'Extended Column Presets (5, 7, 9 Columns)',
          description:
            'cols accepts any track count from 1-12 (not just the classic 1/2/3/4/6/12 Bootstrap-style presets), each with its own progressive breakpoint reveal — handy for icon rows, avatar stacks, or calendar-style layouts.',
          code: extendedColsExample,
          render: (
            <div className="space-y-6">
              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  cols={5}
                </BodyText>
                <Grid cols={5} gap="sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TextContent
                      key={i}
                      as="div"
                      className="p-3 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 text-xs text-center rounded-lg font-semibold"
                    >
                      {i + 1}
                    </TextContent>
                  ))}
                </Grid>
              </div>

              <div>
                <BodyText as="div" size="xs" weight="bold" muted className="mb-2">
                  cols={9}
                </BodyText>
                <Grid cols={9} gap="sm">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <TextContent
                      key={i}
                      as="div"
                      className="p-3 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs text-center rounded-lg font-semibold"
                    >
                      {i + 1}
                    </TextContent>
                  ))}
                </Grid>
              </div>
            </div>
          ),
        },
        {
          title: 'Grid as a Flex Container (flex, direction, wrap, grow, shrink)',
          description:
            "Set flex to render the same Grid/Grid.Col API as a flex/inline-flex container instead of CSS Grid, reusing gap/align/justify and adding direction/wrap. Grid.Col's grow/shrink then behave exactly like Flex.Item — useful for a header/content/footer stack without switching components.",
          code: flexModeExample,
          render: (
            <Grid
              flex
              direction="col"
              wrap="nowrap"
              gap="sm"
              className="h-64 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl"
            >
              <Grid.Col>
                <TextContent
                  as="div"
                  className="p-3 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs font-semibold rounded-lg"
                >
                  Fixed Header
                </TextContent>
              </Grid.Col>
              <Grid.Col grow>
                <TextContent
                  as="div"
                  className="h-full flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-lg text-center"
                >
                  Growing Content (grow=true fills remaining vertical space)
                </TextContent>
              </Grid.Col>
              <Grid.Col shrink={false}>
                <TextContent
                  as="div"
                  className="p-3 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs font-semibold rounded-lg"
                >
                  Fixed Footer (shrink=false)
                </TextContent>
              </Grid.Col>
            </Grid>
          ),
        },
        {
          title: 'Visual Reordering (order)',
          description:
            'order controls visual position independent of markup order. "first"/"last" map to Tailwind\'s static order-first/order-last utilities; any numeric value (including negative numbers) is applied via an inline style, so it always works regardless of the consuming app\'s Tailwind build.',
          code: orderExample,
          render: (
            <Grid gap="md">
              <Grid.Col span={4} order="last">
                <TextContent
                  as="div"
                  className="p-4 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 text-xs text-center rounded-lg font-semibold"
                >
                  1st in markup, order="last"
                </TextContent>
              </Grid.Col>
              <Grid.Col span={4} order={-1}>
                <TextContent
                  as="div"
                  className="p-4 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 text-xs text-center rounded-lg font-semibold"
                >
                  2nd in markup, order={-1}
                </TextContent>
              </Grid.Col>
              <Grid.Col span={4}>
                <TextContent
                  as="div"
                  className="p-4 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 text-xs text-center rounded-lg font-semibold"
                >
                  3rd in markup, no order
                </TextContent>
              </Grid.Col>
            </Grid>
          ),
        },
      ]}
    />
  )
}
