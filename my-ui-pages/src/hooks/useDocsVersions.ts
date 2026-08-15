import { useEffect, useState } from 'react'

export interface DocsVersionEntry {
  version: string
  date: string
  path: string
}

export interface DocsVersionsManifest {
  latest: string
  versions: DocsVersionEntry[]
}

const CURRENT_VERSION = __APP_VERSION__

export function useDocsVersions() {
  const [manifest, setManifest] = useState<DocsVersionsManifest | null>(null)

  useEffect(() => {
    fetch('/react-tailwind/versions.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: DocsVersionsManifest | null) => setManifest(data))
      .catch(() => setManifest(null))
  }, [])

  return {
    currentVersion: CURRENT_VERSION,
    latestVersion: manifest?.latest ?? CURRENT_VERSION,
    versions: manifest?.versions ?? [],
    isLatest: !manifest || manifest.latest === CURRENT_VERSION,
  }
}
