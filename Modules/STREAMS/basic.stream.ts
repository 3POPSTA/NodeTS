import fs from 'node:fs';

const readableStream = fs.createReadStream('input.txt', 'utf8');
const writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(writableStream);

writableStream.on('finish', () => {
  console.log('File copy completed');
});

readableStream.on('error', (error: Error) => {
  console.error('Error reading file:', error);
});

writableStream.on('error', (error: Error) => {
  console.error('Error writing file:', error);
});

export { readableStream, writableStream };
