import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Search from "./Search"
import Signin from "./Signin"

function Router() {
  return (
    <Routes>
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Signin />} />
    </Routes>
  )
}

export default Router
