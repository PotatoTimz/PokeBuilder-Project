import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import { UserProvider } from "./context/userAuth";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
