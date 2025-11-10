export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">React Tailwind UI</h1>
      <p className="text-gray-600">
        A reusable React + Tailwind component library.
      </p>

      <h2 className="text-xl font-semibold">Installation</h2>
      <pre className="bg-gray-100 rounded-md p-4 text-sm">
        pnpm add react-tailwind @headlessui/react tailwind-merge
      </pre>

      <h2 className="text-xl font-semibold">Setup</h2>
      <p>Add this to your Tailwind CSS entry:</p>
      <pre className="bg-gray-100 rounded-md p-4 text-sm">
        @import "tailwindcss";{'\n'}
        @import "react-tailwind/react-tailwind.css";{'\n'}
        @source "./node_modules/react-tailwind/dist";
      </pre>

      <h2 className="text-xl font-semibold">Usage</h2>
      <p>That's it — now you can import components:</p>
      <pre className="bg-gray-100 p-4 rounded-md">
        import { 'Button' } from "my-lib";{'\n'}{'\n'}
        {`<Button>Click me</Button>`}
      </pre>
    </div>
  );
}
