import sanitizeHtml from 'sanitize-html';

const TAG_AMMESSI = ['p', 'br', 'strong', 'a', 'ul', 'li'];

export function sanificaTesto(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: TAG_AMMESSI,
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
    transformTags: {
      b: 'strong',
      a: (_tag, attribs) => {
        const href = attribs.href ?? '';
        const attributi: Record<string, string> = /^https?:/i.test(href)
          ? { href, target: '_blank', rel: 'noopener noreferrer' }
          : { href };
        return { tagName: 'a', attribs: attributi };
      },
    },
  }).trim();
}
