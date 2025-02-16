export const getDatasBySearch = async (search: string) => {
  const response = await fetch(
    `/api/pokemons?q=${search}`
  );
  if (!response.ok) throw new Error("Unable to fetch posts.");
  return response.json();
};

const limit = 48;
const endPoint = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;

export async function fetchAllDataWithPokemonImage() {
  const res = await fetch(endPoint);
  const { results } = await res.json();
  const data = results.map(
    (item: { name: string; url: string }, index: any) => {
      const pokemonId = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`;
      return { ...item, image };
    }
  );
  return data;
}

export async function fetchAllPokemonDetails() {
  const data = await fetchAllDataWithPokemonImage();
  const alldata = await Promise.all(
    data.map(async(item: { name: string; url: string, image: string }, index: any) => {
      const pokemonIndex = index + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
      const details = await res.json();
      return { ...item, details };
    })
  )
  return alldata;
}
