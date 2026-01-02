import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const detect = () => {
      const width = window.innerWidth

      const isTouch = navigator.maxTouchPoints > 1 || window.matchMedia('(pointer: coarse)').matches

      setIsMobile(width < 600 && isTouch)
    }

    detect()
    window.addEventListener('resize', detect)
    return () => window.removeEventListener('resize', detect)
  }, [])

  return isMobile
}
