import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserDetails {
  id?:          string,
  userEmail?:   string,
  bookmarks?:   String[],
  liked:       String[],
  createdAt?:   Date,
  updatedAt?:   Date
}

interface IState {
  loading: boolean;
  useremail: string;
  userDetails: IUserDetails | null;
  newpokemon: {name: string}[];
  newpokemonforbookmark: {name: string}[];
  likedpokemons: {name: string}[];
  bookmarkedpokemons: {name: string}[];
}

const initialState: IState = {
  loading: false,
  useremail: '',
  userDetails: null,
  newpokemon: [{name: ''}],
  newpokemonforbookmark: [{name: ''}],
  likedpokemons: [],
  bookmarkedpokemons: []
}

const userSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.useremail = action.payload
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.userDetails = action.payload
    },
    setLikedPokemons: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.likedpokemons = action.payload.liked
    },
  },
});

export const { setUserEmail, setUserDetails, setLikedPokemons } = userSlice.actions;
export default userSlice.reducer;
