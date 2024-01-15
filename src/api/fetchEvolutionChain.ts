import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

interface EvolutionDetails {
  item: null;
  trigger: {
    name: string;
    url: string;
  };
  min_level: number;
}

export interface Evolution {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetails[] | null;
  evolves_to: Evolution[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: null;
  chain: Evolution;
}

const fetchPokemonEvolutionChain = async (
  evolutionId: number | string,
): Promise<EvolutionChain> => {
  try {
    const response: AxiosResponse<EvolutionChain> = await axios.get<EvolutionChain>(
      `${BASE_URL}evolution-chain/${evolutionId}`,
    );

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.data;
  } catch (error: unknown) {
    // Use a more specific error type if possible
    throw new Error("Error fetching evolution chain");
  }
};

export default fetchPokemonEvolutionChain;
