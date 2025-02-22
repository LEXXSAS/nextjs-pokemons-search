'use client';

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PokemonCardButtons from "./PokemonCardButtons";

export default function SinglePokemon({pokemonData, slug}: any) {
  
  const router = useRouter();

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return null;
  }

  return (
    <>
    <ScrollToTopOnMount />
    <div className="single-data-card">
    <PokemonCardButtons key={slug} pokemonname={slug} />
    <div className="h-6"></div>
    <img
      width={180}
      height={180}
      className="image-single object-contain"
      src={String(
        pokemonData.sprites.other["official-artwork"].front_default
      )}
    />
    <button className="single-data-back" onClick={() => router.back()}>
      <MoveLeft size={20} />
    </button>
    </div>
    </>
  )
}
