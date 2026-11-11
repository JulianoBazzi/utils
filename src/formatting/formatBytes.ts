import { presentNumber } from '../number/internal/presentNumber.js';
import { applyCasing, type LetterCasing } from './applyCasing.js';
import { resolveOptions } from './internal/resolveOptions.js';

export interface FormatBytesOptions {
  /** Round to a whole number of units (`"2 KB"`). Defaults to `false` (2 decimals). */
  round?: boolean;
  /**
   * Locale for the number (`"pt-BR"` → `"1,50 KB"`). Defaults to the legacy
   * dot-decimal output (`"1.50 KB"`); the default becomes `"pt-BR"` in 2.0.
   */
  locale?: string;
  /** Letter casing of the output. Defaults to none. */
  casing?: LetterCasing;
  /** Returned for missing or non-finite input. Defaults to `"0 Bytes"`. */
  fallback?: string;
}

const UNITS = [
  { size: 1024 ** 3, label: 'GB' },
  { size: 1024 ** 2, label: 'MB' },
  { size: 1024, label: 'KB' },
];

/**
 * Format a byte count as a human-readable size (`1536` → `"1.50 KB"`). The
 * unit is picked from the absolute value, so negatives keep their sign
 * (`-1536` → `"-1.50 KB"`).
 *
 * @example
 * formatBytes(1536) // "1.50 KB"
 * formatBytes(1536, { round: true }) // "2 KB"
 * formatBytes(1536, { locale: "pt-BR" }) // "1,50 KB"
 * formatBytes(1536, { casing: "lowercase" }) // "1.50 kb"
 */
export function formatBytes(
  bytes?: number | null,
  roundOrOptions: boolean | FormatBytesOptions = false,
): string {
  const {
    round = false,
    locale,
    casing,
    fallback = '0 Bytes',
  } = resolveOptions<FormatBytesOptions, 'round'>(roundOrOptions, 'round');

  const number = presentNumber(bytes);
  if (number === undefined) {
    return fallback;
  }

  const unit = UNITS.find(({ size }) => Math.abs(number) >= size);
  if (!unit) {
    return applyCasing(`${number} Bytes`, casing);
  }

  const size = number / unit.size;
  const digits = round ? 0 : 2;
  const formatted = locale
    ? size.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : round
      ? String(Math.round(size))
      : size.toFixed(2);

  return applyCasing(`${formatted} ${unit.label}`, casing);
}
