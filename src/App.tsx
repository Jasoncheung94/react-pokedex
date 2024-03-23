import { useState } from "react";
import "./App.css";
import PokedexView from "./components/PokedexView";
import { Button, CssBaseline, Switch, ThemeProvider, createTheme } from "@mui/material";
import MUIPokedexView from "./components/MUI/PokedexView";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function App() {
  const [muiView, setMuiView] = useState<boolean>(true);

  const toggleView = (): void => {
    setMuiView((prevMuiView) => !prevMuiView);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {!muiView && (
          <>
            <Switch checked={muiView} onChange={toggleView} />
            <Button onClick={toggleView}>Switch to Material-UI View</Button>
          </>
        )}
        {muiView ? <MUIPokedexView muiView={muiView} toggleView={toggleView} /> : <PokedexView />}
      </div>
    </ThemeProvider>
  );
}
