import { useContext, useEffect, useState } from "react"; // Importing hooks: useContext to access context, useEffect for side effects, useState for local state
import { UserContext } from "../../context/UserAuth"; // Importing UserContext to manage user authentication state
import { useNavigate } from "react-router-dom"; // Importing useNavigate for programmatic navigation

/*
  Login Page Component.

  This page allows users to log in by providing a username and password.
  If the user is already logged in, they are redirected to the homepage.
*/
function Login() {
  const { loginUser, isLoggedIn } = useContext(UserContext); // Accessing loginUser function and isLoggedIn status from UserContext
  const [username, setUsername] = useState<string>(""); // State to store the entered username
  const [password, setPassword] = useState<string>(""); // State to store the entered password
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  // useEffect hook to check if the user is already logged in.
  // If the user is logged in, navigate them to the home page ("/").
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/"); // Redirect to the homepage if logged in
    }
  }, []); // Empty dependency array to run this effect once when the component mounts

  // Function to handle the login form submission
  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await loginUser(username, password); // Attempt to log the user in with provided credentials
    } catch (e) {}
  };

  return (
    <>
      <div className="container py-5 text-align-center">
        {/* The login form */}
        <form>
          <div className="row justify-content-center">
            <div className="col-6 m-3">
              {/* Username input field */}
              <div className="form-group my-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)} // Update the username state on change
                ></input>
              </div>
              {/* Password input field */}
              <div className="form-group my-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)} // Update the password state on change
                ></input>
              </div>

              {/* Link to the registration page if the user doesn't have an account */}
              <div className="row no-gutters">
                <div>Don't have an account?</div>
                <a
                  className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  href="/register" // Redirects to the registration page
                >
                  Register here
                </a>
              </div>
            </div>
          </div>

          {/* Submit button to trigger login */}
          <div className="row justify-content-center">
            <div className="col-4">
              <button
                className="form-control btn btn-primary mx-3"
                type="submit" // Trigger form submission
                onClick={submitLogin} // Call submitLogin function when the button is clicked
              >
                Sign In {/* Button label */}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login; // Exporting Login component to use it in other parts of the app
