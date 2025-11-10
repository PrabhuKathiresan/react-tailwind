import React from "react";
import { Drawer, Button } from "react-tailwind";
import { DocsPageLayout } from "../../components/DocsPageLayout";

/**
 * Drawer docs page — examples show controlled usage of Drawer.
 * Each example's `render` contains a small local component that manages isOpen.
 */

export default function DrawerDocsPage() {
  const examples = [
    {
      title: "Basic usage",
      description: "A simple controlled Drawer with title, content and close handler.",
      render: (
        <div>
          {/* local state inside render example */}
          <ExampleBasicDrawer />
        </div>
      ),
      code: `
function ExampleBasicDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Basic Drawer"
      >
        <div className="p-4">
          <p>This is content inside the drawer.</p>
        </div>
      </Drawer>
    </>
  );
}
      `.trim(),
    },
    {
      title: "Sizes",
      description: "Drawer supports multiple sizes. Try different `size` props.",
      render: (
        <div className="flex flex-wrap gap-3">
          <ExampleSizeDrawer size="sm" />
          <ExampleSizeDrawer size="md" />
          <ExampleSizeDrawer size="lg" />
        </div>
      ),
      code: `
<Drawer isOpen={open} onClose={...} size="sm" title="Small" />
<Drawer isOpen={open} onClose={...} size="md" title="Medium" />
<Drawer isOpen={open} onClose={...} size="lg" title="Large" />
      `.trim(),
    },
    {
      title: "Alignments",
      description: "Control where the drawer appears with `align` (top, bottom, start, end, center).",
      render: (
        <div className="flex flex-wrap gap-3">
          <ExampleAlignDrawer align="center" label="Center" />
          <ExampleAlignDrawer align="end" label="End" />
          <ExampleAlignDrawer align="start" label="Start" />
          <ExampleAlignDrawer align="top" label="Top" />
          <ExampleAlignDrawer align="bottom" label="Bottom" />
          <ExampleAlignDrawer align="top-center" label="Top-center" />
        </div>
      ),
      code: `
<Drawer isOpen={open} align="center" title="Center drawer" />
<Drawer isOpen={open} align="end" title="End drawer" />
<Drawer isOpen={open} align="start" title="Start drawer" />
<Drawer isOpen={open} align="top" title="Top drawer" />
<Drawer isOpen={open} align="bottom" title="Bottom drawer" />
<Drawer isOpen={open} align="top-center" title="Top-center drawer" />
      `.trim(),
    },
    {
      title: "Backdrop & Click outside",
      description:
        "Toggle backdrop with `backdrop`. When `backdrop` is true, clicking outside should close the drawer if you wire `onClose`.",
      render: <ExampleBackdropDrawer />,
      code: `
<Drawer isOpen={open} onClose={() => setOpen(false)} backdrop={true} title="With backdrop" />
      `.trim(),
    },
    {
      title: "Sticky title & Back button",
      description:
        "Use `titleSticky` to keep the title visible. `showBackButton` shows a back control — combine with a handler.",
      render: <ExampleStickyBackDrawer />,
      code: `
<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Drawer with back"
  titleSticky
  showBackButton
/>
      `.trim(),
    },
    {
      title: "Custom classes (panel/content/title)",
      description:
        "Customize drawer internals using `panelClass`, `contentClass`, and `titleClass` to fit your design system.",
      render: <ExampleCustomClassDrawer />,
      code: `
<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Styled Drawer"
  panelClass="rounded-lg shadow-2xl"
  contentClass="p-6"
  titleClass="text-lg font-semibold"
/>
      `.trim(),
    },
  ];

  return (
    <DocsPageLayout
      component="Drawer"
      description="Drawer presents a panel over the page. It's controlled with isOpen/onClose and supports size, alignment, backdrop, sticky title and back button."
      examples={examples}
    />
  );
}

/* -------------------------
   Example helper components
   ------------------------- */

function ExampleBasicDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Basic Drawer">
        <div className="p-4">
          <p className="text-sm text-gray-700">Drawer content goes here.</p>
          <div className="mt-4">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

function ExampleSizeDrawer({ size }: { size: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{size.toUpperCase()}</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        size={size as any}
        title={`Size: ${size}`}
      >
        <div className="p-4">Content for size {size}</div>
      </Drawer>
    </>
  );
}

function ExampleAlignDrawer({ align, label }: { align: any; label: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        align={align as any}
        title={`${label} drawer`}
      >
        <div className="p-4">Aligned: {align}</div>
      </Drawer>
    </>
  );
}

function ExampleBackdropDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open with backdrop</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        backdrop
        title="Backdrop Drawer"
      >
        <div className="p-4">
          <p>Click outside to trigger onClose (if implemented in Drawer).</p>
        </div>
      </Drawer>
    </>
  );
}

function ExampleStickyBackDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sticky</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Drawer with Back"
        titleSticky
        showBackButton
      >
        <div className="p-4">This drawer has sticky title and a back button.</div>
      </Drawer>
    </>
  );
}

function ExampleCustomClassDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open styled</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Styled Drawer"
        panelClass="rounded-2xl overflow-hidden shadow-xl"
        contentClass="p-6 bg-gray-50"
        titleClass="text-lg font-semibold text-slate-900"
      >
        <div>
          <p>Custom styled drawer panel & content</p>
        </div>
      </Drawer>
    </>
  );
}
