import type { QuerySource } from '../types.js';
import { FORBIDDEN_KEYS } from './forbiddenKeys.js';

/**
 * Normalize any {@link QuerySource} into a fresh `URLSearchParams`. Object
 * sources skip `undefined` values and prototype keys.
 *
 * @internal
 */
export function toSearchParams(source: QuerySource): URLSearchParams {
  if (!source) {
    return new URLSearchParams();
  }
  if (typeof source === 'string') {
    return new URLSearchParams(source.startsWith('?') ? source.slice(1) : source);
  }
  if (source instanceof URLSearchParams) {
    return new URLSearchParams(source);
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(source)) {
    if (FORBIDDEN_KEYS.has(key) || value === undefined) {
      continue;
    }
    for (const item of typeof value === 'string' ? [value] : value) {
      params.append(key, item);
    }
  }
  return params;
}
