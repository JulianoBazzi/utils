/**
 * Trigger a file download for a `Blob`, revoking the object URL afterwards.
 * The building block behind `downloadJson`, and equally suited to CSV, text,
 * PDF or ZIP payloads.
 *
 * Browser-only — relies on `URL.createObjectURL` and the DOM.
 *
 * @example
 * downloadBlob(new Blob(["a,b"], { type: "text/csv" }), "report.csv");
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;

  // Firefox only honours the click once the anchor is in the document.
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
