import fs from 'node:fs/promises';

async function writeWithFileHandle(): Promise<void> {
  let fileHandle: fs.FileHandle | undefined;

  try {
    fileHandle = await fs.open('output.txt', 'w');

    await fileHandle.write('First Line\n');
    await fileHandle.write('Second Line\n');
    await fileHandle.write('Third Line\n');

    console.log('Content written successfully');
  } catch (error: unknown) {
    console.error('Error writing to file:', error);
  } finally {
    if (fileHandle) {
      await fileHandle.close();
    }
  }
}

writeWithFileHandle();

export { writeWithFileHandle };
