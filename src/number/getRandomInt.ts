/**
 * Return a random integer between `min` and `max` (both inclusive).
 * Defaults to the range 1–100.
 *
 * @example
 * getRandomInt() // e.g. 42
 * getRandomInt(1, 6) // dice roll
 */
export function getRandomInt(min = 1, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
