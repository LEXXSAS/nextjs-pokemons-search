"use client";

import { useEffect, useState } from "react";
import { addPokemonsFromLocal, setTypeValue } from "@/redux/slices/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setCurrentSearchValue } from "@/redux/slices/searchSlice";
import { setCurrentPageFromStore, setTotalPage } from "@/redux/slices/pagesSlice";
import { useRouter } from "next/navigation";

interface IPokemon {
  name: string;
  url: string;
  image: string;
}

const SearchPokemon = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();

  const checkedfromstore = useSelector((state: any) => state.search.checked);
  const typeValue = useSelector((state: any) => state.pokemons.typeValue);
  const defaultPokemons = useSelector((state: any) => state.pokemons.defaultPokemons);

  function searchPokemonsForState(name: string) {
    return defaultPokemons.filter((pokemon: IPokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()));
  }

  useEffect(() => {
    dispatch(setCurrentSearchValue(search));
    if (search !== "" && typeof window !== undefined) {
      localStorage.setItem("searchvalue", search);
      dispatch(setTypeValue({value: 'Выбор типа', label: 'Выбор типа'}))
      async function searchData(search: string) {
        dispatch(addPokemonsFromLocal(searchPokemonsForState(search)))
      }
      searchData(search);
    }
    else {
      localStorage.removeItem("searchvalue");
      if (typeValue.value === 'Выбор типа') {
        dispatch(addPokemonsFromLocal(defaultPokemons));
      }
    }
  }, [search]);

  useEffect(() => {
    if (search !== "") {
      dispatch(setTotalPage(1))
      dispatch(setCurrentPageFromStore(1))
      router.push(`?page=${Number(1)}`);
    }
  }, [search])

  useEffect(() => {
    if (typeValue.value !== 'Выбор типа') {
      setSearch('');
    }
  }, [typeValue])

  useEffect(() => {
    if (!checkedfromstore && localStorage.getItem('searchvalue')) {
      async function searchData(search: string) {
        dispatch(addPokemonsFromLocal(searchPokemonsForState(search)))
      }
      searchData(localStorage.getItem('searchvalue') || '');
    }
  }, [checkedfromstore])

  return (
    <form>
      <input
        id="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] ps-5 p-2 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-green-500"
        type="search"
        placeholder="Введите название..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </form>
  );
};

export { SearchPokemon };
