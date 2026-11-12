'use strict';
/**
 * A small, strict XML reader for well-formed documents such as Microsoft Project MSPDI files.
 *
 * Supported: elements, attributes (quoted), text, CDATA, comments, processing instructions and the five predefined
 * entities plus numeric character references. Not supported, and refused: DOCTYPE declarations (so no external or
 * custom entities can be declared, which removes the entity-expansion and external-reference attacks), and any
 * markup that is not well formed. Limits on depth and element count bound the work done on untrusted input.
 */
const MAX_DEPTH = 64;
const MAX_ELEMENTS = 100000;
const NAME = '[A-Za-z_][\\w.\\-:]*';
const START_TAG = new RegExp(`<(${NAME})((?:\\s+${NAME}\\s*=\\s*(?:"[^"]*"|'[^']*'))*)\\s*(\\/?)>`, 'y');
const ATTRIBUTE = new RegExp(`(${NAME})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'g');
const PREDEFINED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

class XmlError extends Error {
  constructor(message) {
    super(message);
    this.name = 'XmlError';
  }
}

function decode(text) {
  return text.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (whole, ref) => {
    if (ref[0] === '#') {
      const code = ref[1] === 'x' ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10);
      if (!Number.isInteger(code) || code < 1 || code > 0x10ffff) throw new XmlError(`Invalid character reference ${whole}`);
      return String.fromCodePoint(code);
    }
    if (!Object.prototype.hasOwnProperty.call(PREDEFINED, ref)) throw new XmlError(`Unknown entity ${whole}`);
    return PREDEFINED[ref];
  });
}

/** Parses an XML document into { name, attrs, children, text } nodes. The returned root is the document node. */
function parseXml(input) {
  if (typeof input !== 'string') throw new XmlError('The XML document must be text.');
  if (/<!DOCTYPE/i.test(input)) throw new XmlError('DOCTYPE declarations are not accepted.');

  const document = { name: '#document', attrs: {}, children: [], text: '' };
  const stack = [document];
  let elements = 0;
  let pos = 0;

  while (pos < input.length) {
    const top = stack[stack.length - 1];
    if (input.startsWith('<!--', pos)) {
      const end = input.indexOf('-->', pos + 4);
      if (end < 0) throw new XmlError('Unterminated comment.');
      pos = end + 3;
    } else if (input.startsWith('<![CDATA[', pos)) {
      const end = input.indexOf(']]>', pos + 9);
      if (end < 0) throw new XmlError('Unterminated CDATA section.');
      top.text += input.slice(pos + 9, end);
      pos = end + 3;
    } else if (input.startsWith('<?', pos)) {
      const end = input.indexOf('?>', pos + 2);
      if (end < 0) throw new XmlError('Unterminated processing instruction.');
      pos = end + 2;
    } else if (input.startsWith('</', pos)) {
      const end = input.indexOf('>', pos);
      if (end < 0) throw new XmlError('Unterminated end tag.');
      const name = input.slice(pos + 2, end).trim();
      if (stack.length === 1 || top.name !== name) throw new XmlError(`Unexpected end tag </${name}>.`);
      stack.pop();
      pos = end + 1;
    } else if (input[pos] === '<') {
      START_TAG.lastIndex = pos;
      const match = START_TAG.exec(input);
      if (!match) throw new XmlError(`Malformed tag at position ${pos}.`);
      elements += 1;
      if (elements > MAX_ELEMENTS) throw new XmlError('The document has too many elements.');
      const attrs = {};
      ATTRIBUTE.lastIndex = 0;
      let attr;
      while ((attr = ATTRIBUTE.exec(match[2])) !== null) {
        attrs[attr[1]] = decode(attr[2] !== undefined ? attr[2] : attr[3]);
      }
      const node = { name: match[1], attrs, children: [], text: '' };
      top.children.push(node);
      if (match[3] !== '/') {
        if (stack.length > MAX_DEPTH) throw new XmlError('The document is nested too deeply.');
        stack.push(node);
      }
      pos = START_TAG.lastIndex;
    } else {
      const next = input.indexOf('<', pos);
      const end = next < 0 ? input.length : next;
      top.text += decode(input.slice(pos, end));
      pos = end;
    }
  }

  if (stack.length !== 1) throw new XmlError(`Unclosed element <${stack[stack.length - 1].name}>.`);
  return document;
}

/** Child elements of a node with the given name (direct children only). */
function childrenNamed(node, name) {
  return node.children.filter((c) => c.name === name);
}

/** Text of the first direct child with the given name, trimmed; undefined when absent. */
function childText(node, name) {
  const found = node.children.find((c) => c.name === name);
  return found === undefined ? undefined : found.text.trim();
}

/** Escapes text for use in element content or a double-quoted attribute. */
function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = { parseXml, childrenNamed, childText, escapeXml, XmlError, MAX_ELEMENTS };
