import fs from 'node:fs';
import readline from 'node:readline';

async function readLargeFile(filePath: string): Promise<void> {
  const fileStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64 KB chunks
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // treat \r\n and \n the same
  });

  let lineCount = 0;

  for await (const line of rl) {
    lineCount++;
    console.log(line);
  }

  console.log(`Finished. Total lines: ${lineCount}`);
}

readLargeFile('large-file.txt').catch(console.error);

export { readLargeFile };
