/** A value `buildQueryUrl` can write. Arrays become repeated keys. */
export type QueryValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | ReadonlyArray<string | number | boolean | Date | null | undefined>;

/**
 * Any query source found in a Next.js app: `URLSearchParams` (including
 * `ReadonlyURLSearchParams`), a query string with or without `?`, or an object
 * such as Pages Router `ParsedUrlQuery` / App Router `searchParams`.
 */
export type QuerySource =
  | URLSearchParams
  | string
  | Readonly<Record<string, string | readonly string[] | undefined>>
  | null
  | undefined;
