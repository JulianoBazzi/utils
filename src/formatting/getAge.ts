import dayjs from 'dayjs';

/**
 * Age in full years for a birth date, based on today. Returns `0` for
 * missing/invalid input or a birth date in the future.
 *
 * @example
 * getAge("1990-07-01") // e.g. 36
 * getAge() // 0
 */
export function getAge(birthDate?: Date | string | null): number {
  if (!birthDate) return 0;

  const birth = dayjs(birthDate);
  if (!birth.isValid()) return 0;

  const age = dayjs().diff(birth, 'year');
  return age < 0 ? 0 : age;
}
