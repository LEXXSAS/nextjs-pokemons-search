"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { preload } from "swr";
import { addAllDetails, addPokemons, setDefaultState, setOriginalTypes } from "@/redux/slices/pokemonSlice";
import { fetchAllPokemonDetails } from "@/services/getData";
import { PockemonSingleAllDetails } from "@/main";
import { setTotalPage } from "@/redux/slices/pagesSlice";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "./PokemonCard";

export default function MainPage() {
  const [pokemonsData, setPokemonsData] = React.useState([]);

  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const querypage = searchParams.get('page') || 1;

  const pokemons = useSelector((state: any) => state.pokemons.pokemons);
  const details: PockemonSingleAllDetails[] = useSelector((state: any) => state.pokemons.details);
  const pageQty = useSelector((state: any) => state.pages.pageQty);
  
  useEffect(() => {
    if (pokemons) {
      console.log("pokemons", pokemons);
      setPokemonsData(pokemons);
      if (pokemons.length < pageQty) {
        router.push(`?page=${Number(1)}`);
        dispatch(setTotalPage(1))
      } else {
        dispatch(setTotalPage(Math.ceil(pokemons.length / pageQty)))
      }
    }
  }, [pokemons]);

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }

  const currentData = useMemo(() => {
    if (pokemons) {
      const firstPageIndex = (Number(querypage) - 1) * pageQty;
      const lastPageIndex = firstPageIndex + pageQty;
      if (Number(pokemons.length) - 1 < pageQty) {
        return pokemons;
      } else {
        return pokemons.slice(firstPageIndex, lastPageIndex);
      }
    }
  }, [querypage, pokemons]);

  const { data, isLoading, mutate } = useSWR("pokemonstag", fetchAllPokemonDetails, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    if (pokemons && pokemons.length === 0) {
      dispatch(addPokemons(data));
      dispatch(setDefaultState(data));
      dispatch(addAllDetails(data));
    }
  }, [data]);

  useEffect(() => {
    let originalArr = details.map((item) => item.types.map((item) => item.type.name));
    dispatch(setOriginalTypes(originalArr));
  }, [details])

  if (isLoading) return <h1>Loading data...</h1>;

  return (
    <>
      <div className="data-container">
        <ScrollToTopOnMount /> 
        {pokemonsData &&
          currentData?.map((item: { name: string; url: string; image: string, details: any }) => (
            <PokemonCard key={item.name} item={item} />
          ))}
      </div>
    </>
  );
}
