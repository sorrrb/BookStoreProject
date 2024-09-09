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

      <Route path="/" element={<Signin />} />

      <Route path="/book/details" element={
        <ProtectedRoute>
          <BookDetails
            title={"Horror and the Horror Film"}
            authors={["Bruce F. Kawin"]}
            description={"'Horror and the Horror Film' is a vivid, compelling, insightful and well-written study of the horror film and its subgenres from 1896 to the present, concentrating on the nature of horror in reality and on film."}
            publisher={"Anthem Press"}
            publicationDate={2012} />
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
