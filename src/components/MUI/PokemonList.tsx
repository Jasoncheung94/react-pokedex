import React from "react";
import { PokemonDetailResponse } from "../../interfaces/pokemon";
import PokemonCard from "./PokemonCard";
import { Grid } from "@mui/material";

// Props
interface PokemonListProps {
  pokemonData: PokemonDetailResponse[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData }) => {
  return (
    <Grid container spacing={8} justifyContent="center" alignItems="center" marginTop={1}>
      {pokemonData.map((pokemon: PokemonDetailResponse) => (
        <Grid key={`#${pokemon.id}${pokemon.name}`} item xs={12} sm={6} md={4} lg={3} xl={3}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonList;
