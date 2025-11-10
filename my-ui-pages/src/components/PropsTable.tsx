// src/components/PropsTable.tsx
import React from "react";
import { TabelBody, TabelHead, Table, TableCell, TableHeaderCell, TableRow, Tag } from "react-tailwind";

type PropItem = {
  name: string;
  type: string;
  raw?: string;
  enumValues?: string[] | null;
  required: boolean;
  defaultValue: string | null;
  description: string;
};

export const PropsTable: React.FC<{ propsData?: PropItem[] }> = ({ propsData }) => {
  if (!propsData || propsData.length === 0) return null;

  return (
    <Table layout="auto">
      <TabelHead>
        <TableHeaderCell>Prop</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
        <TableHeaderCell>Default</TableHeaderCell>
        <TableHeaderCell>Required</TableHeaderCell>
        <TableHeaderCell>Description</TableHeaderCell>
      </TabelHead>
      <TabelBody colSize={5}>
        {propsData.map((p) => (
          <TableRow key={p.name}>
            <TableCell className="align-top font-medium">{p.name}</TableCell>
            <TableCell className="align-top">
              <div className="text-xs text-slate-700 mb-1">
                <code>{p.raw ?? p.type}</code>
              </div>

              {p.enumValues && p.enumValues.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {p.enumValues.map((v) => (
                    <Tag
                      text={v}
                      key={v}
                      className="text-xs px-2 py-0.5 border rounded bg-gray-50"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500">
                  {/* show friendly description for common types */}
                  {p.type === "string" && <span>string</span>}
                  {p.type === "number" && <span>number</span>}
                  {p.type === "boolean" && <span>boolean</span>}
                  {p.type === "function" && <span>function</span>}
                  {/* fallback to raw */}
                  {!["string", "number", "boolean", "function"].includes(p.type) &&
                    !p.enumValues && <span>{p.raw}</span>}
                </div>
              )}
            </TableCell>

            <TableCell className="align-top">
              <code className="text-sm">{p.defaultValue ?? "-"}</code>
            </TableCell>
            <TableCell className="align-top">{p.required ? "Yes" : "No"}</TableCell>
            <TableCell className="align-top text-slate-700">{p.description || "-"}</TableCell>
          </TableRow>
        ))}
      </TabelBody>
    </Table>
  );
};
