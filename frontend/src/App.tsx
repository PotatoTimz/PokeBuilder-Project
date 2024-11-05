import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserAuth";

import Register from "./components/LoginComponents/Register";
import UserPage from "./components/ProfileComponents/ProfilePage";
import ProtectedRoute from "./components/LoginComponents/Protected";
import Login from "./components/LoginComponents/Login";
import PokemonInfo from "./components/PokemonDataPage/PokemonInfo";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import CreateMoves from "./components/CreateMoves";
import CreatePokemon from "./components/CreatePokemon";
import EditPokemonMoves from "./components/EditPokemonMoves";
import Logout from "./components/LoginComponents/Logout";
import Navbar from "./components/Navbar";
import SearchPokemon from "./components/SearchPokemon";
import SearchMove from "./components/SearchMove";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonInfo />} />
            <Route path="/pokemon" element={<SearchPokemon />} />
            <Route path="/move" element={<SearchMove />} />
            <Route
              path="/user/:userId"
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/move/create"
              element={
                <ProtectedRoute>
                  <CreateMoves />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemon/create"
              element={
                <ProtectedRoute>
                  <CreatePokemon />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemon/create/:id"
              element={
                <ProtectedRoute>
                  <EditPokemonMoves />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Navbar>
      </UserProvider>
    </>
  );
}

export default App;
