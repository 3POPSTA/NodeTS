// Basic Buffer
const buf: Buffer = Buffer.from('Hello, Node.js!');

console.log(buf);
console.log(buf.toString());
console.log(buf[0]); // 72 (ASCII for 'H')
console.log(buf.length);

// Buffer.alloc()
// Create a buffer of 10 bytes filled with zeros
const buffer: Buffer = Buffer.alloc(10);
console.log(buffer);

// Buffer.allocUnsafe()
const buffer2: Buffer = Buffer.allocUnsafe(10);
console.log(buffer2);

// Fill the buffer for security
buffer2.fill(1);
console.log(buffer2);

export { buf, buffer, buffer2 };
