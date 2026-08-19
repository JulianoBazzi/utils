/**
 * Recursively copy a value, dropping the ignored keys and sorting object keys,
 * so two structurally equal objects serialize to the same string regardless of
 * the order their keys were inserted in. Array order is preserved, since
 * position is meaningful there.
 */
export function normalizeForDiff(value: unknown, ignored: ReadonlySet<string>): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeForDiff(item, ignored));
  }

  if (value === null || typeof value !== 'object') {
    return value;
  }

  const entries = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(entries).sort()) {
    if (!ignored.has(key)) {
      result[key] = normalizeForDiff(entries[key], ignored);
    }
  }

  return result;
}
