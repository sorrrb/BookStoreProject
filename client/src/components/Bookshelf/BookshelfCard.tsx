import axios from "axios";
import { ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";

type BookshelfCardProps = {
  title: string;
  thumbnailSrc: string;
  shelfStatus: string;
  bookID: string;
}

function BookshelfCard({title, thumbnailSrc, shelfStatus, bookID }: BookshelfCardProps) {
  const { getToken } = useContext(AccessTokenContext);

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
        output = "Read";
        break;
    }
    return output;
  }

  const moveBook = (e: ChangeEvent<HTMLSelectElement>) => {
    async function changeShelf() {
      try {
        const { data } = await axios.post(`/api/bookshelf/${bookID}/${formatShelfKey(e.target.value)}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!ignore) {
          /* Handle AJAX response */
        }
      } catch (e) {
        console.error(e);
      }
    }

    let ignore = false;
    changeShelf();
    return () => {
      ignore = true;
    }
  }

  return (
    <div className="book-card--container">
      <Link
        to={`../book/${bookID}`}
        relative={"path"}
        >
          <div className="bookshelf-card--thumbnail">
            <img src={thumbnailSrc}  />
          </div>
      </Link>
      <div className="bookshelf-card--info">
        <Link
          to={`../book/${bookID}`}
          relative={"path"}
          >
            <h1 className="bookshelf-card--title">
              {title}
            </h1>
          </Link>
        <div className="bookshelf-card--shelf-select">
              <label>Change Shelf:</label>
              <select
                value={shelfStatus}
                onChange={moveBook}
                >
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Read">Read</option>
              </select>
        </div>
      </div>
    </div>
  )
}

export default BookshelfCard
