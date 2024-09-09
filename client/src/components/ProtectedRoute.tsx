import { ReactElement } from "react"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: ReactElement;
}

function ProtectedRoute({children}: ProtectedRouteProps) {
  return children;
}

export default ProtectedRoute
