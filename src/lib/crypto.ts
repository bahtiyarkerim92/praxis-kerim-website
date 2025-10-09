import crypto from 'crypto';

const key = Buffer.from(process.env.DATA_ENCRYPTION_KEY || '', 'base64');
if (key.length !== 32) throw new Error('DATA_ENCRYPTION_KEY must be 32 bytes (base64-encoded)');

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decrypt(data: string): string {
  const b = Buffer.from(data, 'base64');
  const iv = b.subarray(0, 12);
  const tag = b.subarray(12, 28);
  const encrypted = b.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}
