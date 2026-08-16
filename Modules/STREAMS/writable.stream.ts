import fs from 'node:fs';

const writableStream = fs.createWriteStream('input.txt');

writableStream.write('Hello\n');
writableStream.write('World!\n');

writableStream.end();

writableStream.on('finish', () => {
  console.log('All data has been written to the file.');
});

writableStream.on('error', (error: Error) => {
  console.error('Error writing to stream:', error);
});

export { writableStream };
