import crypto from 'node:crypto';

const data: string = 'Hello, World!';

// MD5 (not recommended for security-critical applications)
const md5: string = crypto.createHash('md5').update(data).digest('hex');
console.log('MD5:', md5);

// SHA-1 (not recommended for security-critical applications)
const sha1: string = crypto.createHash('sha1').update(data).digest('hex');
console.log('SHA-1:', sha1);

// SHA-256
const sha256: string = crypto.createHash('sha256').update(data).digest('hex');
console.log('SHA-256:', sha256);

// SHA-512
const sha512: string = crypto.createHash('sha512').update(data).digest('hex');
console.log('SHA-512:', sha512);

export { md5, sha1, sha256, sha512 };
