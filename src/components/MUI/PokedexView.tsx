import {
  AppBar,
  Button,
  Container,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CatchingPokemonTwoTone } from "@mui/icons-material";
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage";
import { useState } from "react";
import { useFetchPokemon } from "../../hooks/useFetchPokemon";
import PokemonList from "./PokemonList";
import SimpleModal from "./Modal";

interface MUIPokedexViewProps {
  muiView: boolean;
  toggleView: () => void;
}
const MUIPokedexView: React.FC<MUIPokedexViewProps> = ({ muiView, toggleView }) => {
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
    return <Loader />; // TODO: Add Loader component from MUI
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <Container maxWidth={false} disableGutters={true}>
      <AppBar position="static">
        <Toolbar disableGutters={true}>
          <IconButton size="small" onClick={toggleView} color="inherit">
            {muiView ? <CatchingPokemonTwoTone /> : "Switch to Material-UI View"}
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} className="heading">
            P<i></i>kédex
          </Typography>
          <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, marginRight: 2 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Pokemon"
              inputProps={{ "aria-label": "search pokemon" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
      <PokemonList pokemonData={pokemonData} />
    </Container>
  );
};

export default MUIPokedexView;
