import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, isLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(username, password);
    navigate("/");
  };

  return (
    <>
      <form>
        <label>username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>password</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input type="submit" onClick={submitLogin}></input>
      </form>
    </>
  );
}

export default Login;
