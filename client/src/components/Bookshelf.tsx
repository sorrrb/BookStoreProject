import Navbar from "./Navbar";

function Bookshelf() {
  return (
    <div className="bookshelf">
      <Navbar />
      <div className="content">
        <div className="future-books bookshelf-container">
          <h1>Want to Read</h1>
        </div>
        <div className="current-books bookshelf-container">
          <h1>Currently Reading</h1>
        </div>
        <div className="past-books bookshelf-container">
          <h1>Read</h1>
        </div>
      </div>
    </div>
  )
}

export default Bookshelf;
