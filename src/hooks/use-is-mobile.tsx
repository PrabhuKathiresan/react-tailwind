import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const detect = () => {
      const width = window.innerWidth

      const isTouch =
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1) ||
        (typeof window !== 'undefined' &&
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(pointer: coarse)').matches)

      setIsMobile(width < 600 && isTouch)
    }

    detect()
    window.addEventListener('resize', detect)
    return () => window.removeEventListener('resize', detect)
  }, [])

  return isMobile
}
