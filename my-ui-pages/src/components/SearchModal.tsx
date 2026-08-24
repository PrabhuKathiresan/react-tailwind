import { useEffect, useState, useRef } from 'react'
import { useSearch, type SearchItem } from '../hooks/useSearch'
import { Link, useNavigate } from 'react-router'
import {
  Search,
  X,
  ArrowRight,
  CornerDownLeft,
  Sparkles,
  Smartphone,
  Layers,
  ShieldCheck,
} from 'lucide-react'

const POPULAR_COMPONENTS: SearchItem[] = [
  {
    name: 'Button',
    description: 'Interactive button control with themes and loading states',
    url: '/button',
    category: 'Forms & Inputs',
    keywords: [],
    props: [],
  },
  {
    name: 'DataTable',
    description: 'Data table with sorting, pagination, and sticky headers',
    url: '/data-table',
    category: 'Data & Tables',
    keywords: [],
    props: [],
  },
  {
    name: 'MobileHeader',
    description: 'Top App Bar header with back navigation and search',
    url: '/mobile-header',
    category: 'Mobile & Touch',
    keywords: [],
    props: [],
  },
  {
    name: 'WheelPicker',
    description: 'iOS 3D scrollable wheel column date/time picker',
    url: '/wheel-picker',
    category: 'Mobile & Touch',
    keywords: [],
    props: [],
  },
  {
    name: 'PinInput',
    description: 'OTP passcode entry with SMS auto-fill and auto advance',
    url: '/pin-input',
    category: 'Mobile & Touch',
    keywords: [],
    props: [],
  },
  {
    name: 'SwipeableTabs',
    description: 'Touch swipeable tab container with synced header',
    url: '/swipeable-tabs',
    category: 'Mobile & Touch',
    keywords: [],
    props: [],
  },
]

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const results = useSearch(query)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const activeResults = query.trim().length > 0 ? results : POPULAR_COMPONENTS

  // Reset selectedIndex on query change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Scroll active item into view when navigating via arrow keys
  useEffect(() => {
    const el = itemRefs.current[selectedIndex]
    if (el) {
      el.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [selectedIndex])

  // Keyboard navigation & ESC handler
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < activeResults.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : activeResults.length - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const selected = activeResults[selectedIndex]
        if (selected) {
          navigate(selected.url)
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, activeResults, selectedIndex, navigate, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fadeIn">
      {/* Backdrop overlay listener */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 relative z-10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 p-4 gap-3">
          <Search className="size-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 50+ components, props, or features..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-medium"
          />
          {query.length > 0 ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Results Area */}
        <div className="overflow-y-auto flex-1 p-2 space-y-1 no-scrollbar">
          {query.trim().length === 0 && (
            <div className="px-3 py-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="size-3 text-amber-500" />
              <span>Popular Components</span>
            </div>
          )}

          {activeResults.length === 0 && query.trim().length > 0 && (
            <div className="p-8 text-center space-y-2">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                No matching components found for "{query}"
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Try searching for component names like "Button", "MobileHeader", "Table", or
                "Input".
              </p>
            </div>
          )}

          {activeResults.map((item, index) => {
            const isSelected = index === selectedIndex

            return (
              <Link
                key={`${item.name}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                to={item.url}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 text-left ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {item.category === 'Mobile & Touch' ? (
                      <Smartphone className="size-4" />
                    ) : item.category === 'Data & Tables' ? (
                      <Layers className="size-4" />
                    ) : (
                      <ShieldCheck className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {item.name}
                      </span>
                      {item.category && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 ml-3 flex items-center">
                  <ArrowRight
                    className={`size-4 transition-transform duration-150 ${
                      isSelected ? 'translate-x-0.5 text-blue-600 dark:text-blue-400' : 'opacity-0'
                    }`}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer Navigation Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-2.5 bg-gray-50/80 dark:bg-gray-900/80 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-mono shadow-2xs">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-mono shadow-2xs">
                ↓
              </kbd>
              <span className="ml-1">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-mono shadow-2xs flex items-center gap-0.5">
                <CornerDownLeft className="size-2.5" />
              </kbd>
              <span className="ml-1">Select</span>
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">50+</span> Components
          </div>
        </div>
      </div>
    </div>
  )
}
