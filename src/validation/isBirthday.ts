import dayjs from 'dayjs';

/**
 * Check whether a date falls on today's day and month (a birthday).
 * Returns `false` for missing input.
 *
 * @example
 * isBirthday(new Date()) // true
 */
export function isBirthday(value?: Date): boolean {
  if (!value) {
    return false;
  }

  return dayjs(value).format('DD/MM') === dayjs().format('DD/MM');
}
