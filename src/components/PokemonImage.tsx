import React, { useState } from "react";
import { PokemonDetailResponse } from "../interfaces/pokemon";
import { pokemonImageURL } from "../utils/pokemonImage";
import { InlineLoader } from "./Loader/Loader";

interface PokemonImageProps {
  pokemon: PokemonDetailResponse;
}

const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="pokemon-image-container">
      {!imageLoaded && <InlineLoader />}
      <img
        src={pokemonImageURL(pokemon)}
        alt={pokemon.name}
        className={`pokemon-image ${imageLoaded ? "loaded" : "loading"}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default PokemonImage;
