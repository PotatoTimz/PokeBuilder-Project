import { useContext, useEffect } from "react";
import { UserContext } from "../context/userAuth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);
  return <div>Logging Out...</div>;
}

export default Logout;
