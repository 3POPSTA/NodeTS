import crypto from 'node:crypto';

const hash = crypto.createHash('sha256');
const hashResults: string = hash.update('Hello, Node.js').digest('hex');

console.log('SHA-256 Hash:', hashResults);

export { hashResults };
