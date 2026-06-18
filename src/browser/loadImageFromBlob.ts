/**
 * Load a Blob into an `HTMLImageElement`, resolving once decoded.
 * Revokes the temporary object URL on both success and failure.
 * Browser-only — relies on the DOM `Image` and `URL` APIs.
 *
 * @example
 * const img = await loadImageFromBlob(blob);
 */
export function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(error);
    };

    img.src = url;
  });
}
