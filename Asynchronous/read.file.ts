import fs from 'node:fs/promises';
import path from 'node:path';

// Basic File reading
async function readFile(): Promise<string | undefined> {
  try {
    const filePath = path.resolve(__dirname, 'myfile.txt');
    const fileData = await fs.readFile(filePath, 'utf8');
    console.log(fileData);
    return fileData;
  } catch (error) {
    console.error('Error reading file:', error);
    return undefined;
  }
}

readFile();

export { readFile };
