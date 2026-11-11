import { parseIds } from './parseIds.js';
import { toArray } from './toArray.js';

/**
 * Resolve the first valid id from a value (string, array, or `undefined`) into
 * an object via an async `resolver`. Returns `null` when no valid id is found.
 * `params` is forwarded to the resolver call.
 *
 * @example
 * resolveId("1", (id) => api.getUser(id)) // Promise<User | null>
 * resolveId(undefined, (id) => api.getUser(id)) // Promise<null>
 */
export async function resolveId<T, P = void>(
  value: string | Array<string | null | undefined> | null | undefined,
  resolver: (id: number, params?: P) => Promise<T>,
  params?: P,
): Promise<T | null> {
  const [id] = parseIds(...toArray(value));

  if (id === undefined) {
    return null;
  }

  return resolver(id, params);
}
