import { URL, URLSearchParams } from 'node:url';

// Basic URL using WHATWG URL API
const myUrl = new URL('https://example.org:8080/p/a/t/h?query=string#hash');
console.log(myUrl);
console.log('Hostname:', myUrl.hostname);
console.log('Host:', myUrl.host);
console.log('Query param:', myUrl.searchParams.get('query'));

// URLSearchParams API
const queryUrl = new URL('https://example.com/?name=Kai&age=30');
const params = new URLSearchParams(queryUrl.search);
console.log('Name:', params.get('name'));
params.append('city', 'Stavanger');

// Validate and Sanitize URLs
function isValidHttpUrl(str: string): boolean {
  try {
    const parsed = new URL(str);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_error) {
    return false;
  }
}

console.log('Is valid:', isValidHttpUrl('https://example.com'));

export { isValidHttpUrl, myUrl, queryUrl, params };
