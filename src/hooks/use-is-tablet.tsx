import { useEffect, useState } from 'react'

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth < 768 && window.innerHeight > 960)

  useEffect(() => {
    function handleResize() {
      setIsTablet(window.innerWidth > 768 && window.innerHeight < 960)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isTablet
}
