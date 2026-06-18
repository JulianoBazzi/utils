/**
 * Return the last character of a string, or an empty string when missing.
 *
 * @example
 * getLastCharacter("hello") // "o"
 */
export function getLastCharacter(value?: string): string {
  if (value && value.length > 0) {
    return value.charAt(value.length - 1);
  }

  return "";
}
