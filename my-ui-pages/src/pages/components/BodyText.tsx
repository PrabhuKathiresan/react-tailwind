import { BodyText } from "react-tailwind";
import { DocsPageLayout } from "../../components/DocsPageLayout";

export default function BodyTextDocsPage() {
  const examples = [
    {
      title: "Default Usage",
      description:
        "The BodyText component is used for rendering readable text blocks with consistent typography and spacing.",
      render: (
        <div className="space-y-2">
          <BodyText>
            This is the default body text used for content paragraphs.
          </BodyText>
          <BodyText>
            You can apply additional styling using utility props like `small`, `muted`, or `strong`.
          </BodyText>
        </div>
      ),
      code: `
<BodyText>
  This is the default body text used for content paragraphs.
</BodyText>
<BodyText>
  You can apply additional styling using utility props like \`small\`, \`muted\`, or \`strong\`.
</BodyText>`,
    },
    {
      title: "Typography Variants",
      description: "Use the props `small`, `strong`, or both to adjust font size and weight.",
      render: (
        <div className="space-y-2">
          <BodyText small>This is small text.</BodyText>
          <BodyText strong>This is strong text.</BodyText>
          <BodyText small strong>
            This is small and strong text.
          </BodyText>
        </div>
      ),
      code: `
<BodyText small>This is small text.</BodyText>
<BodyText strong>This is strong text.</BodyText>
<BodyText small strong>
  This is small and strong text.
</BodyText>`,
    },
    {
      title: "Muted & Error States",
      description:
        "The `muted` prop makes text less prominent, while `error` highlights text in red to indicate issues.",
      render: (
        <div className="space-y-2">
          <BodyText muted>This text is muted for secondary information.</BodyText>
          <BodyText error>This text indicates an error or warning.</BodyText>
        </div>
      ),
      code: `
<BodyText muted>This text is muted for secondary information.</BodyText>
<BodyText error>This text indicates an error or warning.</BodyText>`,
    },
    {
      title: "Inline Mode",
      description:
        "Set `inline` to make BodyText behave as an inline element — useful for labels or combining with icons.",
      render: (
        <div className="space-y-2">
          <BodyText inline>
            <span role="img" aria-label="info">ℹ️</span> Inline info text
          </BodyText>
          <BodyText inline strong>
            <span role="img" aria-label="check">✅</span> Inline success text
          </BodyText>
        </div>
      ),
      code: `
<BodyText inline>
  <span role="img" aria-label="info">ℹ️</span> Inline info text
</BodyText>
<BodyText inline strong>
  <span role="img" aria-label="check">✅</span> Inline success text
</BodyText>`,
    },
    {
      title: "Custom Element Rendering",
      description:
        "Use the `as` prop to render BodyText as a different element, such as `span`, `div`, or even a heading.",
      render: (
        <div className="space-y-2">
          <BodyText as="span">Rendered as a span.</BodyText>
          <BodyText as="div" muted>
            Rendered as a div with muted text.
          </BodyText>
          <BodyText as="h4" strong>
            Rendered as an h4 with strong text.
          </BodyText>
        </div>
      ),
      code: `
<BodyText as="span">Rendered as a span.</BodyText>
<BodyText as="div" muted>
  Rendered as a div with muted text.
</BodyText>
<BodyText as="h4" strong>
  Rendered as an h4 with strong text.
</BodyText>`,
    },
  ];

  return (
    <DocsPageLayout
      component="BodyText"
      description="BodyText provides a consistent and flexible way to render text content, supporting typography variants and semantic elements."
      examples={examples}
    />
  );
}
