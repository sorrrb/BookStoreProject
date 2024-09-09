import Navbar from "./Navbar";

function Search() {
  return (
    <div className="search">
      <Navbar />
      <div className="content">
        <div className="book-search">
          <button>&#x1F50E;&#xFE0E;</button>
          <input type="search" />
        </div>
      </div>
    </div>
  );
}

export default Search;
