import React, { useEffect, useState } from "react";
import { getImageURL } from "../../utils/pokemonImage";

interface PokemonData {
  id: string;
  name: string;
  url: string;
  imageURL: string;
}

interface EvolutionChainNode {
  species: PokemonData;
  evolves_to: EvolutionChainNode[];
}

interface EvolutionChainData {
  chain: EvolutionChainNode;
}

interface PokemonEvolutionChainProps {
  pokemonId: number;
}

const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({ pokemonId }) => {
  const [evolutionChain, setEvolutionChain] = useState<PokemonData[]>([]);

  const fetchEvolutionChain = async (pokemonId: number): Promise<EvolutionChainData> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch evolution chain for Pokemon #${pokemonId}`);
    }

    const data: { evolution_chain?: { url: string } } = (await response.json()) as {
      evolution_chain?: { url: string };
    };
    const evolutionChainUrl = data.evolution_chain?.url;

    if (!evolutionChainUrl) {
      throw new Error(`Evolution chain URL not found for Pokemon #${pokemonId}`);
    }

    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData: EvolutionChainData =
      (await evolutionChainResponse.json()) as EvolutionChainData;

    return evolutionChainData;
  };

  const parseEvolutionChain = (evolutionChainData: EvolutionChainData): PokemonData[] => {
    const evolutionChain: PokemonData[] = [];
    const chain = evolutionChainData.chain;

    const traverseChain = (node: EvolutionChainNode) => {
      const pokemonData: PokemonData = {
        id: node.species.url.split("/").slice(-2, -1)[0],
        name: node.species.name,
        url: node.species.url,
        imageURL: getImageURL(parseInt(node.species.url.split("/").slice(-2, -1)[0], 10)),
      };

      evolutionChain.push(pokemonData);

      if (node.evolves_to.length > 0) {
        node.evolves_to.forEach((child) => {
          traverseChain(child);
        });
      }
    };

    traverseChain(chain);
    return evolutionChain;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evolutionChainData = await fetchEvolutionChain(pokemonId);
        const parsedEvolutionChain = parseEvolutionChain(evolutionChainData);
        setEvolutionChain(parsedEvolutionChain);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    fetchData().catch((error: Error) => console.error(error));
  }, [pokemonId]);

  return (
    <div>
      <h3>Evolution Chain</h3>
      <ul>
        {evolutionChain.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.name} (ID: {pokemon.id})
            <img src={pokemon.imageURL} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonEvolutionChain;
