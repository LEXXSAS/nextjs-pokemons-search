// @ts-nocheck

'use client';
import { PockemonSingleAllDetails } from '@/main';
import { addPokemonsFromLocal, setTypeValue } from '@/redux/slices/pokemonSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

interface IValue {
  value: string;
  label: string;
}

interface IPokemon {
  name: string;
  url: string;
  image: string;
  details: PockemonSingleAllDetails;
}

export const SelectComponent = () => {
  const [isSearchable, setIsSearchable] = React.useState(true);

  const dispatch = useDispatch();

  const defaultPokemons: IPokemon[] = useSelector((state: any) => state.pokemons.defaultPokemons);
  const originaltypes = useSelector((state: any) => state.pokemons.originaltypes);
  const typeValue = useSelector((state: any) => state.pokemons.typeValue);
  const details: PockemonSingleAllDetails[] = useSelector((state: any) => state.pokemons.details);
  const checkedfromstore = useSelector((state: any) => state.search.checked);
  const searchvaluefromstore = useSelector((state: any) => state.search.searchvalue);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const {replace} = useRouter();

  const getTypesToArray = () => {
    let newSetArr = Array.from(new Set(originaltypes.flat()));
    let typesArray = [{value: 'Выбор типа', label: 'Выбор типа'}]

    newSetArr.map((item) => 
    typesArray.push({value: `${item}`, label: `${item}`})
    )
    return typesArray
  }

  const setSelected = (value: IValue) => {
    dispatch(setTypeValue(value));
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

  useEffect(() => {
    if (typeValue.value !== 'Выбор типа') {
      localStorage.removeItem('searchvalue');
      dispatch(addPokemonsFromLocal(selectPokemonsForState()))
      router.push(`?page=${Number(1)}`);
    } else {
      if (!localStorage.getItem('searchvalue') && !checkedfromstore && typeValue.value === 'Выбор типа' && searchvaluefromstore === '') {
        dispatch(addPokemonsFromLocal(defaultPokemons));
      }
    }
  }, [typeValue])

  return (
    <div className="select-container">
    <div id="selectid" className="select-type form-select px-2 py-1 transition-all  appearance-none invalid:text-black/30 w-64">
    <Select
    id="long-value-select" instanceId="long-value-select"
    theme={(theme) => ({
      ...theme,
      borderRadius: '5px',
      colors: {
        ...theme.colors,
        primary: 'rgb(165,216,180)',
        primary25: 'rgba(165,216,180, 0.5)',
      },
    })}
     options={details.length < 0 ? typeValue : getTypesToArray()} 
     className='basic-single'
     value={typeValue}
     defaultValue={typeValue}
     isSearchable={isSearchable}
     name='select'
     placeholder='Выбор типа'
     onChange={(value, actionMeta) => value && setSelected(value)}
    />
    </div>
  </div>
  )
}
