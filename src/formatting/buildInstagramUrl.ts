interface BuildInstagramUrlOptions {
  /** Returned when the username is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Build an Instagram profile URL from a username. Trims, strips a leading `@`
 * and URL-encodes the handle (so `?`, `#` or `/` can't alter the target path).
 * Empty username → `fallback`.
 *
 * @example
 * buildInstagramUrl("@julianobazzi") // "https://instagram.com/julianobazzi"
 * buildInstagramUrl(null) // ""
 */
export function buildInstagramUrl(
  username?: string | null,
  options: BuildInstagramUrlOptions = {},
): string {
  const { fallback = '' } = options;
  const handle = username?.trim().replace(/^@+/, '');
  if (!handle) {
    return fallback;
  }

  return `https://instagram.com/${encodeURIComponent(handle)}`;
}
