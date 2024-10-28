import axios, { Axios, AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserContextInterface {
  username: string | null;
  token: string | null;
  axiosFetch: Axios;
  registerUser: (username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  checkToken: () => Promise<boolean>;
}

interface ErrorResponse {
  message?: string;
}

type Props = { children: React.ReactNode };

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const axiosFetch = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");

    if (user && token) {
      setUsername(user);
      setToken(token);
    }

    setIsReady(true);
  }, []);

  const registerUser = async (username: string, password: string) => {
    await axiosFetch
      .post("/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response?.data.token);
        sessionStorage.setItem("username", username);
        setToken(response?.data.token);
        setToken(username);
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  };

  const loginUser = async (username: string, password: string) => {
    await axiosFetch
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response?.data.token);
        sessionStorage.setItem("username", username);
        setToken(response?.data.token);
        setToken(username);
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        navigate("/");
      })
      .catch((err: AxiosError) => {
        const errorMessage =
          (err.response?.data as ErrorResponse)?.message ??
          "An unknown error occurred";
        alert(errorMessage);
      });
  };

  const isLoggedIn = () => {
    return !!username;
  };

  const checkToken = async () => {
    console.log("test");
    if (!isLoggedIn) {
      console.log("You must be logged in to access this page");
      return false;
    }

    await axiosFetch
      .get("/protected")
      .then((response) => {})
      .catch((err: AxiosError) => {
        console.log("Your token has expired!");
        logout();
        navigate("/login");
        return false;
      });

    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        axiosFetch,
        username,
        token,
        logout,
        checkToken,
        isLoggedIn,
        registerUser,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
