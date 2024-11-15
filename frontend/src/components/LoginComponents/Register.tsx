import { useContext, useState } from "react";
import { UserContext } from "../../context/UserAuth";
import { useNavigate } from "react-router-dom";

/*
  Register Component

  Allows users to register an account. Automatically logging them in
  if the accounts creation was successful.
*/
function Register() {
  const { registerUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(username, password);
    navigate("/");
  };

  return (
    <>
      <div className="container py-5 text-align-center">
        <form>
          <div className="row justify-content-center">
            <div className="col-6 m-3">
              <div className="form-group my-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className="form-group my-3">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <button
                className="form-control btn btn-primary mx-3"
                type="submit"
                onClick={submitRegister}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
