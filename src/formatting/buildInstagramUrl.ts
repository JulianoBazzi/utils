interface BuildInstagramUrlOptions {
  /** Returned when the username is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Build an Instagram profile URL from a username. Trims and strips a leading `@`.
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

  return `https://instagram.com/${handle}`;
}
