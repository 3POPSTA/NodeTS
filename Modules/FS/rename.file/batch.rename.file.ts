import fs from 'node:fs/promises';
import path from 'node:path';

async function batchRename(): Promise<void> {
  const directory = 'images';
  const pattern = /^image(\d+)\.jpg$/;

  try {
    const files = await fs.readdir(directory);

    for (const file of files) {
      const match = file.match(pattern);

      if (match) {
        const [, number] = match;
        const newName = `photo-${number.padStart(3, '0')}.jpg`;
        const oldPath = path.join(directory, file);
        const newPath = path.join(directory, newName);

        if (oldPath !== newPath) {
          await fs.rename(oldPath, newPath);
          console.log(`Renamed: ${file} - ${newName}`);
        }
      }
    }
    console.log('Batch rename completed');
  } catch (error: unknown) {
    console.error('Error during batch rename:', error);
  }
}

batchRename();

export { batchRename };
