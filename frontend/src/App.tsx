import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import { UserProvider } from "./context/userAuth";
import Register from "./components/register";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
