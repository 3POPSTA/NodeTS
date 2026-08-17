import fs from 'node:fs/promises';

async function renameFile(): Promise<void> {
  const oldPath = 'old-name.txt';
  const newPath = 'new-name.txt';

  try {
    await fs.access(oldPath);

    try {
      await fs.access(newPath);
      console.log('Destination file already exists');
      return;
    } catch (_error) {
      // Destination doesn't exist, proceed
    }

    await fs.rename(oldPath, newPath);
    console.log('File renamed successfully');
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      console.log('source file does not exist');
    } else {
      console.log('Error renaming file:', error);
    }
  }
}

renameFile();

export { renameFile };
