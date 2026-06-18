/**
 * Return the last character of a string, or an empty string when missing.
 *
 * @example
 * getLastCharacter("hello") // "o"
 */
export function getLastCharacter(value?: string): string {
  return value ? value.slice(-1) : "";
}
