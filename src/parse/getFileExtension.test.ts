import { describe, expect, it } from 'vitest';
import { getFileExtension } from './getFileExtension.js';

describe('getFileExtension', () => {
  it('extracts the extension from a plain file name', () => {
    expect(getFileExtension('report.pdf')).toBe('pdf');
  });

  it('preserves the original casing', () => {
    expect(getFileExtension('report.PDF')).toBe('PDF');
  });

  it('ignores the query string and the hash', () => {
    expect(getFileExtension('https://cdn.example.com/files/photo.jpg?token=abc')).toBe('jpg');
    expect(getFileExtension('/files/photo.jpg#preview')).toBe('jpg');
  });

  it('uses only the last path segment, so a dotted host never leaks', () => {
    expect(getFileExtension('https://cdn.example.com/files/report')).toBe('');
  });

  it('returns an empty string for dotfiles and names without a dot', () => {
    expect(getFileExtension('.gitignore')).toBe('');
    expect(getFileExtension('README')).toBe('');
  });

  it('returns an empty string for missing input', () => {
    expect(getFileExtension()).toBe('');
    expect(getFileExtension(null)).toBe('');
    expect(getFileExtension('')).toBe('');
  });

  it('keeps only the last extension of a double-barrelled name', () => {
    expect(getFileExtension('archive.tar.gz')).toBe('gz');
  });
});
