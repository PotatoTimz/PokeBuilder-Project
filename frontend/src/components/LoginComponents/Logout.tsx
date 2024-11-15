import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserAuth";

// Signs out user and clears local storage
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
