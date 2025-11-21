import { Link } from 'react-router'
import { Button, TextContent } from '@pk-design/react-tailwind'
import ReactTailwindIcon from '../icons/ReactTailwindIcon'
import { LogoText } from './LogoText'
import { MenuIcon, MoonStarIcon, SearchIcon } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import GithubLogo from '../assets/github.svg?react'
import { useEffect, useState } from 'react'
import { SearchModal } from './SearchModal'

export default function Header() {
  const { setExpanded, toggleUiMode } = useAppContext()
  const [searchOpen, setSearchOpen] = useState(false)

  const uiModeBtn = (
    <Button
      theme="secondary"
      variant="plain"
      iconOnly
      aria-label="dark-mode-light-mode"
      onClick={() => toggleUiMode()}
    >
      <MoonStarIcon size={20} />
    </Button>
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <header className="fixed left-0 right-0 top-0 z-15 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between h-15">
        <div className="flex gap-1">
          <ReactTailwindIcon />
          <Link to="/" className="flex items-center space-x-2 font-semibold text-lg tracking-tight">
            <LogoText />
          </Link>
        </div>

        {/* Nav */}
        <nav className="items-center gap-4 hidden sm:flex shrink-0">
          <Button theme="secondary" size="sm" onClick={() => setSearchOpen(true)}>
            <SearchIcon className="size-4" />
            <TextContent className="text-gray-400">Search [⌘ + K]</TextContent>
          </Button>
          <Link
            to="/installation"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            Docs
          </Link>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            {uiModeBtn}
            <Button
              as="a"
              href="https://github.com/PrabhuKathiresan/react-tailwind"
              target="_blank"
              theme="secondary"
              variant="plain"
              iconOnly
              aria-label="github-logo"
            >
              <GithubLogo className="fill-gray-800 dark:fill-gray-200 size-5" />
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2 block md:hidden">
          {uiModeBtn}
          <Button
            variant="plain"
            theme="secondary"
            size="sm"
            rounded
            iconOnly
            onClick={() => setExpanded(true)}
            aria-label="open-menu"
          >
            <MenuIcon className="size-6" />
          </Button>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
