// Accessing Process Information
console.log(`Process ID (PID): ${process.pid}`);
console.log(`Platform: ${process.platform}`);
console.log(`Node.js version: ${process.version}`);
console.log('Memory usage:', process.memoryUsage());
console.log('Arguments:', process.argv);

// Handling Process Events
process.on('SIGINT', () => {
  console.log('\nGot SIGINT. Press Control-D to exit.');
});

process.on('beforeExit', (code: number) => {
  console.log('About to exit with code:', code);
});

export {};
