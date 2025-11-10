import { HeadingText } from "react-tailwind";
import { DocsPageLayout } from "../../components/DocsPageLayout";

const HeadingTextDocsPage = () => {
  return (
    <DocsPageLayout
      component="HeadingText"
      description="The HeadingText component provides a consistent set of typographic styles for different heading levels, ensuring visual hierarchy and readability throughout your application."
      examples={[
        {
          title: "Basic Usage",
          description: "The HeadingText object includes predefined heading levels such as Title, SubTitle, SubTitle2, SubTitle3, and SubTitle4.",
          code: `
<HeadingText.Title>Heading Level 1 (Title)</HeadingText.Title>
<HeadingText.SubTitle>Heading Level 2 (SubTitle)</HeadingText.SubTitle>
<HeadingText.SubTitle2>Heading Level 3 (SubTitle2)</HeadingText.SubTitle2>
<HeadingText.SubTitle3>Heading Level 4 (SubTitle3)</HeadingText.SubTitle3>
<HeadingText.SubTitle4>Heading Level 5 (SubTitle4)</HeadingText.SubTitle4>
          `,
          render: (
            <div className="space-y-2">
              <HeadingText.Title>Heading Level 1 (Title)</HeadingText.Title>
              <HeadingText.SubTitle>Heading Level 2 (SubTitle)</HeadingText.SubTitle>
              <HeadingText.SubTitle2>Heading Level 3 (SubTitle2)</HeadingText.SubTitle2>
              <HeadingText.SubTitle3>Heading Level 4 (SubTitle3)</HeadingText.SubTitle3>
              <HeadingText.SubTitle4>Heading Level 5 (SubTitle4)</HeadingText.SubTitle4>
            </div>
          ),
        },
        {
          title: "With Custom Class Names",
          description: "You can add a `className` prop to customize the typography or color styles for each heading level.",
          code: `
<HeadingText.Title className="text-indigo-600">
  Custom Styled Title
</HeadingText.Title>
<HeadingText.SubTitle className="text-green-500">
  Custom Styled SubTitle
</HeadingText.SubTitle>
          `,
          render: (
            <div className="space-y-2">
              <HeadingText.Title className="text-indigo-600">
                Custom Styled Title
              </HeadingText.Title>
              <HeadingText.SubTitle className="text-green-500">
                Custom Styled SubTitle
              </HeadingText.SubTitle>
            </div>
          ),
        },
      ]}
    />
  );
};

export default HeadingTextDocsPage;
