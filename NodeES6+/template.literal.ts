// Basic string interpolation
const name: string = 'Alice';
console.log(`Hello, ${name}!`);

// Multi-line string
const message: string = `
  This is a multi-line
  string in TypeScript.
`;
console.log(message);

// Simple expression
const price: number = 10;
const tax: number = 0.2;
console.log(`Total: $${price * (1 + tax)}`);

export { name, message, price, tax };
