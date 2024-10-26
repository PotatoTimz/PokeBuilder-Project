import { useContext, useState } from "react";
import { UserContext } from "../context/userAuth";

function Login() {
  const { loginUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(username, password);
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
