import { Routes, Route } from "react-router-dom";
import Search from "../Search/Search";
import Login from "../Login/Login";
import Bookshelf from "../Bookshelf/Bookshelf";
import BookDetails from "../BookDetails/BookDetails";
import ProtectedRoute from "./ProtectedRoute";

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

      {["/", "/login"].map((path, index) => {
        return <Route key={index} path={path} element={<Login />} />;
      })}

      <Route
        path="/book/*"
        element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookshelf"
        element={
          <ProtectedRoute>
            <Bookshelf />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;
