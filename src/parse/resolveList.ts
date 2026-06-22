import { parseIds } from './parseIds.js';
import { resolveIdsToObjects } from './resolveIdsToObjects.js';

/**
 * Parse a comma-separated id string (or array of them) and resolve each id
 * into an object via an async `resolver`. Returns an empty array when no valid
 * id is found. `params` is forwarded to each resolver call.
 *
 * @example
 * resolveList("1,2", (id) => api.getUser(id)) // Promise<User[]>
 */
export function resolveList<T, P = void>(
  value: string | Array<string | null | undefined> | null | undefined,
  resolver: (id: number, params?: P) => Promise<T>,
  params?: P,
): Promise<T[]> {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return resolveIdsToObjects(parseIds(...values), resolver, params);
}
