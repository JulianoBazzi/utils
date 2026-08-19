interface BuildLinkedInUrlOptions {
  /** `"profile"` → `/in/`, `"company"` → `/company/`. Defaults to `"profile"`. */
  type?: 'profile' | 'company';
  /** Returned when the handle is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Build a LinkedIn URL from a handle. Trims, strips a leading `@` and
 * URL-encodes the handle (so `?`, `#` or `/` can't alter the target path).
 * `type` selects a personal profile (`/in/`) or a company page (`/company/`).
 * Empty handle → `fallback`.
 *
 * @example
 * buildLinkedInUrl("julianobazzi") // "https://linkedin.com/in/julianobazzi"
 * buildLinkedInUrl("bazzi-solutions", { type: "company" }) // "https://linkedin.com/company/bazzi-solutions"
 * buildLinkedInUrl(null) // ""
 */
export function buildLinkedInUrl(
  handle?: string | null,
  options: BuildLinkedInUrlOptions = {},
): string {
  const { type = 'profile', fallback = '' } = options;
  const slug = handle?.trim().replace(/^@+/, '');
  if (!slug) {
    return fallback;
  }

  return `https://linkedin.com/${type === 'company' ? 'company' : 'in'}/${encodeURIComponent(slug)}`;
}
