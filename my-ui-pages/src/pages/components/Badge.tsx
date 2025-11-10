import { Badge } from "react-tailwind";
import { XIcon } from "lucide-react";
import { DocsPageLayout } from "../../components/DocsPageLayout";

export default function BadgeDocsPage() {
  const examples = [
    {
      title: "Themes",
      description:
        "Badges are available in multiple color themes to convey different states or categories.",
      render: (
        <div className="flex gap-3 flex-wrap">
          <Badge theme="success">Success</Badge>
          <Badge theme="danger">Danger</Badge>
          <Badge theme="warning">Warning</Badge>
          <Badge theme="info">Info</Badge>
          <Badge theme="secondary">Secondary</Badge>
        </div>
      ),
      code: `
<Badge theme="success">Success</Badge>
<Badge theme="danger">Danger</Badge>
<Badge theme="warning">Warning</Badge>
<Badge theme="info">Info</Badge>
<Badge theme="secondary">Secondary</Badge>`,
    },
    {
      title: "Rounded Badges",
      description: "Add the `rounded` prop to create pill-like badges.",
      render: (
        <div className="flex gap-3 flex-wrap">
          <Badge theme="success" rounded>
            Success
          </Badge>
          <Badge theme="danger" rounded>
            Danger
          </Badge>
          <Badge theme="warning" rounded>
            Warning
          </Badge>
        </div>
      ),
      code: `
<Badge theme="success" rounded>Success</Badge>
<Badge theme="danger" rounded>Danger</Badge>
<Badge theme="warning" rounded>Warning</Badge>`,
    },
    {
      title: "Removable Badges",
      description:
        "When `removable` is true, the badge shows a close icon and can trigger `onRemove` when clicked.",
      render: (
        <div className="flex gap-3 flex-wrap">
          <Badge theme="info" removable onRemove={() => alert("Removed Info")}>
            Info
          </Badge>
          <Badge theme="success" removable onRemove={() => alert("Removed Success")}>
            Success
          </Badge>
          <Badge theme="danger" removable onRemove={() => alert("Removed Danger")}>
            Danger
          </Badge>
        </div>
      ),
      code: `
<Badge theme="info" removable onRemove={() => alert("Removed Info")}>Info</Badge>
<Badge theme="success" removable onRemove={() => alert("Removed Success")}>Success</Badge>
<Badge theme="danger" removable onRemove={() => alert("Removed Danger")}>Danger</Badge>`,
    },
    {
      title: "Badges with Icons or Custom Content",
      description:
        "Badges can contain icons or any custom children to match your design needs.",
      render: (
        <div className="flex gap-3 flex-wrap">
          <Badge theme="info">
            <XIcon className="size-4 mr-1" />
            Info
          </Badge>
          <Badge theme="warning" rounded>
            <span className="font-semibold mr-1">⚠</span>
            Warning
          </Badge>
          <Badge theme="success" removable>
            Done
          </Badge>
        </div>
      ),
      code: `
<Badge theme="info">
  <XIcon className="size-4 mr-1" /> Info
</Badge>

<Badge theme="warning" rounded>
  <span className="font-semibold ml-.5">⚠</span> Warning
</Badge>

<Badge theme="success" removable>
  Done
</Badge>`,
    },
  ];

  return (
    <DocsPageLayout
      component="Badge"
      description="Badges are used to display short status labels, categories, or dynamic information. They support different themes, optional rounded corners, and removable behavior with callbacks."
      examples={examples}
    />
  );
}
