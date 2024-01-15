import { PokemonDetailResponse } from "../interfaces/pokemon";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";

const PokedexListContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Props
interface PokemonListProps {
  pokemonData: PokemonDetailResponse[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData }) => {
  return (
    <PokedexListContainer>
      {pokemonData.map((pokemon: PokemonDetailResponse) => (
        <PokemonCard key={`#${pokemon.id}${pokemon.name}`} pokemon={pokemon} />
      ))}
    </PokedexListContainer>
  );
};

export default PokemonList;
