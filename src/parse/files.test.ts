import { describe, expect, it } from 'vitest';
import { getFileKind } from './getFileKind.js';
import { getMimeType } from './getMimeType.js';
import { hasExtension } from './hasExtension.js';

describe('getMimeType', () => {
  it('maps extensions case-insensitively, ignoring query and hash', () => {
    expect(getMimeType('photo.WEBP')).toBe('image/webp');
    expect(getMimeType('scan.bmp')).toBe('image/bmp');
    expect(getMimeType('https://cdn/x.pdf?sig=1#p=2')).toBe('application/pdf');
  });

  it('returns the fallback for unknown or missing extensions', () => {
    expect(getMimeType('archive.rar')).toBe('application/octet-stream');
    expect(getMimeType('README', 'text/plain')).toBe('text/plain');
    expect(getMimeType(null)).toBe('application/octet-stream');
  });
});

describe('hasExtension', () => {
  it('matches with or without the dot, ignoring case, query and hash', () => {
    expect(hasExtension('report.PDF', ['pdf'])).toBe(true);
    expect(hasExtension('https://cdn/a.png?sig=1', ['.png', '.jpg'])).toBe(true);
    expect(hasExtension('a.gif', ['png'])).toBe(false);
  });

  it('returns false without an extension', () => {
    expect(hasExtension('notes', ['txt'])).toBe(false);
    expect(hasExtension(null, [''])).toBe(false);
  });
});

describe('getFileKind', () => {
  it('classifies by extension', () => {
    expect(getFileKind('photo.JPG')).toBe('image');
    expect(getFileKind('https://bucket/report.pdf?X-Amz-Signature=abc')).toBe('pdf');
    expect(getFileKind('voice.opus')).toBe('audio');
    expect(getFileKind('clip.mov')).toBe('video');
    expect(getFileKind('sheet.xlsx')).toBe('office');
    expect(getFileKind('mail.eml')).toBe('email');
    expect(getFileKind('README.md')).toBe('markdown');
    expect(getFileKind('server.log')).toBe('text');
  });

  it('returns "other" otherwise', () => {
    expect(getFileKind('archive.zip')).toBe('other');
    expect(getFileKind(undefined)).toBe('other');
  });
});
