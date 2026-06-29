import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value or delay changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useDebounceFn = (fn: (...args: any[]) => void, ms: number) => {
  const timeout = useRef<any>(null)

  useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [])

  return useCallback(
    (...args: any[]) => {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => fn(...args), ms)
    },
    [fn, ms],
  )
}
