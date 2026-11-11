/**
 * Turn one query value into its string form, or `undefined` to skip it:
 * `null`/`undefined` and invalid dates are skipped, a `Date` becomes ISO 8601,
 * a plain object becomes JSON, and everything else goes through `String`.
 *
 * @internal
 */
export function serializeQueryValue(value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}
