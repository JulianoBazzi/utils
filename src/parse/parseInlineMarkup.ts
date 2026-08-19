/** A run of text sharing the same inline styles. */
export interface InlineMarkupSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface ParseInlineMarkupOptions {
  /** Single character delimiting bold runs. Defaults to `"*"`. */
  boldMarker?: string;
  /** Single character delimiting italic runs. Defaults to `"_"`. */
  italicMarker?: string;
}

type InlineMarkupStyle = Omit<InlineMarkupSegment, 'text'>;
type Markers = Required<ParseInlineMarkupOptions>;

function parseSegments(
  value: string,
  style: InlineMarkupStyle,
  markers: Markers,
): InlineMarkupSegment[] {
  const segments: InlineMarkupSegment[] = [];
  let buffer = '';

  function pushBuffer() {
    if (buffer) {
      segments.push({ ...style, text: buffer });
      buffer = '';
    }
  }

  for (let index = 0; index < value.length; index++) {
    const character = value.charAt(index);
    let marker: keyof InlineMarkupStyle | undefined;

    if (character === markers.boldMarker) {
      marker = 'bold';
    } else if (character === markers.italicMarker) {
      marker = 'italic';
    }

    // A marker only opens a run when the same character shows up again with at
    // least one character in between; otherwise it is literal text.
    const closingIndex = marker ? value.indexOf(character, index + 1) : -1;

    if (!marker || closingIndex <= index + 1) {
      buffer += character;
      continue;
    }

    pushBuffer();

    // The run stops at the *first* closing marker, so its body can never hold
    // that same marker again — which is why a third one reads as literal text.
    segments.push(
      ...parseSegments(
        value.slice(index + 1, closingIndex),
        marker === 'bold' ? { ...style, bold: true } : { ...style, italic: true },
        markers,
      ),
    );

    index = closingIndex;
  }

  pushBuffer();

  return segments;
}

/**
 * Parse WhatsApp-style inline markup — `*bold*`, `_italic_`, nestable — into a
 * flat list of styled segments. The output is UI-agnostic: rendering is the
 * caller's job.
 *
 * A marker stays literal when it never closes (`"2 * 3"`), when the run would
 * be empty (`"a ** b"`) and when it is the odd one out (`"*a*b*"`). Markers
 * must be single characters. Empty/missing input yields `[]`.
 *
 * @example
 * parseInlineMarkup("Olha o *aviso* aqui")
 * // [{ text: "Olha o " }, { bold: true, text: "aviso" }, { text: " aqui" }]
 * parseInlineMarkup("*_os dois_*") // [{ bold: true, italic: true, text: "os dois" }]
 * parseInlineMarkup("2 * 3 = 6") // [{ text: "2 * 3 = 6" }]
 */
export function parseInlineMarkup(
  value?: string | null,
  options: ParseInlineMarkupOptions = {},
): InlineMarkupSegment[] {
  if (!value) {
    return [];
  }

  const { boldMarker = '*', italicMarker = '_' } = options;

  return parseSegments(value, {}, { boldMarker, italicMarker });
}
