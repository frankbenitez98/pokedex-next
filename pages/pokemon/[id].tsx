import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import React, { FC, useState } from "react";
import { pokeApi } from "../../api";
import Layout from "../../components/layout";
import { Pokemon } from "../../interfaces";
import Image from "next/image";
import { toggleFavorite, existFavorite } from "../../utils/useLocalStorage";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetailPage: NextPage<Props> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(existFavorite(pokemon.id));
  const Icon = isFavorite ? StarIcon : StarBorderIcon;
  const handleOnFavorite = () => {
    toggleFavorite(pokemon.id as number); //toggle en local storage
    setIsFavorite(!isFavorite);
  };
  return (
    <Layout title=" ">
      <Grid container spacing={3} sx={{ padding: "16px" }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: "8px",
            }}
          >
            <CardContent>
              <CardMedia
                component="img"
                image={pokemon.sprites.front_default}
                alt={pokemon.name}
                width="100%"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: "16px" }}>
            <CardHeader
              title={pokemon.name}
              subheader={`#${pokemon.id}`}
              action={
                <Button
                  onClick={handleOnFavorite}
                  variant="outlined"
                  size="large"
                  color="inherit"
                >
                  <Icon />
                </Button>
              }
            />
            <CardContent
              sx={{
                display: "grid",
                justifyItems: "star",
                gap: "16px",
              }}
            >
              <Typography>Sprites: </Typography>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  src={pokemon.sprites.front_default}
                  alt="front sprite"
                  width={150}
                  height={150}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt="back sprite"
                  width={150}
                  height={150}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt="shiny front sprite"
                  width={150}
                  height={150}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt="shiny back sprite"
                  width={150}
                  height={150}
                />
              </div>
              <Typography>{`Altura: ${pokemon.height} fts`}</Typography>
              <Typography>{`Peso: ${pokemon.weight} kg`}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons151 = [...Array(151)].map((_, i) => `${i + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonDetailPage;
