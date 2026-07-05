import { describe, expect, it } from 'vitest';
import { sanitizeSpreadsheetCell } from './sanitizeSpreadsheetCell.js';

describe('sanitizeSpreadsheetCell', () => {
  it('prefixes a quote before dangerous leading characters', () => {
    expect(sanitizeSpreadsheetCell('=SUM(A1:A2)')).toBe("'=SUM(A1:A2)");
    expect(sanitizeSpreadsheetCell('+1')).toBe("'+1");
    expect(sanitizeSpreadsheetCell('-1')).toBe("'-1");
    expect(sanitizeSpreadsheetCell('@cmd')).toBe("'@cmd");
    expect(sanitizeSpreadsheetCell('\tx')).toBe("'\tx");
  });

  it('leaves safe values unchanged', () => {
    expect(sanitizeSpreadsheetCell('João')).toBe('João');
    expect(sanitizeSpreadsheetCell('123')).toBe('123');
  });

  it('returns empty string for missing input', () => {
    expect(sanitizeSpreadsheetCell()).toBe('');
    expect(sanitizeSpreadsheetCell(null)).toBe('');
  });
});
