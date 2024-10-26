import { useContext, useState } from "react";
import { UserContext } from "../context/userAuth";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

function ProtectedRoute({ children }: Props) {
  const { isLoggedIn } = useContext(UserContext);

  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute;
