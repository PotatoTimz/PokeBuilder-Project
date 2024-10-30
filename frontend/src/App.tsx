import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/userAuth";

import Register from "./components/Register";
import UserPage from "./components/ProfilePage";
import ProtectedRoute from "./components/Protected";
import Login from "./components/Login";
import PokemonInfo from "./components/PokemonInfo";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import CreateMoves from "./components/CreateMoves";
import CreatePokemon from "./components/CreatePokemon";
import AddMovePokemon from "./components/AddMovePokemon";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";

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

            <Route
              path="/user"
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
                  <AddMovePokemon />
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
