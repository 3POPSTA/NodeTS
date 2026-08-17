// Class Basics
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

const person = new Person('Mark', 25);
console.log(person.greet());

// Class Inheritance
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  override speak(): string {
    return `${this.name} barks!`;
  }
}

const dog = new Dog('Rex');
console.log(dog.speak());

// Private Class Fields
class Counter {
  #count: number = 0;

  increment(): void {
    this.#count++;
  }

  getCount(): number {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount());

export { Person, Animal, Dog, Counter };
