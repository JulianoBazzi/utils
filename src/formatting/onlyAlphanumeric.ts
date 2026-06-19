/**
 * Strip every non-alphanumeric character and uppercase the result.
 * Returns an empty string for missing input.
 *
 * @example
 * onlyAlphanumeric("12.abc-345") // "12ABC345"
 * onlyAlphanumeric("a@b#c") // "ABC"
 */
export function onlyAlphanumeric(value?: string | null): string {
  if (!value) return "";
  return value.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
}
