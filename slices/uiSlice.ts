import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: false,
  search: "",
  searchedPokemons: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSearchedPokemons: (state, action) => {
      state.searchedPokemons = action.payload;
    },
  },
});

export const { setLoading, setSearch, setSearchedPokemons } = uiSlice.actions;
export default uiSlice.reducer;
