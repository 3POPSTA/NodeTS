function fetchData(id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ID ${id}`), 1000);
  });
}

async function fetchParallel(): Promise<string[]> {
  console.log('Parallel');
  const results = await Promise.all([
    fetchData(1),
    fetchData(2),
    fetchData(3)
  ]);
  console.log(results);
  return results;
}

fetchParallel();

export { fetchData, fetchParallel };
