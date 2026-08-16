import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { promisify } from 'node:util';

// Reading a file with callbacks
fs.readFile('myfile.txt', 'utf8', (error: NodeJS.ErrnoException | null, data?: string) => {
  if (error) {
    console.log('Error reading file:', error.message);
    return;
  }
  console.log('File content:', data);
});

// Reading Files with Promises
async function readFileExample(): Promise<void> {
  try {
    const data = await fsp.readFile('myfile.txt', 'utf8');
    console.log(data);
  } catch (error: unknown) {
    console.log('Error reading file:', error);
  }
}
readFileExample();

// Reading file with util.promisify
const readFileAsync = promisify(fs.readFile);

async function readWithPromisify(): Promise<void> {
  try {
    const data = await readFileAsync('myfile.txt', 'utf8');
    console.log(data);
  } catch (error: unknown) {
    console.log(error);
  }
}
readWithPromisify();

export { readFileExample, readWithPromisify };
