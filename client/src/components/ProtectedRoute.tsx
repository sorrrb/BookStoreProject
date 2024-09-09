import { ReactElement, useContext } from "react"
import { Navigate } from "react-router-dom"
import { SecurityTokenContext } from "../contexts/SecurityTokenContext";

interface ProtectedRouteProps {
  children: ReactElement;
}

function ProtectedRoute({children}: ProtectedRouteProps) {
  const { hasToken } = useContext(SecurityTokenContext);
  const isLoggedIn = hasToken();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />
  }

  return children;
}

export default ProtectedRoute
