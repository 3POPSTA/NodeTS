function someAsyncOperation(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Operation completed'), 2000);
  });
}

// Basic Async
async function getData(): Promise<string> {
  console.log('Starting.....');
  const result = await someAsyncOperation();
  console.log(`Result ${result}`);
  return result;
}

getData().then((data) => console.log('Final data: ', data));

export { getData, someAsyncOperation };
