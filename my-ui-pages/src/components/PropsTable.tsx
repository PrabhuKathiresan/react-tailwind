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
  const [query, setQuery] = React.useState('')

  if (!propsData || propsData.length === 0) return null

  const filteredProps = propsData.filter((p) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      (p.raw ?? p.type).toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-2">
      {propsData.length >= 4 && (
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Filter props…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-48 transition-all"
          />
        </div>
      )}
      <div className="w-full overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg border-b-0">
        <Table layout="auto">
          <TableHead>
            <TableHeaderCell>Prop</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Default</TableHeaderCell>
            <TableHeaderCell>Required</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
          </TableHead>
          <TableBody colSize={5}>
            {filteredProps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-xs text-gray-500 py-6">
                  No props matching "{query}"
                </TableCell>
              </TableRow>
            ) : (
              filteredProps.map((p) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
