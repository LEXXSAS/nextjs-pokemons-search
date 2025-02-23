"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { preload } from "swr";
import { addAllDetails, addPokemons, addPokemonsFromLocal, setDefaultState, setOriginalTypes } from "@/redux/slices/pokemonSlice";
import { fetchAllPokemonDetails } from "@/services/getData";
import { PockemonSingleAllDetails } from "@/main";
import { setTotalPage } from "@/redux/slices/pagesSlice";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "./PokemonCard";
import { noDataNoAuth, noDataSearchAll } from "@/constans/no-data-info";
import { spinner } from "./spinner";

interface IPokemon {
  name: string;
  url: string;
  image: string;
  details: PockemonSingleAllDetails;
}

export default function MainPage() {
  const [pokemonsData, setPokemonsData] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);

  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const querypage = searchParams.get('page') || 1;

  const pokemons = useSelector((state: any) => state.pokemons.pokemons);
  const details: PockemonSingleAllDetails[] = useSelector((state: any) => state.pokemons.details);
  const pageQty = useSelector((state: any) => state.pages.pageQty);
  const useremail = useSelector((state: any) => state.user.useremail);
  const checkedfromstore = useSelector((state: any) => state.search.checked);
  const searchvalue = useSelector((state: any) => state.search.searchvalue);

  const likedpokemons = useSelector((state: any) => state.user.likedpokemons);

  function checkedPokemonsForState() {
    let filteredPokemon: IPokemon[] = [];
    pokemons.map((pokemon: any) => {
      if (likedpokemons.some((item: string) => String(item) === pokemon.name)) {
        filteredPokemon.push(pokemon);
      }
    })
    return filteredPokemon;
  }

  useEffect(() => {
    if (localStorage.getItem('checked') === 'true') {
      dispatch(addPokemonsFromLocal(checkedPokemonsForState()));
    }
  }, [])
  
  useEffect(() => {
    if (pokemons) {
      console.log("pokemons", pokemons);
      setPokemonsData(pokemons);
      dispatch(setDefaultState(data));
      if (pokemons.length < pageQty && searchvalue === '') {
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
    localStorage.removeItem("searchvalue");
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

  useEffect(() => {
    setTimeout(() => {
      setPageData(currentData);
    }, 250)
    setPageData([])
  }, [querypage, pokemons])

  if (isLoading) return <h1>Loading data...</h1>;

  if (pokemonsData && pokemonsData.length === 0 && !checkedfromstore) return noDataSearchAll();

  if (useremail === '' && checkedfromstore) return noDataNoAuth();

  return (
    <>
      <div className="data-container">
        <ScrollToTopOnMount />
        {pokemonsData &&
          pageData.length === 0 ? spinner() : pageData?.map((item: { name: string; url: string; image: string, details: any }) => (
            <PokemonCard key={item.name} item={item} />
          ))}
      </div>
    </>
  );
}
