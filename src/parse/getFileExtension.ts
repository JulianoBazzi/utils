/**
 * Extract a file's extension (without the dot) from a path or URL. Query
 * strings and hashes are stripped first and only the last path segment is
 * inspected, so a dot in the host or in a folder name never leaks into the
 * result. Missing input, a name without a dot and dotfiles all yield `""`.
 *
 * The original casing is preserved — lowercase it yourself when comparing.
 *
 * @example
 * getFileExtension("report.PDF") // "PDF"
 * getFileExtension("https://cdn.example.com/files/photo.jpg?token=abc") // "jpg"
 * getFileExtension("https://cdn.example.com/files/report") // ""
 * getFileExtension(".gitignore") // ""
 */
export function getFileExtension(value?: string | null): string {
  if (!value) {
    return '';
  }

  const path = value.replace(/[?#][\s\S]*$/, '');
  const fileName = path.slice(path.lastIndexOf('/') + 1);
  const dotIndex = fileName.lastIndexOf('.');

  // `-1` = no extension at all, `0` = a dotfile such as `.gitignore`.
  if (dotIndex <= 0) {
    return '';
  }

  return fileName.slice(dotIndex + 1);
}
