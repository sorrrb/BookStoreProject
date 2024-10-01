import axios from "axios";
import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";

type BookshelfCardProps = {
  title: string;
  thumbnailSrc: string;
  shelfStatus: string;
  bookID: string;
  updateShelf: (
    bookshelfObj: object,
    wantShelfObj: string[],
    currentShelfObj: string[],
    readShelfObj: string[]
  ) => void;
};

function BookshelfCard({
  title,
  thumbnailSrc,
  shelfStatus,
  bookID,
  updateShelf,
}: BookshelfCardProps) {
  const { getToken } = useContext(AccessTokenContext);
  const [shelf, setShelf] = useState(shelfStatus);

  const formatShelfKey = (shelfStr: string) => {
    let output: string = "";
    switch (shelfStr) {
      case "Want to Read":
        output = "wantToRead";
        break;
      case "Currently Reading":
        output = "currentlyReading";
        break;
      case "Read":
        output = "read";
        break;
    }
    return output;
  };

  const moveBook = (e: ChangeEvent<HTMLSelectElement>) => {
    setShelf(e.target.value);
    async function changeShelf() {
      try {
        const { data } = await axios.put(
          `/api/bookshelf/${bookID}/${formatShelfKey(e.target.value)}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!ignore) {
          /* Handle AJAX response */
          updateShelf(
            data.books,
            data.books.wantToRead,
            data.books.currentlyReading,
            data.books.read
          );
        }
      } catch (e) {
        console.error(e);
      }
    }

    let ignore = false;
    changeShelf();
    return () => {
      ignore = true;
    };
  };

  const removeBook = (e: MouseEvent<HTMLButtonElement>) => {
    async function handleShelf() {
      try {
        const { data } = await axios.delete(`/api/bookshelf/${bookID}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });
        if (!ignore) {
          /* Handle AJAX response */
          updateShelf(
            data.books,
            data.books.wantToRead,
            data.books.currentlyReading,
            data.books.read
          );
        }
      } catch (e) {
        console.error(e);
      }
    }

    let ignore = false;
    handleShelf();
    return () => {
      ignore = true;
    };
  };

  return (
    <div className="book-card--container">
      <Link to={`../book/${bookID}`} relative={"path"}>
        <div className="bookshelf-card--thumbnail">
          <img src={thumbnailSrc} />
        </div>
      </Link>
      <div className="bookshelf-card--info">
        <Link to={`../book/${bookID}`} relative={"path"}>
          <h1 className="bookshelf-card--title">{title}</h1>
        </Link>
        <div className="bookshelf-card--shelf-select">
          <label>Change Shelf:</label>
          <select value={shelf} onChange={moveBook}>
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Read">Read</option>
          </select>
          <button onClick={removeBook}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default BookshelfCard;
