import { useContext, useState } from "react";
import { UserContext } from "../context/userAuth";

function Register() {
  const { registerUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(username, password);
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
        <input type="submit" onClick={submitRegister}></input>
      </form>
    </>
  );
}

export default Register;
