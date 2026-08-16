import fs from 'node:fs';

/**
 * The pipe() method connects a readable stream to a writable stream,
 * automatically managing the flow of data and handling backpressure.
 */
const readableStream = fs.createReadStream('input.txt');
const writableStream = fs.createWriteStream('destination.txt');

readableStream.pipe(writableStream);

readableStream.on('error', (error: Error) => {
  console.log('Read error:', error);
});

writableStream.on('error', (error: Error) => {
  console.error('Write error:', error);
});

writableStream.on('finish', () => {
  console.log('File copy completed!');
});

export { readableStream, writableStream };
