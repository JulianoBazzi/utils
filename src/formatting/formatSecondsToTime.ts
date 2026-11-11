import { presentNumber } from '../number/internal/presentNumber.js';
import { resolveOptions } from './internal/resolveOptions.js';

export interface FormatSecondsToTimeOptions {
  /** Include the seconds component. Takes precedence over `showSeconds`. Defaults to `true`. */
  seconds?: boolean;
  /** Legacy name of `seconds`. */
  showSeconds?: boolean;
  /**
   * Show the sign: `'negative'` prefixes `-` to negative values,
   * `'always'` also prefixes `+` to positive ones. Defaults to none — the sign
   * is dropped and negatives read as positive.
   */
  signed?: 'negative' | 'always';
  /** Returned for missing or non-finite input. Defaults to the formatted zero (`"00:00:00"`). */
  fallback?: string;
}

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Format a number of seconds as a clock string. Fractions are rounded to whole
 * seconds. Pure arithmetic (no clock/timezone involved), so hours keep
 * counting past 24 (`90000` → `"25:00:00"`). The sign is dropped unless
 * `signed` is set.
 *
 * @example
 * formatSecondsToTime(3661) // "01:01:01"
 * formatSecondsToTime(3661, { seconds: false }) // "01:01"
 * formatSecondsToTime(-3600, { signed: "negative" }) // "-01:00:00"
 * formatSecondsToTime(90000) // "25:00:00"
 */
export function formatSecondsToTime(
  value?: number | null,
  showSecondsOrOptions: boolean | FormatSecondsToTimeOptions = true,
): string {
  const {
    seconds,
    showSeconds = true,
    signed,
    fallback,
  } = resolveOptions<FormatSecondsToTimeOptions, 'showSeconds'>(
    showSecondsOrOptions,
    'showSeconds',
  );
  const withSeconds = seconds ?? showSeconds;

  const number = presentNumber(value);
  if (number === undefined && fallback !== undefined) {
    return fallback;
  }

  const total = Math.round(Math.abs(number ?? 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const base = `${pad(hours)}:${pad(minutes)}`;
  const clock = withSeconds ? `${base}:${pad(total % 60)}` : base;

  if (!signed || total === 0 || number === undefined) {
    return clock;
  }
  if (number < 0) {
    return `-${clock}`;
  }
  return signed === 'always' ? `+${clock}` : clock;
}
