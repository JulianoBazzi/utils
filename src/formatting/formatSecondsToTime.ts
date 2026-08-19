const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Format a number of seconds as a clock string. Negative values are treated as
 * positive and fractions are rounded to whole seconds. With `showSeconds = false`
 * the seconds component is dropped. Pure arithmetic (no clock/timezone
 * involved), so hours keep counting past 24 (`90000` → `"25:00:00"`).
 *
 * @example
 * formatSecondsToTime(3661) // "01:01:01"
 * formatSecondsToTime(3661, false) // "01:01"
 * formatSecondsToTime(90000) // "25:00:00"
 */
export function formatSecondsToTime(value?: number | null, showSeconds = true): string {
  const total = value && Number.isFinite(value) ? Math.round(Math.abs(value)) : 0;

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const base = `${pad(hours)}:${pad(minutes)}`;
  return showSeconds ? `${base}:${pad(seconds)}` : base;
}
