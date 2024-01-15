import React from "react";
import useEvolutionChain from "../../hooks/useEvolutionChain";
import { Evolution } from "../../api/fetchEvolutionChain";
import { getImageURL } from "../../utils/pokemonImage";
import { InlineLoader } from "../Loader/Loader";
import "./EvolutionChain.css";

interface EvolutionChainProps {
  pokemonId: number | string;
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ pokemonId }) => {
  const { species, evolutionChain, error } = useEvolutionChain(pokemonId);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!species || !evolutionChain) {
    return <InlineLoader />;
  }

  if (evolutionChain.chain.evolves_to.length === 0) {
    return <p>Evolution chain doesn&lsquo;t exist for {species.name}</p>;
  }

  const renderEvolutionChain = (evolution: Evolution) => {
    const evolutionId = evolution.species.url.match(/\/(\d+)\/$/)?.pop();
    const nextEvolutionId = evolution.evolves_to?.[0]?.species.url.match(/\/(\d+)\/$/)?.pop();
    return (
      <>
        {evolution.evolves_to.length > 0 && (
          <>
            {evolution.evolves_to.map((evo, index) => (
              <React.Fragment key={index}>
                <div className="evolution-row">
                  <div className="evolve-container">
                    {evolutionId && (
                      <img
                        className="pokemon-image"
                        src={getImageURL(parseInt(evolutionId, 10))}
                        alt={evolution.species.name}
                      />
                    )}
                    <span>{evolution.species.name}</span>
                  </div>
                  <div className="level-progression">
                    &rarr;
                    <span>Lvl {evo?.evolution_details && evo.evolution_details[0]?.min_level}</span>
                  </div>
                  <div className="evolve-container">
                    {nextEvolutionId && (
                      <img
                        className="pokemon-image"
                        src={getImageURL(parseInt(nextEvolutionId, 10))}
                        alt={evolution.species.name}
                      />
                    )}
                    <span>{evolution.species.name}</span>
                  </div>
                </div>
                {renderEvolutionChain(evo)}
              </React.Fragment>
            ))}
          </>
        )}
      </>
    );
  };

  return <>{renderEvolutionChain(evolutionChain.chain)}</>;
};

export default EvolutionChain;
