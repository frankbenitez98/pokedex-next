import { createSlice } from "@reduxjs/toolkit";
import { SmallPokemon } from "../interfaces/index";

interface InitialState {
  pokemonList: SmallPokemon[];
}

const initialState: InitialState = {
  pokemonList: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemonsList: (state, action) => {
      state.pokemonList = action.payload;
    },
    //toggle favorite buscando primero el pokemon que se le va a hacer toggle.
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemonList.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );
      if (currentPokemonIndex >= 0)
        state.pokemonList[currentPokemonIndex].favorite =
          !state.pokemonList[currentPokemonIndex].favorite;
    },
  },
});

export const { setPokemonsList, setFavorite } = dataSlice.actions;
export default dataSlice.reducer;
