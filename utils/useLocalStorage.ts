import { SmallPokemon } from "../interfaces/index";
export const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const existFavorite = (id: number): boolean => {
  if (typeof window === "undefined") return false;
  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return favorites.includes(id);
};

export const arrFav = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export const setLocalPokemons = (pokemons: SmallPokemon[]) => {
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
};
export const getLocalPokemons = (): SmallPokemon[] => {
  return JSON.parse(localStorage.getItem("pokemons") || "[]");
};
