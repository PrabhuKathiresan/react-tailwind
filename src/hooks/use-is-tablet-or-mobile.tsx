import { useIsMobile } from './use-is-mobile'
import { useIsTablet } from './use-is-tablet'

export const useIsTabletOrMobile = () => {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  return isMobile || isTablet
}
