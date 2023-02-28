import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../slices/uiSlice";
import { RootState } from "../store/store";
import CircularProgress from "@mui/material/CircularProgress";
import Layout from "../components/layout";
import Searcher from "../components/ui/Searcher";
import { GetStaticProps, NextPage } from "next";
import { pokeApi } from "../api";
import { PokemonsListResponse, SmallPokemon } from "../interfaces";
import PokemonList from "../components/PokemonList";
import { setPokemonsList } from "../slices/dataSlice";
import { setLocalPokemons } from "../utils/useLocalStorage";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  const pokemonList = useSelector((state: RootState) => state.data.pokemonList);
  const searchedPokemons = useSelector(
    (state: RootState) => state.ui.searchedPokemons
  );
  const valueSearched = useSelector((state: RootState) => state.ui.search);
  const dispatch = useDispatch();

  //Para renderizar mi Lista de pokemons hago dispatch de la static prop en el mounth y asi la uso como un estado.

  useEffect(() => {
    dispatch(setPokemonsList(pokemons));
    setLocalPokemons(pokemons);
  }, []);

  // useEffect(()=> {
  //   if(searchedPokemons.length>1){
  //     dispatch(setPokemonsList(searchedPokemons))
  //   }
  //   else{
  //     dispatch(setPokemonsList(searchedPokemons))
  //   }
  // },[searchedPokemons])

  return (
    <Layout title="Listado de Pokemons">
      <Grid container spacing={2} sx={{ padding: "24px" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Searcher />
        </Grid>
        <PokemonList
          pokemons={
            searchedPokemons.length < 1 || valueSearched === ""
              ? pokemonList
              : searchedPokemons
          }
        />
      </Grid>
    </Layout>
  );
};

//Api Rest en getStaticProps para pasar props estaticas.

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await pokeApi.get<PokemonsListResponse>(
    "/pokemon?limit=151"
  );
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      i + 1
    }.png`,
    favorite: false,
  }));

  return {
    props: {
      pokemons: pokemons,
    },
  };
};

export default HomePage;
