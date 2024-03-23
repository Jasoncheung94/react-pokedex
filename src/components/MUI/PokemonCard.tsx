import React, { useState } from "react";
import { PokemonDetailResponse } from "../../interfaces/pokemon";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { getTypeIcon, pokemonImageURL } from "../../utils/pokemonImage";

interface PokemonCardProps {
  pokemon: PokemonDetailResponse;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokemonNumber = `#${pokemon.id.toString().padStart(3, "000")}`;
  const types = pokemon.types.map((type) => type.type.name);
  const typeClassName = `type-${types.join(" type-")}`;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Open Modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardActionArea onClick={openModal}>
        <Card
          raised={true}
          sx={{ minWidth: "300px", height: "500px", backgroundColor: "var(--color)" }}
          className={typeClassName}
        >
          <CardHeader title={pokemonNumber} />
          <CardMedia
            component="img"
            image={pokemonImageURL(pokemon)}
            alt={pokemon.name}
            style={{ height: 200, objectFit: "contain" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textTransform: "capitalize" }}
            >
              {pokemon.name}
            </Typography>
            {/* Replace with a chip component or other */}
            <div className="types">
              {types.map((type, id) => (
                <div key={id} className={type}>
                  <img src={getTypeIcon(type)} alt={type} />
                  <span className="type-name">{type}</span>
                </div>
              ))}
            </div>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div>
            <h2>Modal Content</h2>
            <p>This is a simple modal.</p>
            <Button onClick={closeModal}>Close Modal</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PokemonCard;
