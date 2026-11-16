import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { AppContext, type UiModes } from './app-context'

const getUiModeFromLocal = (): UiModes => {
  const mode = localStorage.getItem('react-tailwind-ui-mode')
  return (mode && ['light', 'dark'].includes(mode) ? mode : 'light') as UiModes
}

const setUiModeToLocal = (mode: UiModes) => {
  localStorage.setItem('react-tailwind-ui-mode', mode)
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expanded, setExpanded] = useState(false)
  const [uiMode, setUiMode] = useState<'light' | 'dark'>(getUiModeFromLocal())
  const location = useLocation()
  const pathName = useRef(location.pathname)

  // A new page closes the menu (while rendering) and scrolls to the top (an effect).
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname)
    setExpanded(false)
  }

  useEffect(() => {
    if (pathName.current !== location.pathname) {
      pathName.current = location.pathname
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.add(uiMode)
    setUiModeToLocal(uiMode)
  }, [uiMode])

  const toggleUiMode = () => {
    setUiMode((prevUiMode) => {
      document.body.classList.remove(prevUiMode)
      return prevUiMode === 'dark' ? 'light' : 'dark'
    })
  }

  return (
    <AppContext.Provider
      value={{
        uiMode,
        toggleUiMode,
        expanded,
        setExpanded,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
