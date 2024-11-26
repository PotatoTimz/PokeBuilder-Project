import { useContext, useEffect } from "react"; // Importing useContext and useEffect hooks
import { useNavigate } from "react-router-dom"; // Importing useNavigate to navigate programmatically
import { UserContext } from "../../context/UserAuth"; // Importing UserContext to manage authentication state

// Signs out the user and clears local storage
function Logout() {
  const { logout } = useContext(UserContext); // Accessing the logout function from UserContext
  const navigate = useNavigate(); // useNavigate hook for navigating programmatically

  // useEffect hook to run once when the component is mounted
  useEffect(() => {
    logout(); // Calls the logout function to clear the user's authentication data
    navigate("/"); // Redirects the user to the homepage after logging out
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return <div>Logging Out...</div>; // Displays a message while the logout process is happening
}

export default Logout; // Exporting the Logout component to use it in other parts of the app
