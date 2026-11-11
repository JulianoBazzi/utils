import { presentNumber } from '../number/internal/presentNumber.js';
import { roundTo } from '../number/internal/round.js';

export interface FormatMillisecondsOptions {
  /** Decimal places of the seconds. Defaults to `1`. */
  decimals?: number;
  /** From one minute on, show `"1m 2,3s"` instead of `"62,3s"`. Defaults to `false`. */
  showMinutes?: boolean;
  /** Locale of the seconds. Defaults to `"pt-BR"` (decimal comma). */
  locale?: string;
  /** Returned for missing or non-finite input. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a duration in milliseconds as seconds, e.g. `2345` → `"2,3s"`.
 * Seconds are truncated, never rounded up, so `59999` with `showMinutes`
 * reads `"59,9s"` rather than `"60,0s"`. Negatives keep their sign; `0` is
 * formatted.
 *
 * @example
 * formatMilliseconds(2345) // "2,3s"
 * formatMilliseconds(62345, { showMinutes: true }) // "1m 2,3s"
 * formatMilliseconds(2345, { decimals: 3, locale: "en" }) // "2.345s"
 */
export function formatMilliseconds(
  milliseconds?: number | null,
  options: FormatMillisecondsOptions = {},
): string {
  const { decimals = 1, showMinutes = false, locale = 'pt-BR', fallback = '' } = options;
  const value = presentNumber(milliseconds);
  if (value === undefined) {
    return fallback;
  }

  const total = Math.abs(value);
  const minutes = showMinutes ? Math.floor(total / 60_000) : 0;
  const seconds = roundTo((total - minutes * 60_000) / 1000, decimals, 'floor');
  const formatted = seconds.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const sign = value < 0 && (minutes > 0 || seconds > 0) ? '-' : '';
  return minutes > 0 ? `${sign}${minutes}m ${formatted}s` : `${sign}${formatted}s`;
}
