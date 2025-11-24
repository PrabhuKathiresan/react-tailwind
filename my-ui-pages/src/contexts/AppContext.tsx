import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router'

type UiModes = 'light' | 'dark'
type AppContextType = {
  uiMode: UiModes
  toggleUiMode: () => void
  expanded: boolean
  setExpanded: Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextType>({
  uiMode: 'light',
  toggleUiMode: () => {},
  expanded: false,
  setExpanded: () => {},
})

export const useAppContext = () => useContext(AppContext)

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

  useEffect(() => {
    if (pathName.current !== location.pathname) {
      setExpanded(false)
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
