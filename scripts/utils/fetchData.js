export async function fetchData(path) {
  const response = await fetch(path);
  const data = await response.json();
  return data;
}
