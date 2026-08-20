const name: string = 'Alice';
const age: number = 30;

const person = { name, age };
console.log(person);

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calculator: Calculator = {
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): number {
    return a - b;
  }
};

console.log(calculator.add(5, 3));

export { person, calculator };
