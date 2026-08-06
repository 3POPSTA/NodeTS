import fs from 'node:fs/promises';

async function deleteFile(): Promise<void> {
  const filePath = 'delete.txt';

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    console.log('File Deleted Successfully');
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      console.log('File does not exist');
    } else {
      console.error('Error deleting file:', err);
    }
  }
}

deleteFile();

export { deleteFile };
