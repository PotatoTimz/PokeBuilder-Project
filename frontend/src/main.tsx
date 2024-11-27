import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/PokemonCard.scss";
import "./assets/PokemonInfoPage.scss";
import "./assets/MoveTable.scss";
import "./assets/UserPage.scss";
import "./assets/CreatePokemon.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
