import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserAuth";
import { useNavigate } from "react-router-dom";

/*
  Login Page Component.

  Page that allows users to login. 
*/
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
    await navigate("/");
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
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="row no-gutters">
                <div>Don't have an account?</div>
                <a
                  className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  href="/register"
                >
                  Register here
                </a>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <button
                className="form-control btn btn-primary mx-3"
                type="submit"
                onClick={submitLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
