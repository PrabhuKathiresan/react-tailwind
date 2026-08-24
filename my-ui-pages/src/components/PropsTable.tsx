import React from 'react'
import {
  TableBody,
  TableHead,
  Table,
  TableCell,
  TableHeaderCell,
  TableRow,
  Badge,
} from '@pk-design/react-tailwind'

type PropItem = {
  name: string
  type: string
  raw?: string
  enumValues?: string[] | null
  required: boolean
  defaultValue: string | null
  description: string
}

export const PropsTable: React.FC<{ propsData?: PropItem[] }> = ({ propsData }) => {
  if (!propsData || propsData.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="w-full overflow-x-auto border border-[var(--ui-border)] rounded-lg border-b-0">
        <Table layout="auto">
          <TableHead>
            <TableHeaderCell>Prop</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Default</TableHeaderCell>
            <TableHeaderCell>Required</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
          </TableHead>
          <TableBody colSize={5}>
            {propsData.map((p) => (
              <TableRow key={p.name} hoverable>
                <TableCell className="align-top">
                  <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-[var(--ui-primary)] px-1.5 py-0.5 rounded whitespace-nowrap">
                    {p.name}
                  </code>
                </TableCell>

                <TableCell className="align-top">
                  {p.enumValues && p.enumValues.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {p.enumValues.map((v) => (
                        <Badge theme="secondary" key={v} className="text-xs font-mono">
                          {v}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <code className="text-xs text-slate-500 dark:text-slate-400">
                      {p.raw ?? p.type}
                    </code>
                  )}
                </TableCell>

                <TableCell className="align-top">
                  {p.defaultValue ? (
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                      {p.defaultValue}
                    </code>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </TableCell>

                <TableCell className="align-top">
                  {p.required ? (
                    <Badge theme="danger" className="text-xs">
                      Required
                    </Badge>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </TableCell>

                <TableCell className="align-top text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
                  {p.description || '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
