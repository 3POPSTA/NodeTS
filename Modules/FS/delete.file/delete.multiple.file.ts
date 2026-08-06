import fs from 'node:fs/promises';

async function deleteFiles(): Promise<void> {
  const filesToDelete: string[] = ['temp1.txt', 'temp2.txt', 'temp3.txt'];
  try {
    await Promise.all(
      filesToDelete.map((file) =>
        fs.unlink(file).catch((error: unknown) => {
          const err = error as NodeJS.ErrnoException;
          if (err.code !== 'ENOENT') {
            console.log(`Error deleting ${file}:`, error);
          }
        })
      )
    );
    console.log('Files deleted successfully');
  } catch (error: unknown) {
    console.error('Error during file deletion:', error);
  }
}

deleteFiles();

export { deleteFiles };
