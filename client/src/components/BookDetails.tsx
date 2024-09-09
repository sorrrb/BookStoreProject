import Navbar from "./Navbar";

interface BookDetailsProps {
  title: string;
  authors: Array<string>;
  description: string;
  publisher: string;
  publicationDate: number;
}

function BookDetails({ title, authors, description, publisher, publicationDate }: BookDetailsProps) {
  return (
    <div className="book-details">
      <Navbar />
      <div className="content">
        <div className="book-container">
          <h1>{title}</h1>
          <div className="book-resources">
            <div className="book-thumbnail"></div>
            <div className="book-information">
              <div className="book-authors">
                <p>Authors:</p>
                <p>{authors}</p>
              </div>
              <div className="book-description">{description}</div>
              <div className="book-publisher"><span>Publisher:</span> {publisher}</div>
              <div className="book-publication-date">
                <span>Published Date:</span> {publicationDate}
              </div>
              <div className="book-shelf">None</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
