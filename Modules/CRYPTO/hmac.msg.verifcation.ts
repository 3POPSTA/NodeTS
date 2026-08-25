import crypto from 'node:crypto';

function createSignature(message: string, key: string): string {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(message);
  return hmac.digest('hex');
}

function verifySignature(message: string, signature: string, key: string): boolean {
  const expectedSignature = createSignature(message, key);

  const sigBuf = Buffer.from(signature, 'hex');
  const expectedBuf = Buffer.from(expectedSignature, 'hex');

  if (sigBuf.length !== expectedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

const secretKey = 'verySecretKey';
const message = 'Important message to verify';

const signature = createSignature(message, secretKey);
console.log('Message:', message);
console.log('Signature:', signature);

try {
  const isValid = verifySignature(message, signature, secretKey);
  console.log('Signature valid:', isValid);

  const isInvalid = verifySignature('Tampered message', signature, secretKey);
  console.log('Tampered message valid:', isInvalid);
} catch (error: unknown) {
  const messageText = error instanceof Error ? error.message : String(error);
  console.error('Verification error:', messageText);
}

export { createSignature, verifySignature };
