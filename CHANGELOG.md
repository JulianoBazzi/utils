# @julianobazzi/utils

## 1.2.0

### Minor Changes

- Add `date` and `url` modules, plus Portuguese month/weekday names and environment normalization.

  **New — `date` module** (inclusive `YYYY-MM-DD` windows for filters and pickers):

  - `getDateRange(days, { reference?, offset? })` — window of `days` days ending at `reference`
  - `getMonthRange(month, { reference? })` — full month range, clamped to `reference` while the month is ongoing
  - `getMonthOptions({ count?, reference?, min? })` — month picker list as `{ id, name }`

  **New — `url` module:**

  - `buildQueryParams(params?, { ignore?, prefix? })` — object to query string, arrays become repeated keys
  - `parseQueryParams(value?)` — the inverse; repeated keys become arrays

  **New — `formatting`:**

  - `getMonthName(value?, { short?, fallback?, casing? })` — e.g. `Julho` / `Jul`
  - `getWeekDayName(value?, { short?, fallback?, casing? })` — e.g. `Sábado` / `Sáb`
  - `formatEnvironment(value?)` — normalizes a `NODE_ENV` string to `NodeEnv`; unknown values fall back to `production`

  **Changed — `joinByKey`:**

  - New `unique` option drops duplicate values, keeping the first occurrence.
  - Values that are `null`, `undefined` or an empty string are now skipped instead of being rendered — previously a missing property produced the literal string `"undefined"` in the output. Falsy-but-meaningful values such as `0` are still included.

- Add four generators, closing the remaining validator/generator gaps.

  - `generateOTP({ length? })` — numeric one-time password, 6 digits by default, leading zeros preserved. Unlike the other generators it draws from the Web Crypto API (`globalThis.crypto.getRandomValues`) with rejection sampling, so the digits are uniformly distributed and the result is safe for production sign-in codes. Works in Node and the browser; no `node:crypto` import, so browser builds are unaffected.
  - `generateBoleto({ type?, formatted? })` — valid digitable line for bank slips (47 digits, default) and collection slips/arrecadação (48 digits). Reuses the same mod-10/mod-11 helpers `isValidBoleto` uses, so the round-trip holds by construction, formatted or not.
  - `generateEmail({ domain?, length? })` — valid address, defaulting to the RFC 2606 reserved `example.com` domain so a test can never send real mail.
  - `generateUF()` — random state code from the 27 federative units, typed as the literal union of the codes.

  `isValidUF` now reads its list from a shared internal constant instead of an inline regex — same behaviour, single source of truth with `generateUF`.

- Promote shared helpers out of the consumer apps: audit-log diffing/masking, file and inline-markup parsing, browser downloads and immutable array edits.

  **New — `transform`:**

  - `diffLines(before?, after?)` — line diff via longest common subsequence, returning `{ beforeLines, afterLines }` with each line flagged `changed`
  - `stripInlineMarkup(value?, { boldMarker?, italicMarker? })` — plain text without the `*`/`_` markers

  **New — `parse`:**

  - `parseInlineMarkup(value?, { boldMarker?, italicMarker? })` — WhatsApp-style `*bold*`/`_italic_` (nestable) into styled segments
  - `parseJson<T>(value?)` — `JSON.parse` returning `undefined` instead of throwing
  - `getFileExtension(value?)` — extension of a path/URL, ignoring `?query`/`#hash` and dotted hosts
  - `toStringArray(value)` — narrows an unknown value to `string[]`

  **New — `object`:**

  - `maskFields(value, fields, { mask? })` — deep-clone masking the string fields listed, at any depth (defaults to `maskSecret`)
  - `isEqualIgnoringKeys(a, b, keys)` — structural comparison ignoring volatile keys such as `updated_at`
  - `swapAtIndex(list, index, offset)` — immutable swap; out of bounds returns the same reference
  - `updateAtIndex(list, index, updater)` — copy with only one item replaced

  **New — `browser`:**

  - `openInNewTab(url?, { target?, features? })` — `window.open` with `noopener,noreferrer` always applied
  - `downloadBlob(blob, fileName)` / `downloadJson(data, fileName, { space? })` — file downloads

  **New — `formatting`:**

  - `getFirstAndLastWord(value?, { fallback?, casing? })` — keeps only the first and last word

  **Internal:** `isValidJson` is now implemented on top of `parseJson`; behaviour is unchanged.

### Patch Changes

- Security and robustness fixes from a full code audit.

  **Security**

  - `maskSecret`: `visibleEnd: 0` (or a negative value) used to return the **whole secret** because of `slice(-0)`; both counts are now clamped to non-negative integers and `0` hides that side entirely.
  - `parseQueryParams`: no longer confuses inherited `Object.prototype` members with existing keys (`?hasOwnProperty=x` returned `[Function, "x"]`) and skips `__proto__` / `constructor` / `prototype`, which could swap the result's prototype.
  - `buildEmailUrl`: the address is URL-encoded (keeping `@`), so `a@b.com?bcc=…` can no longer inject extra `mailto:` fields.
  - `buildInstagramUrl` / `buildFacebookUrl` / `buildLinkedInUrl`: the handle is URL-encoded, so `?`, `#` or `/` can't alter the target path.

  **Bug fixes**

  - `formatMinutesToDuration` / `formatSecondsToDuration` / `formatDuration`: round before splitting (`119.6` → `"2h"`, not `"1h e 60 min"`; `0.333` → `"20s"`); negatives are treated as positive.
  - `formatDate`, `formatDateTime`, `formatHour`, `formatMonth`, `formatWeekDay`, `formatTimeAgo`: invalid dates now return `fallback` instead of `"Invalid Date"` / `"1 mês"`; `formatTimeAgo` clamps future dates to `"1 minuto"`.
  - `formatSecondsToTime`: pure arithmetic (no clock/timezone/DST dependency); hours keep counting past 24 (`90000` → `"25:00:00"`, previously wrapped to `"01:00:00"`).
  - `parseIds`: entries are trimmed and only base-10 integers are kept — `"1,,2"` → `[1, 2]` (previously `[1, 0, 2]`), `"1e3"`/`"0x10"`/`"Infinity"` are dropped.
  - `formatCPF` / `formatPIS` / `formatPostalCode`: inputs longer than the document return plain digits instead of a half-masked string.
  - `precisionRound`: `1.005` → `1.01` (was `1`); non-finite input → `0`.
  - `isValidEmail`: accepts TLDs up to 63 letters (`.photography`, `.international`).
  - `isNotificationsSupported`: returns `false` during SSR instead of throwing.
  - `generateOTP`: non-finite `length` → `""` instead of a `RangeError`.
  - `abbreviateName`: blank input → `""`.

  **Tooling**

  - CI uses the pinned `packageManager` pnpm version; transitive dev-only advisories (postcss, nanoid) resolved via `pnpm-workspace.yaml` overrides.

- Update the `dayjs` runtime dependency to 1.11.23.
