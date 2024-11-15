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

// Components that creates different routes for all of the pages
// Components witht he protected component requires the user to be logged in to access the page
function App() {
  return (
    <>
      <UserProvider>
        <Navbar>
          <Routes>
            {/* Login Page */}
            <Route path="/login" element={<Login />} />
            {/* Logout Page */}
            <Route path="/logout" element={<Logout />} />
            {/* Register Page */}
            <Route path="/register" element={<Register />} />
            {/* Home / Default Page */}
            <Route path="/" element={<Home />} />
            {/* Pokemon info based of id (page parameter) */}
            <Route path="/pokemon/:id" element={<PokemonInfo />} />
            {/* Pokemon search page */}
            <Route path="/pokemon" element={<SearchPokemon />} />
            {/* Move search page */}
            <Route path="/move" element={<SearchMove />} />
            {/* Profile page based of id (page parameter) */}
            <Route
              path="/user/:profileName"
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            {/* Move creation page */}
            <Route
              path="/move/create"
              element={
                <ProtectedRoute>
                  <CreateMoves updateMode={false} />
                </ProtectedRoute>
              }
            />
            {/* Pokemon creation page */}
            <Route
              path="/pokemon/create"
              element={
                <ProtectedRoute>
                  <CreatePokemon updateMode={false} />
                </ProtectedRoute>
              }
            />
            {/* Edit move based on id */}
            <Route
              path="/move/edit/:id"
              element={
                <ProtectedRoute>
                  <CreateMoves updateMode={true} />
                </ProtectedRoute>
              }
            />
            {/* Edit pokemon based on id */}
            <Route
              path="/pokemon/edit/:id"
              element={
                <ProtectedRoute>
                  <CreatePokemon updateMode={true} />
                </ProtectedRoute>
              }
            />
            {/* Edit pokemon move based on pokemon id */}
            <Route
              path="/pokemon/create/:id"
              element={
                <ProtectedRoute>
                  <EditPokemonMoves />
                </ProtectedRoute>
              }
            />
            {/* Route that doesn't exist */}
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Navbar>
      </UserProvider>
    </>
  );
}

export default App;
