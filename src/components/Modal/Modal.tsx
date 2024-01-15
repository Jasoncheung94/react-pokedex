import React, { useEffect, useRef, useState } from "react";
import { PokemonDetailResponse } from "../../interfaces/pokemon";
import { getImageURL, getTypeIcon } from "../../utils/pokemonImage";
import About from "./About";
import Tabs from "./Tabs";
import "./Modal.css";
import BaseStats from "./Stat";
import EvolutionChain from "./EvolutionChain";
import PokemonImage from "../PokemonImage";

type ModalProps = {
  onClose: () => void;
  show: boolean;
  pokemon: PokemonDetailResponse;
};

const Modal: React.FC<ModalProps> = ({ onClose, show, pokemon }) => {
  const pokemonNumber = "#" + pokemon.id.toString().padStart(3, "000");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const types = pokemon.types.map((type) => type.type.name);
  const typeClassName = "top-modal-intro type-" + types.join(" type-");
  const [activeTab, setActiveTab] = useState<string>("About");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [show, onClose]);

  const tabs = [
    {
      label: "About",
      content: <About pokemon={pokemon} />,
    },
    {
      label: "Base Stats",
      content: <BaseStats pokemon={pokemon} />,
    },
    {
      label: "Evolution",
      content: <EvolutionChain pokemonId={pokemon.id} />,
    },
  ];

  return (
    show && (
      <>
        <div className="modal" ref={modalRef}>
          <div className={`modal-header ${typeClassName}`}>
            <span className="back-icon" onClick={onClose}>
              &larr;
            </span>
            <div className="pokemon-info">
              <span className="pokemon-id">{pokemonNumber}</span>
              <span className="pokemon-name">{pokemon.name}</span>
            </div>
            <PokemonImage pokemon={pokemon} />
            <div className="types">
              {types.map((type, id) => (
                <div key={id} className={type}>
                  <img src={getTypeIcon(type)} alt={type} />
                  <span className="type-name">{type}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-content">
            <Tabs defaultTab={activeTab} setActiveParentTab={setActiveTab} tabs={tabs} />
          </div>
        </div>
        <div className="modal-backdrop"></div>
      </>
    )
  );
};

export default Modal;
