import { useEffect, useState } from 'react'

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const detect = () => {
      const width = window.innerWidth

      const isTouch = navigator.maxTouchPoints > 1 || window.matchMedia('(pointer: coarse)').matches

      setIsTablet(width >= 600 && width <= 1024 && isTouch)
    }

    detect()
    window.addEventListener('resize', detect)
    return () => window.removeEventListener('resize', detect)
  }, [])

  return isTablet
}
