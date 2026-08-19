import { downloadBlob } from './downloadBlob.js';

interface DownloadJsonOptions {
  /** Indentation passed to `JSON.stringify`. Defaults to `2`; use `0` to minify. */
  space?: number;
}

/**
 * Serialize a value as pretty-printed JSON and download it as a file.
 * Browser-only — see `downloadBlob`.
 *
 * @example
 * downloadJson({ a: 1 }, "backup.json");
 * downloadJson({ a: 1 }, "backup.json", { space: 0 });
 */
export function downloadJson(
  data: unknown,
  fileName: string,
  options: DownloadJsonOptions = {},
): void {
  const { space = 2 } = options;

  downloadBlob(
    new Blob([JSON.stringify(data, null, space)], { type: 'application/json' }),
    fileName,
  );
}
