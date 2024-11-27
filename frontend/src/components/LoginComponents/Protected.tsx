import { useContext, useEffect, useState } from "react"; // Importing hooks for managing state and side effects
import { UserContext } from "../../context/UserAuth"; // Importing UserContext to access authentication functions

type Props = { children: React.ReactNode }; // Defining the type for children prop that will be passed to this component

// Authenticates JWT token. If rejected, returns the user to the login page.
function ProtectedRoute({ children }: Props) {
  const { checkToken } = useContext(UserContext); // Accessing the checkToken function from UserContext to verify the JWT token
  const [checkedToken, setCheckedToken] = useState<boolean>(false); // State to track if the token check has been completed

  // useEffect hook to check the JWT token once the component is mounted
  useEffect(() => {
    (async () => {
      await checkToken(); // Calls the checkToken function to authenticate the user
      setCheckedToken(true); // Sets checkedToken to true after the token is checked
    })();
  }, [checkToken]); // Dependency array ensures that the effect runs once when the component mounts

  // If the token has been checked, render the children components. Otherwise, show a "Checking Token" message.
  return checkedToken ? <> {children}</> : <div>Checking Token</div>;
}

export default ProtectedRoute; // Exporting the ProtectedRoute component to be used in other parts of the app
