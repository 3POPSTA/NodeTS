import fs from 'node:fs/promises';

async function appendToFile(): Promise<void> {
  try {
    const logEntry = `${new Date().toISOString()}: Application started\n`;
    await fs.appendFile('app.log', logEntry, 'utf8');
    console.log('Log entry added');
  } catch (error: unknown) {
    console.error('Error appending to file:', error);
  }
}

appendToFile();

export { appendToFile };
