import { useEffect, useState } from 'react'
import { useSearch } from '../hooks/useSearch'
import { Link } from 'react-router'
import { SearchIcon, XIcon } from 'lucide-react'

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const results = useSearch(query)

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 mt-20">
        {/* Header */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <SearchIcon className="size-5 text-gray-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="flex-1 ml-2 bg-transparent outline-none text-gray-900 dark:text-gray-100"
          />
          <button onClick={onClose}>
            <XIcon className="size-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 && query.length > 0 && (
            <div className="p-4 text-gray-500 text-sm">No results found.</div>
          )}

          {results.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              onClick={onClose}
              className="block p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
              <div className="text-gray-500 text-sm">{item.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
