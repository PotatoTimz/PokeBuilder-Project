import { useContext } from "react"; // Importing React's useContext hook to access context values
import { UserContext } from "../../context/UserAuth"; // Importing UserContext to get user authentication details

type Props = { children: React.ReactNode }; // Defining the expected prop type for this component, expecting child components

/*
  Navbar Component.
  
  A navigation bar that allows users to navigate between different components/pages.
  This component is always displayed at the top of the screen, providing links to key areas of the application.
*/
function Navbar({ children }: Props) {
  const { isLoggedIn, username } = useContext(UserContext); // Destructuring isLoggedIn function and username from UserContext

  return (
    <>
      {/* Navbar structure using Bootstrap classes */}
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light px-5">
        {/* Logo and Brand */}
        <a className="navbar-brand" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9800/9800003.png" // Logo image URL
            width="30" // Image width
            height="30" // Image height
            className="d-inline-block align-top" // Bootstrap class for alignment
            alt="" // Empty alt as it's just an icon
          />
          PokeBuilder {/* The brand name of the app */}
        </a>

        {/* Navbar links section */}
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav">
            {/* Navigation links */}
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>{" "}
              {/* Link to Home page */}
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/pokemon">
                Pokemon
              </a>{" "}
              {/* Link to Pokemon list page */}
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/move">
                Moves
              </a>{" "}
              {/* Link to Moves page */}
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/pokemon/create">
                Create Pokemon
              </a>{" "}
              {/* Link to Create Pokemon page */}
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/move/create">
                Create Move
              </a>{" "}
              {/* Link to Create Move page */}
            </li>
          </ul>
        </div>

        {/* Right-aligned user-related navigation links */}
        <ul className="navbar-nav">
          <li className="nav-item justify-content-right">
            {/* Profile link - directs to the user's profile page */}
            <a className="nav-link" href={`/user/${username}`}>
              Profile
            </a>
          </li>

          {/* Conditional rendering for the login/logout links based on user's authentication status */}
          {isLoggedIn() ? ( // If the user is logged in, show the Logout link
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                Logout
              </a>
            </li>
          ) : (
            // If the user is not logged in, show the Login link
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
          )}
        </ul>
      </nav>

      {/* Render children components passed to this Navbar component */}
      {children}
    </>
  );
}

export default Navbar; // Export the Navbar component for use in other parts of the application
