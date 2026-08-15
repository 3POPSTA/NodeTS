import path from 'node:path';

// path.basename()
const filename = path.basename('/Users/user/Desktop/Nodejs/Modules/PATH/path.js');
console.log(filename);

// __dirname and __filename
console.log('Directory name: ', __dirname);
console.log('File path: ', __filename);
console.log('File name: ', path.basename(__filename));

const configPath = path.join(__dirname, 'config.json');
console.log(configPath);

// path.extname()
const extension = path.extname('file.txt');
console.log(extension);

// path.join()
const fullPath = path.join('/users', 'docs', 'file.txt');
console.log(fullPath);

// path.resolve()
console.log(path.resolve('file.txt'));
console.log(path.resolve('/users', 'docs', 'file.txt'));

// path.parse()
const pathInfo = path.parse(__filename);
console.log(pathInfo);

// path.format()
const formatted = path.format(pathInfo);
console.log(formatted);

export { filename, configPath, extension, fullPath, pathInfo, formatted };
