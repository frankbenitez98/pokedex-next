import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSearchedPokemons } from "../../slices/uiSlice";
import { RootState } from "../../store/store";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

const Searcher = () => {
  const dispatch = useDispatch();
  const valueSearched = useSelector((state: RootState) => state.ui.search);
  const pokemons = useSelector((state: RootState) => state.data.pokemonList);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };

  //funcion que devuelve un array con los pokemons buscados

  const arrSearchedPokemons = (search: string) => {
    let searched = [];

    if (search.length >= 1) {
      searched = pokemons.filter((pokemon) => {
        const text = pokemon.name.toLowerCase();
        const searchText = search.toLowerCase();
        return text.includes(searchText);
      });
    } else {
      searched = pokemons;
    }
    return searched;
  };

  //Validamos que si el estado valueSearched cambia entonces hacemos dispatch de los pokemons buscados.

  useEffect(() => {
    dispatch(setSearchedPokemons(arrSearchedPokemons(valueSearched)));
  }, [valueSearched]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <TextField
        sx={{ width: { xs: "100%", md: "70%" } }}
        label="Pokemon Searcher"
        variant="outlined"
        value={valueSearched}
        onChange={handleOnSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Searcher;
