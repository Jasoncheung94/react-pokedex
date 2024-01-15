import React from "react";
import "./Progress.css";

interface PokemonProgressBarProps {
  currentStat: number;
  maxStat?: number;
}

const PokemonProgressBar: React.FC<PokemonProgressBarProps> = ({ currentStat, maxStat = 100 }) => {
  const percentage = (currentStat / maxStat) * 100;

  const progressStyle = {
    width: `${percentage}%`,
    backgroundColor: percentage < 30 ? "red" : percentage < 70 ? "#ffbd27" : "#5bc686",
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={progressStyle}></div>
    </div>
  );
};

export default PokemonProgressBar;
