/**
 * Resolve a list of ids into objects via an async `resolver`. Runs all
 * resolvers in parallel. Returns an empty array for an empty/missing list.
 * `params` is forwarded to each resolver call (generic, optional).
 *
 * @example
 * resolveIdsToObjects([1, 2], (id) => api.getUser(id)) // Promise<User[]>
 */
export async function resolveIdsToObjects<T, P = void>(
  ids: number[] | undefined,
  resolver: (id: number, params?: P) => Promise<T>,
  params?: P,
): Promise<T[]> {
  if (!ids?.length) {
    return [];
  }

  return Promise.all(ids.map((id) => resolver(id, params)));
}
