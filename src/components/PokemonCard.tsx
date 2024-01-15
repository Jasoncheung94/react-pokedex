import React, { useState } from "react";
import { PokemonDetailResponse } from "../interfaces/pokemon";
import { getTypeIcon } from "../utils/pokemonImage";
import "./PokemonCard.css";
import Modal from "./Modal/Modal";
import PokemonImage from "./PokemonImage";

interface PokemonCardProps {
  pokemon: PokemonDetailResponse;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }: PokemonCardProps) => {
  const pokemonNumber = `#${pokemon.id.toString().padStart(3, "000")}`;
  const types = pokemon.types.map((type) => type.type.name);
  const typeClassName = `pokemon-card type-${types.join(" type-")}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={typeClassName} onClick={openModal}>
        <div className="pokemon-details">
          <span className="pokemon-id">{pokemonNumber}</span>
          <span className="pokemon-name">{pokemon.name}</span>
          <div className="types">
            {types.map((type, id) => (
              <div key={id} className={type}>
                <img src={getTypeIcon(type)} alt={type} />
                <span className="type-name">{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pokemon-images-container">
          <PokemonImage pokemon={pokemon} />
        </div>
      </div>
      <Modal show={isModalOpen} onClose={closeModal} pokemon={pokemon} />
    </>
  );
};

export default PokemonCard;
