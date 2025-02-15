'use client';

import { useUserData } from '@/constans/user-data';
import { PockemonSingleAllDetails } from '@/main';
import { Heart } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

interface PokemonCardProps {
  pokemon?: PockemonSingleAllDetails;
  testAddNewPokemonForLike?: (name: string) => void;
  testAddNewPokemonForBookmark?: (name: string) => void;
  pokemonname: string
}

export default function PokemonCardButtons({pokemonname, testAddNewPokemonForLike, testAddNewPokemonForBookmark}: PokemonCardProps) {
  const { performAction } = useUserData();

  const likedpokemons = useSelector((state: any) => state.user.likedpokemons);
  const useremail = useSelector((state: any) => state.user.useremail);

  return (
    <div className='pokemon-card-buttons-container'>
      <div className='pokemon-card-like-container'>
        <p className='item-name'>{pokemonname}</p>
        <button
          onClick={() => {performAction(useremail, pokemonname, "like")}}
        >
        {
        likedpokemons.some((item: string) => String(item) === pokemonname) ?
        <Heart size={20} color="#e74c3c" fill="#e74c3c" /> :
        <Heart size={20} className="heart-icon-one" />
        }
        </button>
      </div>
    </div>
  )
}
