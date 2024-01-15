import { useState } from "react";
import Loader, { InlineLoader } from "../components/Loader/Loader";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import PokemonList from "../components/PokemonList";
import GenerationFilter from "../components/Filter/Generation";
import ErrorPage from "./ErrorPage";

const PokedexView: React.FC = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<number>(1);
  const { pokemonData, loading, error } = useFetchPokemon({
    offset: 0,
    limit: 10,
    generationId: selectedGeneration,
  });
  const handleSelectGeneration = (generation: number) => {
    setSelectedGeneration(generation);
  };

  if (loading && selectedGeneration) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <h1 className="heading">
        P<i></i>kédex
      </h1>
      <GenerationFilter
        onSelectGeneration={handleSelectGeneration}
        selectedGeneration={selectedGeneration}
      />
      <PokemonList pokemonData={pokemonData} />
      {loading && <InlineLoader />}
    </>
  );
};

export default PokedexView;
