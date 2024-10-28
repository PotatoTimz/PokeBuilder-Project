import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserAuth";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

function ProtectedRoute({ children }: Props) {
  const { checkToken } = useContext(UserContext);
  const [checkedToken, setCheckedToken] = useState<boolean>(false);
  useEffect(() => {
    checkToken();
    setCheckedToken(true);
  }, []);

  return checkedToken ? <> {children}</> : <div>Checking Token</div>;
}

export default ProtectedRoute;
