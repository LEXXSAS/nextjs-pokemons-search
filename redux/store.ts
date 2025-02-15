import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./slices/pokemonSlice";
import userSlice from "./slices/userSlice";
import pagesSlice from "./slices/pagesSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonSlice,
    user: userSlice,
    pages: pagesSlice,
    search: searchSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
