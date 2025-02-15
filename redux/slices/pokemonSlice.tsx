import { PockemonSingleAllDetails, PockemonTypes } from "@/main";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IValue {
  value: string;
  label: string;
}

interface IPokemon {
  name: string;
  url: string;
  image: string;
  details: PockemonSingleAllDetails
}

interface IState {
  pokemons: {
    name: string;
    url: string;
    image: string;
  }[];
  defaultPokemons: {
    name: string;
    url: string;
    image: string;
  }[];
  types: PockemonTypes[];
  details: PockemonSingleAllDetails[];
  originaltypes: string[][];
  typeValue: IValue;
  nodata: boolean,
  nodatatwo: boolean,
  nodatathree: boolean,
  checked: boolean
}

const initialState: IState = {
  pokemons: [],
  defaultPokemons: [],
  types: [],
  details: [],
  originaltypes: [],
  typeValue: {value: 'Выбор типа', label: 'Выбор типа'},
  nodata: false,
  nodatatwo: false,
  nodatathree: false,
  checked: false
}

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addPokemons: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      action.payload.map((pokemon: IPokemon) => state.pokemons.push(pokemon)); 
    },
    addPokemonsFromLocal: (state, action: PayloadAction<any>) => {
      if (action.payload === "") return;
      state.pokemons = action.payload
    },
    setDefaultState: (state, action: PayloadAction<any>) => {
      state.defaultPokemons = action.payload
    },
    addAllDetails: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      action.payload.map((pokemon: IPokemon) => state.details && state.details.push(pokemon.details));
    },
    setOriginalTypes: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.originaltypes = action.payload
    },
    setTypeValue: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.typeValue = action.payload
    },
    setCheckedFromState: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.checked = action.payload
    },
  },
});

export const { addPokemons, addPokemonsFromLocal, setDefaultState, addAllDetails, setOriginalTypes, setTypeValue, setCheckedFromState } = pokemonSlice.actions;
export default pokemonSlice.reducer;
