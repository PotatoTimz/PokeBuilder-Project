import { useContext } from "react";
import { UserContext } from "../../context/UserAuth";

type Props = { children: React.ReactNode };

/*
  Navbar Component.

  Menu bar that allows user to navigate between multiple components.
  Always displayed at the top of the screen.
*/
function Navbar({ children }: Props) {
  const { isLoggedIn, username } = useContext(UserContext);

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light px-5">
        <a className="navbar-brand" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9800/9800003.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          PokeBuilder
        </a>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/pokemon">
                Pokemon
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/move">
                Moves
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/pokemon/create">
                Create Pokemon
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/move/create">
                Create Move
              </a>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item justify-content-right">
            <a className="nav-link" href={`/user/${username}`}>
              Profile
            </a>
          </li>

          {isLoggedIn() ? (
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                Logout
              </a>
            </li>
          ) : (
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
          )}
        </ul>
      </nav>
      {children}
    </>
  );
}

export default Navbar;
