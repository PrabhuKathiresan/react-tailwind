import { isArray } from "./is-array";

/**
 * Checks if a value is empty.
 * Works for arrays, objects, strings, Maps, and Sets.
 * Equivalent to lodash's _.isEmpty.
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true; // null or undefined

  if (typeof value === "string" || isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false; // for numbers, booleans, functions, etc.
}
