import axios, { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

interface UserContextInterface {
  username: string | null;
  token: string | null;
  registerUser: (username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
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

  useEffect(() => {
    const user = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUsername(user);
      setToken(token);
    }

    setIsReady(true);
  }, []);

  const registerUser = async (username: string, password: string) => {
    await axios
      .post("http://127.0.0.1:5000/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response?.data.token);
        localStorage.setItem("username", username);
        setToken(response?.data.token);
        setToken(username);
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  };

  const loginUser = async (username: string, password: string) => {
    await axios
      .post("http://127.0.0.1:5000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response?.data.token);
        localStorage.setItem("username", username);
        setToken(response?.data.token);
        setToken(username);
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  return (
    <UserContext.Provider
      value={{ loginUser, username, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
