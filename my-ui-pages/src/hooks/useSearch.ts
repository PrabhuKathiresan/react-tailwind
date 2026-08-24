import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'

export interface SearchItem {
  name: string
  description: string
  url: string
  keywords: string[]
  category?: string
  props: { name: string; type: string; description: string }[]
}

const CATEGORY_MAP: Record<string, string> = {
  // Mobile & Touch
  ActionSheet: 'Mobile & Touch',
  BottomNavigation: 'Mobile & Touch',
  DataList: 'Mobile & Touch',
  FloatingActionButton: 'Mobile & Touch',
  MobileHeader: 'Mobile & Touch',
  MobilePicker: 'Mobile & Touch',
  MobileStepper: 'Mobile & Touch',
  PinInput: 'Mobile & Touch',
  PullToRefresh: 'Mobile & Touch',
  SwipeableRow: 'Mobile & Touch',
  SwipeableTabs: 'Mobile & Touch',
  WheelPicker: 'Mobile & Touch',

  // Forms & Inputs
  Input: 'Forms & Inputs',
  Checkbox: 'Forms & Inputs',
  CheckboxGroup: 'Forms & Inputs',
  Radio: 'Forms & Inputs',
  RadioGroup: 'Forms & Inputs',
  SelectBox: 'Forms & Inputs',
  Textarea: 'Forms & Inputs',
  PasswordInput: 'Forms & Inputs',
  QuantityStepper: 'Forms & Inputs',
  RangeInput: 'Forms & Inputs',
  RangeSlider: 'Forms & Inputs',

  // Feedback & Overlays
  Toast: 'Feedback & Overlays',
  ToastProvider: 'Feedback & Overlays',
  Dialog: 'Feedback & Overlays',
  Drawer: 'Feedback & Overlays',
  Alert: 'Feedback & Overlays',
  Banner: 'Feedback & Overlays',
  Skeleton: 'Feedback & Overlays',

  // Navigation & Tabs
  Breadcrumb: 'Navigation & Tabs',
  Tabs: 'Navigation & Tabs',
  ButtonGroup: 'Navigation & Tabs',
  RadioSwitch: 'Navigation & Tabs',
  Pagination: 'Navigation & Tabs',
  StickyActionBar: 'Navigation & Tabs',

  // Data & Tables
  DataTable: 'Data & Tables',
  VirtualizedDataTable: 'Data & Tables',
  Card: 'Data & Tables',
  Table: 'Data & Tables',
  DetailedInformation: 'Data & Tables',
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchItem[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/'
    const fetchPath = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}search-index.json`

    fetch(fetchPath)
      .catch(() => fetch('/search-index.json'))
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        // Exclude internal helper sub-components from primary search results
        const filtered = data
          .filter(
            (item) =>
              ![
                'SubTitle',
                'SubTitle2',
                'SubTitle3',
                'SubTitle4',
                'Title',
                'getSortIcon',
                'evaluatePasswordStrength',
              ].includes(item.name),
          )
          .map((item) => ({
            ...item,
            category: CATEGORY_MAP[item.name] || 'Components',
          }))

        const f = new Fuse(filtered, {
          keys: [
            { name: 'name', weight: 0.4 },
            { name: 'category', weight: 0.3 },
            { name: 'keywords', weight: 0.2 },
            { name: 'description', weight: 0.1 },
          ],
          threshold: 0.4,
          ignoreLocation: true,
          useExtendedSearch: false,
        })
        setFuse(f)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!query || !fuse) {
      setResults([])
      return
    }

    const cleanQuery = query.trim()

    // Search both the raw query and individual tokens for multi-word queries like "form inputs"
    const searchTokens = cleanQuery.split(/\s+/).filter(Boolean)

    let matches: SearchItem[] = []

    if (searchTokens.length > 1) {
      // Collect matches from individual words and score by frequency
      const tokenMatchesMap = new Map<string, { item: SearchItem; count: number }>()

      searchTokens.forEach((token) => {
        const subResults = fuse.search(token)
        subResults.forEach((res) => {
          const existing = tokenMatchesMap.get(res.item.name)
          if (existing) {
            existing.count += 1
          } else {
            tokenMatchesMap.set(res.item.name, { item: res.item, count: 1 })
          }
        })
      })

      // Also run direct full query search
      const directMatches = fuse.search(cleanQuery).map((x) => x.item)

      // Sort items matching multiple tokens higher
      const sortedCombined = Array.from(tokenMatchesMap.values())
        .sort((a, b) => b.count - a.count)
        .map((x) => x.item)

      // Merge direct matches and token matches without duplicates
      const seen = new Set<string>()
      matches = [...directMatches, ...sortedCombined].filter((item) => {
        if (seen.has(item.name)) return false
        seen.add(item.name)
        return true
      })
    } else {
      matches = fuse.search(cleanQuery).map((x) => x.item)
    }

    setResults(matches)
  }, [query, fuse])

  return results
}
