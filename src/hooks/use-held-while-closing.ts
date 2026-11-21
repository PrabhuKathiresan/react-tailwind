import { useState } from 'react'

const sameFields = (a: Record<string, unknown>, b: Record<string, unknown>) =>
  Object.keys(b).length === Object.keys(a).length &&
  Object.keys(b).every((key) => Object.is(a[key], b[key]))

/**
 * What an overlay showed while open, held through its closing transition. Callers usually
 * clear their state as they close it (the record being edited, the choices offered), and an
 * overlay that redrew with that cleared state while it faded out would flash its empty or
 * "new" form on the way out. Open, it returns the fields as given; closing, the last ones shown.
 * Fields are compared one by one, so it settles in the same render however the object is built.
 */
export function useHeldWhileClosing<T extends Record<string, unknown>>(
  isOpen: boolean,
  value: T,
): T {
  const [held, setHeld] = useState(value)
  if (isOpen && !sameFields(held, value)) setHeld(value)
  return isOpen ? value : held
}
