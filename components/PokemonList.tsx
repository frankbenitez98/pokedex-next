import { Grid } from "@mui/material";
import React from "react";
import { SmallPokemon } from "../interfaces/index";
import PokemonCard from "./PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
}
const PokemonList: React.FC<Props> = ({ pokemons }) => {
  return (
    <>
      {pokemons.map((poke) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={poke.id}>
          <PokemonCard pokemon={poke} />
        </Grid>
      ))}
    </>
  );
};

export default PokemonList;
