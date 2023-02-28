import React from "react";
import { NextPage } from "next";
import Layout from "../components/layout";
import { Grid, Typography } from "@mui/material";
import PokemonList from "../components/PokemonList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SmallPokemon } from "../interfaces/index";
import { arrFav, getLocalPokemons } from "../utils/useLocalStorage";
import { setPokemonsList } from "../slices/dataSlice";

const favorites: NextPage = () => {
  const pokemons = useSelector((state: RootState) => state.data.pokemonList);
  const dispatch = useDispatch();
  const [favoriteList, setFavoriteList] = useState<SmallPokemon[]>([]);

  // cargo del local storage la lsita de pokemons para poder montarla en el estado y asi manejarlo.
  useEffect(() => {
    dispatch(setPokemonsList(getLocalPokemons()));
  }, []);

  // cuando ocurre un cambio en la lista de favoritos entonces se actualiza la lista de favoritos volviendo a llamar a local storage
  useEffect(() => {
    const local = arrFav();
    let ArrPoke: SmallPokemon[] = [];
    local.map((id) =>
      ArrPoke.push(pokemons.find((poke) => poke.id === id) as SmallPokemon)
    );
    setFavoriteList(ArrPoke);
  }, [pokemons]);

  return (
    <Layout title="Pokemons--Favoritos">
      <Grid container spacing={2} sx={{ padding: "24px" }}>
        {favoriteList.length > 0 ? (
          <PokemonList pokemons={favoriteList} />
        ) : (
          <Typography variant="h2">No Existen Favoritos</Typography>
        )}
      </Grid>
    </Layout>
  );
};

export default favorites;
