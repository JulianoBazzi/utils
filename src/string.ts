/**
 * Capitalize the first character of a string.
 *
 * @example
 * capitalize("hello") // "Hello"
 */
export function capitalize(value: string): string {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
