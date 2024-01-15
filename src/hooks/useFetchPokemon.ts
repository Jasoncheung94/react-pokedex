import { PokemonDetailResponse } from "../interfaces/pokemon";
import { useCallback, useEffect, useState } from "react";
import { getGenerationById } from "../utils/generations";
import { fetchPokemon, fetchPokemonDetails } from "../api/fetchPokemons";

interface UseFetchPokemonProps {
  offset?: number;
  limit?: number;
  generationId?: number;
}

interface UseFetchPokemonResult {
  pokemonData: PokemonDetailResponse[];
  loading: boolean;
  error: string;
}

export function useFetchPokemon({
  offset = 0,
  limit = 10,
  generationId,
}: UseFetchPokemonProps): UseFetchPokemonResult {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonDetailResponse[]>([]);

  if (generationId) {
    const generation = getGenerationById(generationId);
    if (generation) {
      offset = generation?.offset;
      limit = generation?.limit;
    }
  }

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Fetch the list of Pokémon
      const pokemonList = await fetchPokemon(offset, limit);
      // Create an array of promises to fetch detailed data for each Pokémon
      const promises = pokemonList.map((pokemon) => fetchPokemonDetails(pokemon.url));
      // Use Promise.all to fetch data for all Pokémon concurrently
      const allPokemonData = await Promise.all(promises);
      // Return the data as detailed pokemon
      setPokemonData(allPokemonData);
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [offset, limit]);

  useEffect(() => {
    fetchData().catch((error) => {
      console.error("Error fetching Pokémon details:", error);
    });
  }, [offset, limit, fetchData]);

  return { pokemonData, loading, error };
}
