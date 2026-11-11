export interface IsSafeUrlOptions {
  /** Allowed schemes, with the colon. Defaults to `["http:", "https:", "mailto:", "tel:"]`. */
  protocols?: readonly string[];
  /** Accept URLs without a scheme (`/path`, `#anchor`, `?q=1`). Defaults to `true`. */
  allowRelative?: boolean;
}

const SCHEME = /^([a-z][a-z\d+.-]*):/i;

// Browsers ignore control characters and whitespace inside a scheme, so
// "java\tscript:" still runs. Drop them before looking at the scheme.
const stripIgnored = (value: string) =>
  [...value]
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code > 0x20 && (code < 0x7f || code > 0x9f);
    })
    .join('');

/**
 * Check whether a URL is safe to put in an `href`/`src`: its scheme must be in
 * `protocols` (by default `http:`, `https:`, `mailto:` and `tel:`), so
 * `javascript:`, `vbscript:` and `data:` are rejected, including obfuscated
 * forms such as `"java\tscript:"` or `" JAVASCRIPT:"`. Relative URLs are
 * accepted unless `allowRelative` is `false`.
 *
 * @example
 * isSafeUrl("https://example.com") // true
 * isSafeUrl("/settings") // true
 * isSafeUrl("javascript:alert(1)") // false
 * isSafeUrl("java\tscript:alert(1)") // false
 * isSafeUrl("data:text/html,...", { protocols: ["https:"] }) // false
 */
export function isSafeUrl(value?: string | null, options: IsSafeUrlOptions = {}): boolean {
  const { protocols = ['http:', 'https:', 'mailto:', 'tel:'], allowRelative = true } = options;
  const url = stripIgnored(value ?? '');
  if (!url) {
    return false;
  }

  const scheme = SCHEME.exec(url)?.[1];
  if (!scheme) {
    return allowRelative;
  }
  return protocols.some((protocol) => protocol.toLowerCase() === `${scheme.toLowerCase()}:`);
}
