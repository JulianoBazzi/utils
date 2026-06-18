/**
 * Check whether a string is a valid `http`/`https` URL.
 *
 * @example
 * isValidUrl("https://example.com") // true
 * isValidUrl("not a url") // false
 */
export function isValidUrl(value?: string): boolean {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
