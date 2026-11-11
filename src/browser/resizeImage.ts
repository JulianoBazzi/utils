import { drawToCanvas } from './internal/drawToCanvas.js';
import { loadImageFromBlob } from './loadImageFromBlob.js';

export interface ResizeImageOptions {
  /** Longest edge of the result, in pixels. Smaller images are not upscaled. */
  maxEdge: number;
  /** Encoder quality (0–1) for lossy formats. Defaults to `0.9`. */
  quality?: number;
  /** Output format. Defaults to `"image/jpeg"`. */
  mimeType?: string;
  /** `"blob"` (default) or `"dataUrl"` (base64 string). */
  output?: 'blob' | 'dataUrl';
}

const ERROR = 'Não foi possível redimensionar a imagem.';

/**
 * Downscale an image file so its longest edge fits `maxEdge`, re-encoding it
 * (JPEG at 0.9 by default) — e.g. before uploading a photo. Always settles:
 * a decode or encode failure rejects with an `Error`.
 *
 * Browser-only — relies on `Image`, `canvas` and `URL.createObjectURL`.
 *
 * @example
 * const blob = await resizeImage(file, { maxEdge: 1600 });
 * const base64 = await resizeImage(file, { maxEdge: 960, quality: 0.75, output: "dataUrl" });
 */
export function resizeImage(
  file: Blob,
  options: ResizeImageOptions & { output: 'dataUrl' },
): Promise<string>;
export function resizeImage(
  file: Blob,
  options: ResizeImageOptions & { output?: 'blob' },
): Promise<Blob>;
export async function resizeImage(file: Blob, options: ResizeImageOptions): Promise<Blob | string> {
  const { maxEdge, quality = 0.9, mimeType = 'image/jpeg', output = 'blob' } = options;

  const image = await loadImageFromBlob(file).catch(() => {
    throw new Error(ERROR);
  });
  const canvas = drawToCanvas(
    image,
    { width: image.naturalWidth || image.width, height: image.naturalHeight || image.height },
    { maxEdge, errorMessage: ERROR },
  );

  if (output === 'dataUrl') {
    return canvas.toDataURL(mimeType, quality);
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error(ERROR))), mimeType, quality);
  });
}
