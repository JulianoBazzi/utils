/** Always sent, so the opened page can never reach back through `window.opener`. */
const SECURITY_FEATURES = 'noopener,noreferrer';

export interface OpenInNewTabOptions {
  /** Browsing context name. Defaults to `"_blank"`. */
  target?: string;
  /** Extra `window.open` features, appended after the mandatory security ones. */
  features?: string;
}

/**
 * Open a URL in a new tab with `noopener,noreferrer` always applied — the
 * reason this exists, since a plain `window.open` hands the opened page a
 * reference back through `window.opener`. Pairs with the URL builders
 * (`buildWhatsAppUrl`, `buildEmailUrl`), which only assemble the link.
 *
 * Returns what `window.open` returns. Because `noopener` is always set, modern
 * browsers return `null` even when the tab opened, so the result cannot tell a
 * blocked popup from a successful one. Safe to call during SSR and with an
 * empty URL: both return `null`.
 *
 * @example
 * openInNewTab(buildWhatsAppUrl("11912345678"))
 * openInNewTab("https://example.com", { features: "width=600,height=400" })
 */
export function openInNewTab(
  url?: string | null,
  options: OpenInNewTabOptions = {},
): Window | null {
  if (!url || typeof window === 'undefined') {
    return null;
  }

  const { target = '_blank', features } = options;

  return window.open(
    url,
    target,
    features ? `${SECURITY_FEATURES},${features}` : SECURITY_FEATURES,
  );
}
