// Using let (can be changed)
let score: number = 10;
score = 20;

// Using const (cannot be reassigned)
const MAX_USERS: number = 100;

// Block scope with let
if (true) {
  const message: string = 'Hello';
  console.log(message);
}

export { score, MAX_USERS };
