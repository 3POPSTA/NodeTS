function fetchData(id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ID ${id}`), 1000);
  });
}

async function fetchSequential(): Promise<string[]> {
  console.log('sequential');
  const data1 = await fetchData(1);
  const data2 = await fetchData(2);
  const data3 = await fetchData(3);

  const results = [data1, data2, data3];
  console.log(results);
  return results;
}

fetchSequential();

export { fetchData, fetchSequential };
