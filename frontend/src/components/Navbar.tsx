import { useContext, useState } from "react";
import { UserContext } from "../context/userAuth";

type Props = { children: React.ReactNode };

function Navbar({ children }: Props) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
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

            <li className="nav-item">
              <a className="nav-link" href="/user">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
}

export default Navbar;
