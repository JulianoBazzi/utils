import { parseIds } from './parseIds.js';
import { resolveIdsToObjects } from './resolveIdsToObjects.js';
import { toArray } from './toArray.js';

export interface ResolveListOptions {
  /** Drop the ids whose resolver rejects instead of rejecting the whole list. Defaults to `false`. */
  skipErrors?: boolean;
}

/**
 * Parse a comma-separated id string (or array of them) and resolve each id
 * into an object via an async `resolver`. Returns an empty array when no valid
 * id is found. `params` is forwarded to each resolver call. With
 * `skipErrors`, ids whose resolver rejects are left out (a deleted record no
 * longer breaks the whole filter).
 *
 * @example
 * resolveList("1,2", (id) => api.getUser(id)) // Promise<User[]>
 * resolveList(["1", "2"], (id) => api.getUser(id), undefined, { skipErrors: true })
 */
export async function resolveList<T, P = void>(
  value: string | Array<string | null | undefined> | null | undefined,
  resolver: (id: number, params?: P) => Promise<T>,
  params?: P,
  options: ResolveListOptions = {},
): Promise<T[]> {
  const ids = parseIds(...toArray(value));
  if (!options.skipErrors) {
    return resolveIdsToObjects(ids, resolver, params);
  }

  const results = await Promise.allSettled(ids.map((id) => resolver(id, params)));
  return results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
}
