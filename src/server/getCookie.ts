/**
 * Where to read cookies from, structurally (no `next` import):
 * - a raw `Cookie` header string;
 * - a request with `headers.cookie` (`IncomingMessage` in `getServerSideProps`
 *   and API routes) or a `Headers` object (`NextRequest`, `Request`);
 * - Next's awaited `cookies()` store, or anything with `get(name)?.value`.
 */
export type CookieSource =
  | string
  | { headers: { cookie?: string | string[] } | { get(name: string): string | null } }
  | { get(name: string): { value: string } | undefined };

const decode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

function parseCookieHeader(header: string, name: string): string | undefined {
  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index > 0 && part.slice(0, index).trim() === name) {
      const raw = part.slice(index + 1).trim();
      const unquoted =
        raw.length > 1 && raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
      return decode(unquoted);
    }
  }
  return undefined;
}

function readHeader(
  headers: { cookie?: string | string[] } | { get(name: string): string | null },
): string | undefined {
  if ('get' in headers && typeof headers.get === 'function') {
    return headers.get('cookie') ?? undefined;
  }
  const { cookie } = headers as { cookie?: string | string[] };
  return Array.isArray(cookie) ? cookie.join('; ') : cookie;
}

/**
 * Read one cookie, URL-decoded (a malformed escape returns the raw value).
 * Without `source` it reads `document.cookie` in the browser and returns
 * `undefined` on the server. Values from a `cookies()` store are returned as
 * the store gives them (already decoded).
 *
 * @example
 * getCookie("token", context.req) // getServerSideProps
 * getCookie("token", await cookies()) // App Router
 * getCookie("token") // browser
 */
export function getCookie(name: string, source?: CookieSource): string | undefined {
  if (source === undefined) {
    return typeof document === 'undefined' ? undefined : parseCookieHeader(document.cookie, name);
  }
  if (typeof source === 'string') {
    return parseCookieHeader(source, name);
  }
  if ('headers' in source) {
    const header = readHeader(source.headers);
    return header ? parseCookieHeader(header, name) : undefined;
  }
  return source.get(name)?.value;
}
