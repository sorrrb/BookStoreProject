import { createContext, useState, ReactNode } from "react";

interface SecurityTokenContextType {
  getToken: () => string;
  hasToken: () => boolean;
  signin: (token: string) => void;
  signout: () => void;
}

interface SecurityTokenContextProps {
  children: ReactNode;
}

export const SecurityTokenContext = createContext<SecurityTokenContextType>(
  {} as SecurityTokenContextType
);

export function SecurityTokenProvider({children}: SecurityTokenContextProps) {
  const [token, setToken] = useState("");

  const getToken = () => token;
  const hasToken = (): boolean => !!token;

  const signin = (token: string) => {
    setToken(token);
  };

  const signout = () => {
    setToken("");
  };

  return (
    <SecurityTokenContext.Provider
      value={{
        getToken,
        hasToken,
        signin,
        signout,
      }}
    >
      {children}
    </SecurityTokenContext.Provider>
  )
}