'use client';

import { PockemonSingleAllDetails } from '@/main';
import { addPokemonsFromLocal } from '@/redux/slices/pokemonSlice';
import { setCheckedValue } from '@/redux/slices/searchSlice';
import { BookHeart } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface IPokemon {
  name: string;
  url: string;
  image: string;
  details: PockemonSingleAllDetails;
}

export default function CheckboxComponent() {
  const [checked, setChecked] = React.useState(false);
  const [checkedTrigger, setCheckedTrigger] = React.useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCheckedValue(checked));
  }, [checked])

  const defaultPokemons: IPokemon[] = useSelector((state: any) => state.pokemons.defaultPokemons);
  const likedpokemons = useSelector((state: any) => state.user.likedpokemons);
  const typeValue = useSelector((state: any) => state.pokemons.typeValue);
  const searchvaluefromstore = useSelector((state: any) => state.search.searchvalue);

  function checkedPokemonsForState() {
    let filteredPokemon: IPokemon[] = [];
    defaultPokemons.map((pokemon) => {
      if (likedpokemons.some((item: string) => String(item) === pokemon.name)) {
        filteredPokemon.push(pokemon);
      }
    })
    return filteredPokemon;
  }

  function selectPokemonsForState() {
    let filteredPokemon: IPokemon[] = [];
    defaultPokemons.map((pokemon) => {
      pokemon.details.types.map((t) => {
        if (t.type.name === String(typeValue.value)) {
          filteredPokemon.push(pokemon);
        }
      })
    })
    return filteredPokemon;
  }
  
  function searchPokemonsForState(name: string) {
    return defaultPokemons.filter((pokemon: IPokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()));
  }

  useEffect(() => {
    if (checked) {
      dispatch(addPokemonsFromLocal(checkedPokemonsForState()));
      router.push(`?page=${Number(1)}`);
    } else if (!checked && typeValue.value !== 'Выбор типа') {
      dispatch(addPokemonsFromLocal(selectPokemonsForState()));
    } 
    else if (!checked && typeValue.value === 'Выбор типа' && checkedTrigger) {
      dispatch(addPokemonsFromLocal(defaultPokemons));
    }
  }, [checked, likedpokemons]);

  useEffect(() => {
    if (checked && typeValue.value === 'Выбор типа' || checked && typeValue.value !== 'Выбор типа') {
      setChecked(false);
      dispatch(addPokemonsFromLocal(defaultPokemons));
    }
  }, [typeValue])

  const handleChecked = () => {
    setChecked(!checked);
    setCheckedTrigger(true)
    if (!checked && typeValue.value === 'Выбор типа') {
      dispatch(addPokemonsFromLocal(defaultPokemons));
    }
  }

  useEffect(() => {
    setCheckedTrigger(false)
  }, [])

  useEffect(() => {
    if (searchvaluefromstore === '' && typeValue.value === 'Выбор типа') {
      setChecked(false);
    }
  }, [searchvaluefromstore])

  return (
    <div className='checkbox-wrapper'>
      <input
        className='checkbox-input accent-[#A5D8B4] focus:accent-[#A5D8B4]'
        id='checkbox'
        type='checkbox'
        checked={checked}
        onChange={() => handleChecked()}
      />
      <label
        className={
          checked ? 'checkbox-label-checked' : 'checkbox-label'
        }
        htmlFor='checkbox'
        >
        {pathname === '/' && <div className='inline-flex items-center space-x-2'>
          <BookHeart size={30} />
          <p className={checked ? 'checkbox-text checkbox-text-active' : 'checkbox-text checkbox-text-not-active'}>Favourites</p>
        </div>}
      </label>
    </div>
  )
}
