import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

interface EvolutionChain {
  url: string;
}

export interface Species {
  id: number;
  name: string;
  evolution_chain: EvolutionChain;
}

export const fetchPokemonSpecies = async (pokemonId: number | string): Promise<Species> => {
  try {
    const response: AxiosResponse<Species> = await axios.get<Species>(
      `${BASE_URL}pokemon-species/${pokemonId}`,
    );

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.data;
  } catch (error: unknown) {
    throw new Error("Error fetching Pokémon species");
  }
};
