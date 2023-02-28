import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { SmallPokemon } from "../interfaces/index";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setFavorite } from "../slices/dataSlice";
import { toggleFavorite, existFavorite } from "../utils/useLocalStorage";

interface Props {
  pokemon: SmallPokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOnFavorite = () => {
    toggleFavorite(pokemon.id as number); //toggle en local storage
    dispatch(setFavorite({ pokemonId: pokemon.id }));
  };
  const handleOnClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  const Icon = existFavorite(pokemon.id as number) ? StarIcon : StarBorderIcon;

  return (
    <Card
      sx={{
        padding: "8px",
      }}
    >
      <CardHeader
        title={pokemon.name}
        subheader={`#${pokemon.id}`}
        action={
          <IconButton onClick={handleOnFavorite}>
            <Icon />
          </IconButton>
        }
      />
      <CardContent sx={{ display: "grid", justifyContent: "center" }}>
        <Image
          src={pokemon.img as string}
          alt={pokemon.name}
          height={300}
          width={300}
          onClick={handleOnClick}
          style={{
            margin: "16px",
            cursor: "pointer",
          }}
        />
        {/* <CardMedia
          component="img"
          image={pokemon.img as string}
          alt={pokemon.name}
          height="420"
          onClick={handleOnClick}
          sx={{
            cursor: "pointer",
          }}
        /> */}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
