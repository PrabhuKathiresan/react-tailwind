import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'

export type UiModes = 'light' | 'dark'
export type AppContextType = {
  uiMode: UiModes
  toggleUiMode: () => void
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextType>({
  uiMode: 'light',
  toggleUiMode: () => {},
  expanded: false,
  setExpanded: () => {},
})

export const useAppContext = () => useContext(AppContext)
