// Object Destructuring
interface User {
  name: string;
  age: number;
  location: string;
}

const user: User = {
  name: 'Alice',
  age: 30,
  location: 'Accra'
};

const { name, age, location } = user;
console.log(name, age, location);

// Array Destructuring
const colors: string[] = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first, second, third);

// Skipping elements
const [primary, , tertiary] = colors;
console.log(primary, tertiary);

export { user, colors, primary, tertiary };
