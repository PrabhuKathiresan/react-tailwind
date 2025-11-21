export function get<T = any, R = any>(obj: T, path: string, defaultValue?: R): R {
  if (!path) return defaultValue as R

  const keys = path
    .replace(/\[(\d+)]/g, '.$1') // convert [0] to .0
    .split('.')
    .filter(Boolean) // remove empty parts

  return (
    keys.reduce<any>((acc, key) => {
      if (acc !== null && acc !== undefined && Object.prototype.hasOwnProperty.call(acc, key)) {
        return acc[key]
      }
      return undefined
    }, obj) ?? defaultValue
  )
}
