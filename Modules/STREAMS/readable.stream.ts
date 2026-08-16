import fs from 'node:fs';

const readableStream = fs.createReadStream('output.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024
});

readableStream.on('data', (chunk: string | Buffer) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  console.log(chunk);
});

readableStream.on('end', () => {
  console.log('No more data to read.');
});

readableStream.on('error', (error: Error) => {
  console.error('Error reading from stream:', error);
});

export { readableStream };
