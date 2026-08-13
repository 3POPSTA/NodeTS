// Spread Operator
// Array spread - combining arrays
const numbers: number[] = [1, 2, 3];
const moreNumbers: number[] = [4, 5, 6];
const combined: number[] = [...numbers, ...moreNumbers];
console.log(combined);

// Array spread - converting string to array of characters
const chars: string[] = [...'hello'];
console.log(chars);

// Rest Operator
// Rest parameter in functions
function sum(...nums: number[]): number {
  return nums.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));

export { combined, chars, sum };
