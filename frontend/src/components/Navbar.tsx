import { useContext, useState } from "react";
import { UserContext } from "../context/userAuth";

type Props = { children: React.ReactNode };

function Navbar({ children }: Props) {
  const { isLoggedIn } = useContext(UserContext);

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
              <a className="nav-link" href="/">
                Pokemon
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Moves
              </a>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item justify-content-right">
            <a className="nav-link" href="/user">
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
