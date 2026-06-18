interface ImageDimensions {
  width: number;
  height: number;
  extension: string;
}

/**
 * Read an image `File`'s pixel dimensions and extension.
 * Browser-only — relies on `FileReader` and the DOM `Image` API.
 *
 * @example
 * const { width, height, extension } = await getImageDimensions(file);
 */
export function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const fail = () => reject(new Error("Falha ao obter as dimensões da imagem."));
    const reader = new FileReader();

    reader.onerror = fail;
    reader.onload = (e) => {
      if (!e.target) {
        fail();
        return;
      }

      const img = new Image();
      img.onload = () => {
        const extension = file.name.split(".").pop();
        resolve({
          width: img.width,
          height: img.height,
          extension: extension || "jpeg",
        });
      };
      img.onerror = fail;
      img.src = e.target.result as string;
    };

    reader.readAsDataURL(file);
  });
}
