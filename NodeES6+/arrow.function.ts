// Traditional function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function (same as above)
const addArrow = (a: number, b: number): number => a + b;

// Single parameter
const double = (num: number): number => num * 2;

// No parameters
const sayHello = (): string => 'Hello!';

// Using with array methods
const numbers: number[] = [1, 2, 3];
const doubled: number[] = numbers.map((num: number): number => num * 2);
console.log(doubled);

export { add, addArrow, double, sayHello, doubled };
