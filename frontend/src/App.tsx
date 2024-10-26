import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import { UserProvider } from "./context/userAuth";
import Register from "./components/register";
import UserPage from "./components/userpage";
import ProtectedRoute from "./components/protected";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
