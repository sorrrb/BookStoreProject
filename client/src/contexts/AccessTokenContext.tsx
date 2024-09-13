import { useState, createContext, ReactNode } from "react";

type AccessTokenContextType = {
  getToken: () => string;
  hasToken: () => boolean;
  login: (token: string) => void;
  logout: () => void;
};

type AccessTokenProviderProps = {
  children: ReactNode;
};

export const AccessTokenContext = createContext<AccessTokenContextType>(
  {} as AccessTokenContextType
);

export function AccessTokenProvider({ children }: AccessTokenProviderProps) {
  const [token, setToken] = useState("");
  const getToken = () => token;
  const hasToken = (): boolean => !!token;

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
  };

  return (
    <AccessTokenContext.Provider
      value={{
        getToken,
        hasToken,
        login,
        logout,
      }}>
        {children}
    </AccessTokenContext.Provider>
  );
}