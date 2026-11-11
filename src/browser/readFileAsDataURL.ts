/**
 * Read a `File`/`Blob` as a `data:` URL (base64). Rejects with an `Error` when
 * the read fails.
 *
 * Browser-only — relies on `FileReader`.
 *
 * @example
 * const dataUrl = await readFileAsDataURL(file); // "data:image/png;base64,..."
 */
export function readFileAsDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}
