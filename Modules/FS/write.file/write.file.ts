import fs from 'node:fs/promises';

// Using fs.writeFile()
async function writeFileExample(): Promise<void> {
  try {
    const data = { name: 'John', age: 30, city: 'New York' };
    await fs.writeFile('myfile.txt', 'write myfile', 'utf8');
    await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8');
    console.log('Files written successfully');
  } catch (error: unknown) {
    console.log('Error writing files:', error);
  }
}

writeFileExample();

export { writeFileExample };
