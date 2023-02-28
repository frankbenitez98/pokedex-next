import axios from "axios";
export { default as pokeApi } from "./pokeApi";

export const getPokemons = () => {
  return axios
    .get("/pokemon?limit=151")
    .then((res) => res.data.results)
    .catch((err) => console.log(err));
};

// export const getPokemonDetails = (pokemon) => {
//   return axios
//     .get(pokemon.url)
//     .then((res) => res.data)
//     .catch((err) => console.log(err));
// };
