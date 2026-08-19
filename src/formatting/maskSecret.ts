interface MaskSecretOptions {
  /** Number of leading characters to keep visible. Defaults to `5`. */
  visibleStart?: number;
  /** Number of trailing characters to keep visible. Defaults to `5`. */
  visibleEnd?: number;
  /** Text used to replace the hidden middle. Defaults to `"••••••"`. */
  mask?: string;
}

/**
 * Partially mask a sensitive string, keeping the first and last characters
 * visible and hiding the middle. Useful to show that a secret exists (or
 * changed) without exposing it — e.g. a password hash in an audit log.
 *
 * Returns only the mask when the value is too short to reveal both ends
 * without giving away the whole string. `visibleStart`/`visibleEnd` are
 * clamped to non-negative integers, so `0` (or a negative) hides that side
 * entirely instead of leaking the value.
 *
 * @example
 * maskSecret("$2y$10$AbCdEfGhIjKlMnOp") // "$2y$1••••••lMnOp"
 * maskSecret("short") // "••••••"
 * maskSecret("abcdefghijkl", { visibleStart: 2, visibleEnd: 2, mask: "***" }) // "ab***kl"
 * maskSecret("abcdefghijkl", { visibleStart: 2, visibleEnd: 0, mask: "***" }) // "ab***"
 */
export function maskSecret(value?: string | null, options: MaskSecretOptions = {}): string {
  const { visibleStart = 5, visibleEnd = 5, mask = '••••••' } = options;

  if (value == null || value === '') {
    return '';
  }

  const text = String(value);
  const start = Math.max(0, Math.trunc(visibleStart) || 0);
  const end = Math.max(0, Math.trunc(visibleEnd) || 0);

  if (text.length <= start + end) {
    return mask;
  }

  // `slice(-0)` would return the whole string, so guard the zero case.
  const tail = end > 0 ? text.slice(-end) : '';

  return `${text.slice(0, start)}${mask}${tail}`;
}
