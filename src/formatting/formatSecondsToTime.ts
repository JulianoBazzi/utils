import dayjs from 'dayjs';

/**
 * Format a number of seconds as a clock string. Negative values are treated as
 * positive. With `showSeconds = false` the seconds component is dropped.
 *
 * @example
 * formatSecondsToTime(3661) // "01:01:01"
 * formatSecondsToTime(3661, false) // "01:01"
 */
export function formatSecondsToTime(value?: number, showSeconds = true): string {
  if (value) {
    const base = dayjs().startOf('day').add(Math.abs(value), 'seconds');
    return base.format(showSeconds ? 'HH:mm:ss' : 'HH:mm');
  }

  return showSeconds ? '00:00:00' : '00:00';
}
