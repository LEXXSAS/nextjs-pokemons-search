import SinglePokemon from "@/components/SinglePokemon";
import { PockemonSingleAllDetails } from "@/main";
import { notFound } from "next/navigation";

async function getPokemonByName(slug: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`, {
    cache: 'force-cache'
  });
  const data: PockemonSingleAllDetails = await res.json();
  if (!data) notFound()
  return data;
}

export async function generateStaticParams() {
  const limit = 118
  const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, {
    cache: 'force-cache',
  }).then((res) => res.json())
 
  return pokemons?.results.map((pokemon: PockemonSingleAllDetails) => ({
    slug: String(pokemon.name),
  }))
}

export default async function Pokemon({ params }: { params: Promise<{slug: string}>}) {
  const { slug } = await params;

  const pokemonData = await getPokemonByName(slug);

  return (
    <div className="single-data-container">
      <SinglePokemon pokemonData={pokemonData} slug={slug} />
    </div>
  );
}
