import { useState, type ChangeEvent } from "react";
import { CheckboxGroup, type CheckboxGroupItem } from "react-tailwind";
import { DocsPageLayout } from "../../components/DocsPageLayout";

const getOptions = (idx: number): CheckboxGroupItem[] => ([
  { label: "Option 1", value: "opt1" + idx },
  { label: "Option 2", value: "opt2" + idx },
  { label: "Option 3", value: "opt3" + idx },
]);

export default function CheckboxGroupDocsPage() {
  const [selected, setSelected] = useState<Record<string, string[]>>({
    group3: ['opt13', 'opt33']
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(prev => {
      const prevGroup = prev[e.target.name] || [];
      // Create a fresh copy instead of mutating prevGroup
      let nextGroup: string[];
      if (e.target.checked) {
        // Add only if not already present
        nextGroup = [...new Set([...prevGroup, e.target.value])];
      } else {
        // Remove unchecked value
        nextGroup = prevGroup.filter(v => v !== e.target.value);
      }
      return {
        ...prev,
        [e.target.name]: nextGroup,
      };
    });
  }

  const examples = [
    {
      title: "Basic Checkbox Group",
      description: "A simple checkbox group using an array of items.",
      render: (
        <CheckboxGroup
          name="group1"
          options={getOptions(1)}
          value={selected.group1 || []}
          onChange={handleChange}
        />
      ),
      code: `
const [selected, setSelected] = useState<Record<string, string[]>>({
  group3: ['opt13', 'opt33']
})

const getOptions = (idx: number): CheckboxGroupItem[] => ([
  { label: "Option 1", value: "opt1" + idx },
  { label: "Option 2", value: "opt2" + idx },
  { label: "Option 3", value: "opt3" + idx },
]);

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  // handle setState here.
}

<CheckboxGroup
  name="group1"
  options={getOptions(1)}
  value={selected.group1 || []}
  onChange={handleChange}
/>`,
    },
    {
      title: "Checkbox Group with Label and Hint",
      description: "Add a label and hint for better accessibility and guidance.",
      render: (
        <CheckboxGroup
          name="group2"
          options={getOptions(2)}
          label="Select your options"
          labelHint="You can select multiple items"
          value={selected.group2 || []}
          onChange={handleChange}
        />
      ),
      code: `
<CheckboxGroup
  name="group2"
  options={getOptions(2)}
  label="Select your options"
  labelHint="You can select multiple items"
  value={selected.group2 || []}
  onChange={handleChange}
/>`,
    },
    {
      title: "Preselected Values",
      description: "You can set initial selected values using the `value` prop.",
      render: (
        <CheckboxGroup
          name="group3"
          options={getOptions(3)}
          value={selected.group3}
          onChange={handleChange}
        />
      ),
      code: `
<CheckboxGroup
  name="group3"
  options={getOptions(3)}
  value={selected.group3}
  onChange={handleChange}
/>`,
    },
    {
      title: "Custom Styling",
      description:
        "Override container, label wrapper, and label classes for custom styling.",
      render: (
        <CheckboxGroup
          name="group4"
          options={getOptions(4)}
          label="Styled options"
          containerClass="bg-gray-50 p-4 rounded-md"
          labelWrapperClass="flex items-center gap-2"
          labelClass="font-medium text-blue-600"
          value={selected.group4}
          onChange={handleChange}
        />
      ),
      code: `
<CheckboxGroup
  name="group4"
  options={getOptions(4)}
  label="Styled options"
  containerClass="bg-gray-50 p-4 rounded-md"
  labelWrapperClass="flex items-center gap-2"
  labelClass="font-medium text-blue-600"
  value={selected.group4}
  onChange={handleChange}
/>`,
    },
    {
      title: "Inline checkbox",
      description: "Display's checkbox inline",
      render: (
        <CheckboxGroup
          name="group5"
          options={getOptions(5)}
          value={selected.group5}
          onChange={handleChange}
          inline
          containerClass="mb-0"
          label="Displaying checkbox inline"
        />
      ),
      code: `
<CheckboxGroup
  name="group5"
  options={getOptions(5)}
  value={selected.group5}
  onChange={handleChange}
  inline
/>`,
    },
  ];

  return (
    <DocsPageLayout
      component="CheckboxGroup"
      description="CheckboxGroup allows rendering multiple checkboxes in a group with optional label, hint, and custom styling."
      examples={examples}
    />
  );
}
