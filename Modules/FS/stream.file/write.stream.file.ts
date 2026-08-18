import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

async function writeLargeFile(): Promise<void> {
  const data = Array.from(
    { length: 1000 },
    (_, i) => `Line ${i + 1}: ${'x'.repeat(100)}\n`
  );
  const readable = Readable.from(data);
  const writable = fs.createWriteStream('large-file.txt');

  try {
    await pipeline(readable, writable);
    console.log('Large file written successfully');
  } catch (error: unknown) {
    console.log('Error writing file:', error);
  }
}

writeLargeFile();

export { writeLargeFile };
