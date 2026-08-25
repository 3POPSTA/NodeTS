import crypto from 'node:crypto';

export interface HashedPasswordResult {
  salt: string;
  hash: string;
}

function hashPassword(password: string): HashedPasswordResult {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');

  return { salt, hash };
}

function verifyPassword(password: string, salt: string, hash: string): boolean {
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  return hashedPassword === hash;
}

const password = 'mySecurePassword';
const { salt, hash } = hashPassword(password);
console.log('Salt:', salt);
console.log('Hash:', hash);

const isValid = verifyPassword(password, salt, hash);
console.log('Password valid:', isValid); // true

const isInvalid = verifyPassword('wrongPassword', salt, hash);
console.log('Wrong password valid:', isInvalid);

export { hashPassword, verifyPassword };
