import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  searchvalue: string;
  checked: boolean;
}

const initialState: IState = {
  searchvalue: '',
  checked: false
}

const searchSlice = createSlice({
  name: "searchslice",
  initialState,
  reducers: {
    setCurrentSearchValue: (state, action: PayloadAction<any>) => {
      state.searchvalue = action.payload
    },
    setCheckedValue: (state, action: PayloadAction<any>) => {
      state.checked = action.payload
    }
  },
});

export const { setCurrentSearchValue, setCheckedValue } = searchSlice.actions;
export default searchSlice.reducer;
