import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserAuth";

import Register from "./components/LoginComponents/Register";
import UserPage from "./components/ProfileComponents/ProfilePage";
import ProtectedRoute from "./components/LoginComponents/Protected";
import Login from "./components/LoginComponents/Login";
import PokemonInfo from "./components/PokemonDataPage/PokemonInfo";
import PageNotFound from "./components/PageNotFound";
import Navbar from "./components/Navbar/Navbar";
import Logout from "./components/LoginComponents/Logout";
import Home from "./components/HomePage/Home";
import SearchPokemon from "./components/SearchPokemon/SearchPokemon";
import SearchMove from "./components/SearchMove/SearchMove";
import CreateMoves from "./components/CreateForms/CreateMoves";
import CreatePokemon from "./components/CreateForms/CreatePokemon";
import EditPokemonMoves from "./components/CreateForms/EditPokemonMoves";

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
              path="/user/:profileName"
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
                  <CreateMoves updateMode={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/move/edit/:id"
              element={
                <ProtectedRoute>
                  <CreateMoves updateMode={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemon/edit/:id"
              element={
                <ProtectedRoute>
                  <CreatePokemon updateMode={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemon/create"
              element={
                <ProtectedRoute>
                  <CreatePokemon updateMode={false} />
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
