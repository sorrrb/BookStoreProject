import { ChangeEvent } from "react";

type BookDetailsCardProps = {
  title: string;
  thumbnailSrc: string;
  authors: string[];
  description: string;
  publisher: string;
  publicationDate: string;
  shelfStatus: string;
  changeShelf: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function BookDetailsCard({ 
  title, 
  thumbnailSrc, 
  authors, 
  description, 
  publisher, 
  publicationDate, 
  shelfStatus,
  changeShelf
  }: BookDetailsCardProps) {

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

  return (
    <div className="book-card--container">
        <div className="book-card--header">
          {title}
        </div>
        <div className="book-card--content">
          <div className="book-card--thumbnail">
            <img src={thumbnailSrc} />
          </div>
          <div className="book-card--info">
            <div className="book-card--authors">
              <span>Authors:</span>
              {authors.map((author: string, index: number) => {
                return <p key={index}>{author}</p>
              })}
            </div>
            <div className="book-card--description">
              {description}
            </div>
            <div className="book-card--publisher">
              <span>Publisher</span>
              <p>{publisher}</p>
            </div>
            <div className="book-card--publish-date">
              <span>Published Date</span>
              <p>{publicationDate}</p>
            </div>
            <div className="book-card--shelf-select">
              <label>Change Shelf:</label>
              <select
                value={shelfStatus ?
                  shelfStatus :
                  "---"
                }
                onChange={changeShelf}
                >
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Read">Read</option>
              </select>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BookDetailsCard
