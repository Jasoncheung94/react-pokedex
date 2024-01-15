import { PokemonDetailResponse } from "../interfaces/pokemon";
const baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/";

export function getImageURL(pokemonId: number): string {
  // Has only PNG.
  if (pokemonId >= 650) {
    return `${baseURL}/official-artwork/${pokemonId}.png`;
  }

  // Has SVG.
  return `${baseURL}/dream-world/${pokemonId}.svg`;
}

export function pokemonImageURL(pokemon: PokemonDetailResponse): string {
  if (pokemon.id >= 650) {
    return pokemon.sprites.other["official-artwork"].front_default;
  }

  return pokemon.sprites.other.dream_world.front_default
    ? pokemon.sprites.other.dream_world.front_default
    : `${baseURL}/dream-world/${pokemon.id}.svg`;
}

export function getTypeIcon(type: string): string {
  return `src/assets/images/types-icons/${type}.svg`;
}
