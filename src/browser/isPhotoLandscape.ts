import { getImageDimensions } from "./getImageDimensions.js";

/**
 * Resolve whether an image is landscape (width > height). Accepts a `File` or
 * an image URL. Resolves `false` on any load error. Browser-only.
 *
 * @example
 * const landscape = await isPhotoLandscape(file);
 */
export async function isPhotoLandscape(img: File | string): Promise<boolean> {
  try {
    if (img instanceof File) {
      const dims = await getImageDimensions(img);
      return dims.width > dims.height;
    }

    return await new Promise((resolve) => {
      const el = new Image();
      el.onload = () => resolve(el.naturalWidth > el.naturalHeight);
      el.onerror = () => resolve(false);
      el.src = img;
    });
  } catch {
    return false;
  }
}
