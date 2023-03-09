const kPath = "data/recipes.json";

export async function fetchData() {
  const response = await fetch(kPath);
  const data = await response.json();
  return data;
}
