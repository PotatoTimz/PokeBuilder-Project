import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserAuth";

type Props = { children: React.ReactNode };

function ProtectedRoute({ children }: Props) {
  const { checkToken } = useContext(UserContext);
  const [checkedToken, setCheckedToken] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await checkToken();
      setCheckedToken(true);
    })();
  }, [checkToken]);

  return checkedToken ? <> {children}</> : <div>Checking Token</div>;
}

export default ProtectedRoute;
