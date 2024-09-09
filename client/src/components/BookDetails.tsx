import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

interface IBookDetailResponse {
  book: string;
}

function BookDetails() {
  const [bookDetails, setBookDetails] = useState<any>({});
  const location = useLocation();
  const bookId = location.pathname.substring(location.pathname.lastIndexOf("/")+1);
  useEffect(() => {
    async function loadDetails() {
      try {
        const { data } = await axios.get<IBookDetailResponse>(`/api/book/${bookId}`);
        if (!ignore) {
          setBookDetails(data.book);
        }
      } catch (e) {
          console.error(e);
      }
    }

    let ignore = false;
    loadDetails();
    return () => {
      ignore = true;
    }
  }, [bookId]);

  return (
    <div className="book-details">
      <Navbar />
      <div className="content">
        <div className="book-container">
          <h1>{bookDetails.title}</h1>
          <div className="book-resources">
            <div className="book-thumbnail">
              <img className="book-cover" src={bookDetails.imageLinks ? bookDetails.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"} />
            </div>
            <div className="book-information">
              <div className="book-authors">
                <p>Authors:</p>
                {bookDetails.authors && bookDetails.authors.map((author: string, index: number) => {
                  return <p key={index}>{author}</p>
                })}
              </div>
              <div className="book-description">{bookDetails.description ? bookDetails.description.substring(0, 500) + "..." : bookDetails.description}</div>
              <div className="book-publisher"><span>Publisher:</span> {bookDetails.publisher}</div>
              <div className="book-publication-date">
                <span>Published Date:</span> {bookDetails.publishedDate}
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
