/**
 * Type-safe property accessor.
 *
 * @example
 * getProperty({ id: 1, name: "x" }, "name") // "x" (typed as string)
 */
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
