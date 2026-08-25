import crypto from 'node:crypto';

const secretKey: string = 'mySecretKey';
const hmac = crypto.createHmac('sha256', secretKey);
hmac.update('Hello, Nodejs!');

const hmacDigest: string = hmac.digest('hex');
console.log('HMAC:', hmacDigest);

export { hmacDigest };
