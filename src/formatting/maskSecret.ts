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
 * without giving away the whole string.
 *
 * @example
 * maskSecret("$2y$10$AbCdEfGhIjKlMnOp") // "$2y$1••••••lMnOp"
 * maskSecret("short") // "••••••"
 * maskSecret("abcdefghijkl", { visibleStart: 2, visibleEnd: 2, mask: "***" }) // "ab***kl"
 */
export function maskSecret(value?: string | null, options: MaskSecretOptions = {}): string {
  const { visibleStart = 5, visibleEnd = 5, mask = '••••••' } = options;

  if (value == null || value === '') {
    return '';
  }

  const text = String(value);

  if (text.length <= visibleStart + visibleEnd) {
    return mask;
  }

  return `${text.slice(0, visibleStart)}${mask}${text.slice(-visibleEnd)}`;
}
