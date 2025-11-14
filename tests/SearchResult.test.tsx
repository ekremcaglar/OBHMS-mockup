import * as sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';

describe('SearchResult component', () => {
  it('should sanitize HTML to prevent XSS attacks', () => {
    const maliciousInput = '<img src="x" onerror="alert(\'XSS\')" />';
    const rawHtml = marked.parse(maliciousInput);
    const sanitizedOutput = sanitizeHtml(rawHtml);

    const dom = new JSDOM(sanitizedOutput);
    const img = dom.window.document.querySelector('img');

    expect(img).toBeNull();
  });
});
