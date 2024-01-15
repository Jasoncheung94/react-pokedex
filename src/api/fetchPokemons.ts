import axios, { AxiosResponse } from "axios";
import { Pokemon, PokemonDetailResponse, PokemonResponse } from "../interfaces/pokemon";

const POKEMON_API_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";

// Fetch pokemon from the API using pagination of nextURL or offset and limit.
// If no nextURL is provided, offset and limit are used.
// Get data using axios and return the response.
export const fetchPokemon = async (offset?: number, limit?: number): Promise<Pokemon[]> => {
  try {
    const url = `${POKEMON_API_POKEMON_URL}?offset=${offset}&limit=${limit}`;
    const response: AxiosResponse<PokemonResponse> = await axios.get<PokemonResponse>(url);

    // Validate the response
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.data.results;
  } catch (error: unknown) {
    // Use a more specific error type if possible
    throw new Error("Error fetching Pokémon");
  }
};

export const fetchPokemonDetails = async (url: string): Promise<PokemonDetailResponse> => {
  try {
    const response: AxiosResponse<PokemonDetailResponse> =
      await axios.get<PokemonDetailResponse>(url);

    // Validate the response
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.data;
  } catch (error: unknown) {
    // Use a more specific error type if possible
    throw new Error("Error fetching Pokémon details");
  }
};
