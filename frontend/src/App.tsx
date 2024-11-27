// Importing necessary modules from react-router-dom for routing
import { Route, Routes } from "react-router-dom";
// Importing the UserProvider for managing user authentication context
import { UserProvider } from "./context/UserAuth";

// Importing all components that will be used in various routes
import Register from "./components/LoginComponents/Register";
import UserPage from "./components/ProfileComponents/ProfilePage";
import ProtectedRoute from "./components/LoginComponents/Protected"; // Protects routes that require authentication
import Login from "./components/LoginComponents/Login";
import PokemonInfo from "./components/PokemonDataPage/PokemonInfo";
import PageNotFound from "./components/PageNotFound";
import Navbar from "./components/Navbar/Navbar"; // Navigation bar for the app
import Logout from "./components/LoginComponents/Logout";
import Home from "./components/HomePage/Home";
import SearchPokemon from "./components/SearchPokemon/SearchPokemon";
import SearchMove from "./components/SearchMove/SearchMove";
import CreateMoves from "./components/CreateForms/CreateMoves";
import CreatePokemon from "./components/CreateForms/CreatePokemon";
import EditPokemonMoves from "./components/CreateForms/EditPokemonMoves";

// Main App component where the routes are defined
function App() {
  return (
    <>
      {/* UserProvider component to wrap the app and provide user context */}
      <UserProvider>
        {/* Navbar component displayed across all pages */}
        <Navbar>
          {/* Defining routes for various pages in the app */}
          <Routes>
            {/* Route for the login page */}
            <Route path="/login" element={<Login />} />
            {/* Route for the logout page */}
            <Route path="/logout" element={<Logout />} />
            {/* Route for the register page */}
            <Route path="/register" element={<Register />} />
            {/* Default route for the home page */}
            <Route path="/" element={<Home />} />
            {/* Route to display detailed Pokemon info based on the ID */}
            <Route path="/pokemon/:id" element={<PokemonInfo />} />
            {/* Route for the Pokemon search page */}
            <Route path="/pokemon" element={<SearchPokemon />} />
            {/* Route for the Move search page */}
            <Route path="/move" element={<SearchMove />} />
            {/* Protected route for user profile page, only accessible by authenticated users */}
            <Route
              path="/user/:profileName"
              element={
                <ProtectedRoute>
                  {" "}
                  {/* Wraps component with authentication check */}
                  <UserPage />
                </ProtectedRoute>
              }
            />
            {/* Protected route for creating new moves */}
            <Route
              path="/move/create"
              element={
                <ProtectedRoute>
                  <CreateMoves updateMode={false} />
                </ProtectedRoute>
              }
            />
            {/* Protected route for creating new Pokemon */}
            <Route
              path="/pokemon/create"
              element={
                <ProtectedRoute>
                  <CreatePokemon updateMode={false} />
                </ProtectedRoute>
              }
            />
            {/* Protected route for editing an existing move based on its ID */}
            <Route
              path="/move/edit/:id"
              element={
                <ProtectedRoute>
                  <CreateMoves updateMode={true} />
                </ProtectedRoute>
              }
            />
            {/* Protected route for editing an existing Pokemon based on its ID */}
            <Route
              path="/pokemon/edit/:id"
              element={
                <ProtectedRoute>
                  <CreatePokemon updateMode={true} />
                </ProtectedRoute>
              }
            />
            {/* Protected route for editing Pokemon moves based on Pokemon ID */}
            <Route
              path="/pokemon/create/:id"
              element={
                <ProtectedRoute>
                  <EditPokemonMoves />
                </ProtectedRoute>
              }
            />
            {/* Route for handling non-existent paths (404 page not found) */}
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Navbar>
      </UserProvider>
    </>
  );
}

// Exporting the App component as default to be used in the entry point
export default App;
