import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Search from "./Search"
import Signin from "./Signin"
import Bookshelf from "./Bookshelf"
import BookDetails from "./BookDetails"

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

      {["/", "/signin", "/login"].map((path, index) => {
        return (
          <Route 
            path={path}
            element={<Signin />}
            key={index}
          />
        )
      })}

      <Route path="/book/*" element={
        <ProtectedRoute>
          <BookDetails />
        </ProtectedRoute>
      }/>

      <Route path="/bookshelf" element={
        <ProtectedRoute>
          <Bookshelf />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default Router
