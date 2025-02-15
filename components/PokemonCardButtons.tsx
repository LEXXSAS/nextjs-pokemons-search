'use client';

import { useUserData } from '@/constans/user-data';
import { PockemonSingleAllDetails } from '@/main';
import { Heart } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
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
  const userDetails = useSelector((state: any) => state.user.userDetails);

  const activeToaster = (newpokemonname: string) => {
    if (!useremail) {
      toast.error('Войдите в аккаунт', {
        icon: '❌'
      });
    } else {
      if (userDetails && likedpokemons.some((item: string) => String(item) === pokemonname)) {
        toast.error(`Покемон ${newpokemonname} удален из избранного`, {
          icon: '❌'
        });
      } else {
        toast.success(`Покемон ${newpokemonname} добавлен в избранное`, {
          icon: '✅'
        });
      }
    }
  }

  return (
    <div className='pokemon-card-buttons-container'>
      <div className='pokemon-card-like-container'>
        <p className='item-name'>{pokemonname}</p>
        <button
          onClick={() => {performAction(useremail, pokemonname, "like"); activeToaster(pokemonname)}}
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
