import { Link } from "react-router-dom";

type SearchCardProps = {
  title: string;
  thumbnailSrc: string;
  authors: string[];
  bookID: string;
}

function SearchCard({ title, thumbnailSrc, authors, bookID }: SearchCardProps) {
  return (
    <div className="book-card--container">

      <div className="book-card--thumbnail">
        <Link
          to={`../book/${bookID}`}
          relative={"path"}
        >
          <img src={thumbnailSrc} />
        </Link>
      </div>

      <div className="book-card--info">
        <Link
          to={`../book/${bookID}`}
          relative={"path"}
        >
          <h1 className="book-card--title">
            {title}
          </h1>
        </Link>

        <div className="book-card--authors">
          {authors && authors.map((author: string, index: number) => {
            return (index < 3 ? <p key={index}>{author}</p> : "")
          })}
        </div>
      </div>

    </div>
  )
}

export default SearchCard
