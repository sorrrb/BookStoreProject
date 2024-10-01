import { ChangeEvent, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import SearchCard from "./SearchCard";

interface ISearchResponse {
  message: string;
  books: string[];
}

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const fetchSearchResults = async (e: ChangeEvent) => {
    const targetInput = e.target as HTMLInputElement;
    setSearchValue(targetInput.value);

    try {
      const { data } = await axios.get<ISearchResponse>(
        `api/book/search/${targetInput.value}`
      );

      if (data.message.includes("No")) {
        /* Handle empty search results */
      } else {
        setSearchResults(data.books);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="book-search">
      <Navbar />
      <div className="book-display">
        <div className="search-input--container">
          <button>
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/ios-filled/32/search.png"
              alt="search"
            />
          </button>
          <input
            type="search"
            value={searchValue}
            onChange={fetchSearchResults}
            spellCheck={"false"}
          />
        </div>
        <div className="search-output--container">
          {searchResults &&
            searchResults.map((book: any, index: number) => {
              return (
                <SearchCard
                  key={index}
                  title={book.title}
                  thumbnailSrc={
                    book.imageLinks
                      ? book.imageLinks.thumbnail
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                  }
                  authors={book.authors}
                  bookID={book.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Search;
