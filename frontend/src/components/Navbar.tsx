import { useContext, useState } from "react";
import { UserContext } from "../context/userAuth";

type Props = { children: React.ReactNode };

function Navbar({ children }: Props) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand px-3" href="/">
          Navbar
        </a>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav mx-3">
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
