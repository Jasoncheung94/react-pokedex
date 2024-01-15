import { useEffect, useState } from "react";
import { Species, fetchPokemonSpecies } from "../api/fetchPokemonSpecies";
import fetchPokemonEvolutionChain, { EvolutionChain } from "../api/fetchEvolutionChain";

interface EvolutionChainData {
  species: Species | null;
  evolutionChain: EvolutionChain | null;
  error: string | null;
}

const useEvolutionChain = (pokemonId: number | string): EvolutionChainData => {
  const [evolutionChainData, setEvolutionChainData] = useState<EvolutionChainData>({
    species: null,
    evolutionChain: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        // Fetch species data
        const speciesData = await fetchPokemonSpecies(pokemonId);
        // Fetch evolution chain data using the URL from species data.
        // Grab the id from end of URL.
        const parts = speciesData.evolution_chain.url.split("/");
        const id = parts[parts.length - 2];
        const evolutionChain = await fetchPokemonEvolutionChain(id);

        // Set the data in the state
        setEvolutionChainData({
          species: speciesData,
          evolutionChain: evolutionChain,
          error: null,
        });
      } catch (error) {
        // Set the error in the state
        setEvolutionChainData({
          species: null,
          evolutionChain: null,
          error: "Error fetching evolution chain data.",
        });
      }
    })().catch((error) => {
      console.error("Error fetching evolution chain data:", error);
    });
  }, [pokemonId]);

  return evolutionChainData;
};

export default useEvolutionChain;
