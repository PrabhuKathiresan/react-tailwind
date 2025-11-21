import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'

export interface SearchItem {
  name: string
  description: string
  url: string
  keywords: string[]
  props: { name: string; type: string; description: string }[]
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchItem[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)

  useEffect(() => {
    fetch('/react-tailwind/search-index.json')
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        const f = new Fuse(data, {
          keys: [
            'name',
            'description',
            'keywords',
            'props.name',
            'props.type',
            'props.description',
          ],
          threshold: 0.3,
        })
        setFuse(f)
      })
  }, [])

  useEffect(() => {
    if (!query || !fuse) {
      setResults([])
      return
    }
    const matches = fuse.search(query).map((x) => x.item)
    setResults(matches)
  }, [query, fuse])

  return results
}
