import SinglePokemon from "@/components/SinglePokemon";

interface IParams {
  slug: string;
  params: {
    slug: string;
  };
}

async function getPokemonByName(name: string) {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  return await res.json();
}

export default async function Pokemon({ params }: { params: Promise<IParams>}) {
  const slug = (await params).slug;

  const pokemonData = await getPokemonByName(slug);

  return (
    <div className="single-data-container">
      <SinglePokemon pokemonData={pokemonData} slug={slug} />
    </div>
  );
}
