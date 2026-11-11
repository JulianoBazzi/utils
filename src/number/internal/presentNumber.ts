/**
 * The library's "absent number" rule: `null`, `undefined`, `NaN` and
 * `±Infinity` are absent (returns `undefined`); every finite number — `0`
 * included — is present.
 *
 * @internal
 */
export function presentNumber(value?: number | null): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

/**
 * Turn `-0` into `0`, so a rounded tiny negative never renders as `"-0,00"`.
 *
 * @internal
 */
export function normalizeZero(value: number): number {
  return value === 0 ? 0 : value;
}
