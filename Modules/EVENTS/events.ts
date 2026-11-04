import { EventEmitter } from 'node:events';

// Basic Event
const myEmitter = new EventEmitter();
myEmitter.on('greet', () => {
  console.log('Hello World');
});
myEmitter.emit('greet');

// Passing Arguments to Event Handlers
const userEmitter = new EventEmitter();
userEmitter.on('userJoined', (username: string, userId: number) => {
  console.log(`${username} (${userId}) has joined the chat`);
});
userEmitter.emit('userJoined', 'John Doe', 43);

// Handling Events Only Once
const connEmitter = new EventEmitter();
connEmitter.once('connection', () => {
  console.log('First connection established');
});
connEmitter.emit('connection');
connEmitter.emit('connection');

// Error Handling
const errorEmitter = new EventEmitter();
errorEmitter.on('error', (err: Error) => {
  console.error('An error occurred:', err.message);
});
errorEmitter.emit('error', new Error('Something went wrong'));

export { myEmitter, userEmitter, connEmitter, errorEmitter };
