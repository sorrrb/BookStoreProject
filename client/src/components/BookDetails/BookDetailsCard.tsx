import { ChangeEvent, useContext } from "react";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import axios from "axios";

type BookDetailsCardProps = {
  title: string;
  bookID: string;
  thumbnailSrc: string;
  authors: string[];
  description: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  dimensions: {
    height: string;
    thickness: string;
    width: string;
  };
  infoSrc: string;
  previewSrc: string;
  shelfStatus: string;
  changeShelf: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function BookDetailsCard({
  title,
  bookID,
  thumbnailSrc,
  authors,
  description,
  publisher,
  publicationDate,
  pages,
  dimensions,
  infoSrc,
  previewSrc,
  shelfStatus,
  changeShelf,
}: BookDetailsCardProps) {
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
        output = "read";
        break;
    }
    return output;
  };

  const moveBook = (e: ChangeEvent<HTMLSelectElement>) => {
    changeShelf(e);
    async function reloadShelf() {
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
          /* Handle AJAX response (if necessary?) */
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }

    let ignore = false;
    reloadShelf();
    return () => {
      ignore = true;
    };
  };

  return (
    <div className="book-card--container">
      <div className="book-card--header">{title}</div>
      <div className="book-card--content">
        <div className="book-card--thumbnail">
          <img src={thumbnailSrc} />
        </div>
        <div className="book-card--info">
          <div className="book-card--heading">
            <div className="book-card--authors">
              <span>Authors:</span>
              {authors.map((author: string, index: number) => {
                return <p key={index}>{author}</p>;
              })}
            </div>
            <div className="book-card--links">
              <a href={previewSrc}>
                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/fluency/25/google-logo.png"
                  alt="google-logo"
                />
              </a>
              <a href={infoSrc}>
                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/fluency/25/google-play.png"
                  alt="google-play"
                />
              </a>
            </div>
          </div>
          <div className="book-card--description">{description}</div>
          <div className="book-card--publisher">
            <span>Publisher</span>
            <p>{publisher}</p>
          </div>
          <div className="book-card--publish-date">
            <span>Published Date</span>
            <p>{new Date(publicationDate).toLocaleDateString()}</p>
          </div>
          <div className="book-card--dimensions">
            <span>Dimensions</span>
            <p>
              {dimensions
                ? `${dimensions.height} x ${dimensions.width} x ${dimensions.thickness}`
                : "N/A"}
            </p>
          </div>
          <div className="book-card--pages">
            <span>{pages}</span> pages
          </div>
          <div className="book-card--shelf-select">
            <label>{shelfStatus ? "Change Shelf" : "Add to Shelf"}</label>
            <select value={shelfStatus ? shelfStatus : ""} onChange={moveBook}>
              <option value="" disabled>
                ----------
              </option>
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Read">Read</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsCard;
