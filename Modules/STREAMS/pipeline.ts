import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';

async function compress(): Promise<void> {
  try {
    await pipeline(
      fs.createReadStream('input.txt'),
      zlib.createGzip(),
      fs.createWriteStream('input.txt.gz')
    );
    console.log('compression successfully');
  } catch (error: unknown) {
    console.log('Pipeline failed:', error);
  }
}

compress();

export { compress };
