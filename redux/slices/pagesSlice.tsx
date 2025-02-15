import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  count: number;
  page: number;
  totalPage: number;
  totalPageDefault: number;
  pageQty: number;
  searchquery: string;
  loadingtime: number;
  loadingtimepagination: number;
  currentpage: number;
}

const initialState: IState = {
  count: 0,
  totalPage: 0,
  totalPageDefault: 0,
  page: 1,
  pageQty: 6,
  loadingtime: 250,
  loadingtimepagination: 150,
  searchquery: '',
  currentpage: 1
}

const pagesSlice = createSlice({
  name: "pagesinfo",
  initialState,
  reducers: {
    setTotalPage: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.totalPage = action.payload
    },
    setCurrentPageFromStore: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.currentpage = action.payload
    },
  },
});

export const { setTotalPage, setCurrentPageFromStore } = pagesSlice.actions;
export default pagesSlice.reducer;
