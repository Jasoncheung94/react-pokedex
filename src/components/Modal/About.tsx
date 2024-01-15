import React from "react";
import { PokemonDetailResponse } from "../../interfaces/pokemon";
import "./About.css";

type AboutProps = {
  pokemon: PokemonDetailResponse;
};

const About: React.FC<AboutProps> = ({ pokemon }) => {
  // add abilities with capitalized and separated by commas
  const abilities = pokemon.abilities
    .map((ability) => {
      const str = ability.ability.name;
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(", ");

  return (
    <table className="about">
      <tbody>
        <tr>
          <td className="label">Height:</td>
          <td className="value">{pokemon.height}</td>
        </tr>
        <tr>
          <td className="label">Weight:</td>
          <td className="value">{pokemon.weight}</td>
        </tr>
        <tr>
          <td className="label">Base Experience:</td>
          <td className="value">{pokemon.base_experience}</td>
        </tr>
        <tr>
          <td className="label">Abilities:</td>
          <td className="value">{abilities}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default About;
