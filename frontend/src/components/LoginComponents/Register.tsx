import { useContext, useState } from "react"; // Importing React hooks for state management and context usage
import { UserContext } from "../../context/UserAuth"; // Importing UserContext to access user-related functions like registration
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook to redirect the user after registration

/*
  Register Component

  Allows users to register an account. Automatically logs them in
  if the account creation was successful.
*/
function Register() {
  // Accessing the registerUser function from UserContext to register the user
  const { registerUser } = useContext(UserContext);

  // State to store the username and password input by the user
  const [username, setUsername] = useState<string>(""); // Username state, initially empty
  const [password, setPassword] = useState<string>(""); // Password state, initially empty

  const navigate = useNavigate(); // useNavigate hook is used for programmatic navigation after registration

  // Function to handle form submission (user registration)
  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault(); // Preventing the default form submit action
    registerUser(username, password); // Calling registerUser function with the entered username and password
    navigate("/"); // Navigating to the home page after successful registration
  };

  return (
    <>
      <div className="container py-5 text-align-center">
        <form>
          <div className="row justify-content-center">
            <div className="col-6 m-3">
              <div className="form-group my-3">
                <label>Username</label> {/* Label for the username input */}
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)} // Updating username state on change
                ></input>
              </div>
              <div className="form-group my-3">
                <label>Password</label> {/* Label for the password input */}
                <input
                  type="password" // Password field to keep the input masked
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)} // Updating password state on change
                ></input>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <button
                className="form-control btn btn-primary mx-3"
                type="submit"
                onClick={submitRegister} // Calling submitRegister on button click to submit the registration form
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

export default Register; // Exporting the Register component to be used in other parts of the app
