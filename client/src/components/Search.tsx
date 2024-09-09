import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { error } from "console";

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
      setHasError("");
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        setHasError("404 -- Search results not found");
      } else setHasError("We're sorry - an unexpected error occured.");
      setSearchResults(([]));
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
            const authorArray = book.authors;
            return (
              <div className="book-result" key={index}>
                <img className="book-cover" src={book.imageLinks ? book.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"} />
                <div className="book-text">
                  <h1>{book.title}</h1>
                  <h2>{authorArray && authorArray.map((author: string, index: number) => {
                    return (index >= 3 ?
                      "" :
                      <p key={index}>{author}</p>
                    );
                  })}</h2>
                </div>
              </div>
            )
          })}
        </div>
        {hasError && (
          <>
            <div className="ajax-warning">{hasError}</div>
            <p className="ajax-alert">{"(Try typing more characters if the query is short)"}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
