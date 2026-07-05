interface BuildEmailUrlOptions {
  /** Optional pre-filled subject (URL-encoded). */
  subject?: string;
  /** Optional pre-filled body (URL-encoded). */
  body?: string;
  /** Returned when the email is empty/missing. Defaults to `""`. */
  fallback?: string;
}

/**
 * Build a `mailto:` link. Trims the address; appends `subject`/`body` as
 * URL-encoded query params when provided. Empty email → `fallback`.
 *
 * @example
 * buildEmailUrl("foo@bar.com") // "mailto:foo@bar.com"
 * buildEmailUrl("foo@bar.com", { subject: "Oi" }) // "mailto:foo@bar.com?subject=Oi"
 * buildEmailUrl(null) // ""
 */
export function buildEmailUrl(email?: string | null, options: BuildEmailUrlOptions = {}): string {
  const { subject, body, fallback = '' } = options;
  const address = email?.trim();
  if (!address) {
    return fallback;
  }

  const params: string[] = [];
  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }

  return params.length ? `mailto:${address}?${params.join('&')}` : `mailto:${address}`;
}
