import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

interface IAPIResponse {
  books: Array<object>;
  message: string;
}

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [hasError, setHasError] = useState("");

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    try {
      const searchInputFormatted = searchInput.replace(/ /g, "+");
      const { data } = await axios.get<IAPIResponse>(
        `/api/book/search/${searchInputFormatted}`
      );
      setSearchResults(data.books);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="search">
      <Navbar />
      <div className="content">
        <div className="book-search">
          <button>&#x1F50E;&#xFE0E;</button>
          <input type="search" value={searchInput} onChange={handleSearch} />
        </div>
        <div className="books-container">
          {searchResults && searchResults.map((book: any, index: number) => {
            return (
              <div className="book-result" key={index}>
                <img className="book-cover" src={book.imageLinks ? book.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"} />
                <div className="book-text">
                  <h1>{book.title}</h1>
                  <h2>{book.authors}</h2>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
