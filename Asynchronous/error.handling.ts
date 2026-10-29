import fs from 'node:fs';
import http from 'node:http';

// System Error
fs.readFile('non.txt', (err, _data) => {
  if (err) {
    console.error(err.code); // ENOENT
  }
});

const req = http.get('http://nonexistent-site.invalid', (_res) => {});
req.on('error', (err: NodeJS.ErrnoException) => {
  console.error(err.code);
});

// Error-First Callback
function readConfigFile<T = unknown>(
  filename: string,
  callback: (err: Error | null, config?: T) => void
): void {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return callback(new Error(`Config file ${filename} not found`));
      } else if (err.code === 'EACCES') {
        return callback(new Error(`No permission to read ${filename}`));
      }
      return callback(err);
    }

    try {
      const config = JSON.parse(data) as T;
      callback(null, config);
    } catch (_parseError) {
      callback(new Error(`Invalid JSON in ${filename}`));
    }
  });
}

// Usage
readConfigFile('config.json', (err, config) => {
  if (err) {
    console.error('Failed to read config:', err.message);
    return;
  }
  console.log('Config loaded successfully:', config);
});

export { readConfigFile };
