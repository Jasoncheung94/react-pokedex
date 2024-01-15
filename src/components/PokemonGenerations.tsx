import React, { ChangeEvent } from "react";
import generations from "../utils/generations";

interface GenerationFilterProps {
  onSelectGeneration: (generation: number) => void;
  selectedGeneration?: number;
}

const GenerationFilter: React.FC<GenerationFilterProps> = ({
  onSelectGeneration,
  selectedGeneration,
}) => {
  const handleGenerationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    onSelectGeneration(selectedId);
  };

  return (
    <div className="generation-filter">
      <label htmlFor="generation">Select Generation:</label>
      <select id="generation" value={selectedGeneration || ""} onChange={handleGenerationChange}>
        <option value="">All Generations</option>
        {generations.map((generation) => (
          <option key={generation.id} value={generation.id}>
            {generation.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenerationFilter;
