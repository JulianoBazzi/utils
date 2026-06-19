/**
 * Truncate text to `length` characters, appending an ellipsis when cut.
 * Returns an empty string for missing input.
 *
 * @example
 * truncate("a long sentence", 6) // "a long..."
 */
export function truncate(value?: string | null, length = 40): string {
  if (!value) return '';
  if (value.length > length) {
    return `${value.substring(0, length).trim()}...`;
  }
  return value;
}
