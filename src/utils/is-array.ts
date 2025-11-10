/**
 * Checks if a value is an array.
 * Equivalent to lodash's _.isArray.
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}
