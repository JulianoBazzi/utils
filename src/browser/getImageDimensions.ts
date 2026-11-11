import { getFileExtension } from '../parse/getFileExtension.js';
import { readFileAsDataURL } from './readFileAsDataURL.js';

export interface ImageDimensions {
  width: number;
  height: number;
  /** From the file name, else the MIME type (`image/png` → `png`), else `"jpeg"`. */
  extension: string;
}

/**
 * Read the pixel dimensions of an image file, plus its extension. The
 * extension comes from the file name, falling back to the MIME subtype and
 * then `"jpeg"`, so a `Blob` named `"blob"` never reports `"blob"`.
 *
 * Browser-only — relies on `FileReader` and `Image`.
 *
 * @example
 * const { width, height, extension } = await getImageDimensions(file);
 */
export async function getImageDimensions(file: File): Promise<ImageDimensions> {
  const fail = () => new Error('Falha ao obter as dimensões da imagem.');
  const src = await readFileAsDataURL(file).catch(() => {
    throw fail();
  });

  const { width, height } = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(fail());
    img.src = src;
  });

  const extension = getFileExtension(file.name) || file.type.split('/')[1] || 'jpeg';
  return { width, height, extension };
}
