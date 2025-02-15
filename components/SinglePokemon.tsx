'use client';

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
    <h3 className="text-xl">{slug}</h3>
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
