import React from "react";
import { PokemonDetailResponse } from "../../interfaces/pokemon";
import PokemonProgressBar from "./Progress";
import "./Stat.css";

interface BaseStatsProps {
  pokemon: PokemonDetailResponse;
}

const BaseStats: React.FC<BaseStatsProps> = ({ pokemon }) => {
  return (
    <table className="stats-table">
      <tbody>
        {pokemon.stats.map((pokemonStat) => {
          return (
            <tr key={pokemonStat.stat.name}>
              <td>{pokemonStat.stat.name}</td>
              <td>{pokemonStat.base_stat}</td>
              <td>
                <PokemonProgressBar currentStat={pokemonStat.base_stat} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BaseStats;
