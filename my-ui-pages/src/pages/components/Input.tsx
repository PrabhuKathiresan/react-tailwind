import { Input } from "react-tailwind";
import { DocsPageLayout } from "../../components/DocsPageLayout";

const InputDocsPage = () => {
  return (
    <DocsPageLayout
      component="Input"
      description="The Input component provides a styled text field with optional labels, hints, icons, and error messaging. It supports all standard HTML input attributes."
      examples={[
        {
          title: "Basic Usage",
          description: "A simple text input field with a label and placeholder.",
          code: `
<Input
  label="Username"
  placeholder="Enter your username"
/>
          `,
          render: (
            <div className="w-80">
              <Input label="Username" placeholder="Enter your username" />
            </div>
          ),
        },
        {
          title: "With Hint and Error",
          description:
            "You can display hints below the label and show an error message when validation fails.",
          code: `
<Input
  label="Email address"
  labelHint="We'll never share your email."
  placeholder="you@example.com"
  error="Invalid email address"
  showErrorMessage
/>
          `,
          render: (
            <div className="w-80 space-y-4">
              <Input
                label="Email address"
                labelHint="We'll never share your email."
                placeholder="you@example.com"
                error="Invalid email address"
                showErrorMessage
              />
            </div>
          ),
        },
        {
          title: "With Icons",
          description:
            "You can add icons or custom React nodes to the left or right of the input using `leftGroup` and `rightGroup` props.",
          code: `
<Input
  label="Search"
  placeholder="Search..."
  leftGroup={<span className="text-gray-400">🔍</span>}
/>

<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  rightGroup={<span className="text-gray-400 cursor-pointer">👁️</span>}
/>
          `,
          render: (
            <div className="w-80 space-y-4">
              <Input
                label="Search"
                placeholder="Search..."
                leftGroup={<span className="text-gray-400">🔍</span>}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                rightGroup={
                  <span className="text-gray-400 cursor-pointer">👁️</span>
                }
              />
            </div>
          ),
        },
      ]}
    />
  );
};

export default InputDocsPage;
