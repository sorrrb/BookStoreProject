import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import BookDetailsCard from "./BookDetailsCard";
import axios from "axios";

interface IBookDetailResponse {
  book: string;
}

function BookDetails() {
  const [bookDetails, setBookDetails] = useState<any>({});
  const [currentShelf, setCurrentShelf] = useState("");

  const location = useLocation();
  const bookId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const changeShelfHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentShelf(e.target.value);
  };

  useEffect(() => {
    async function getDetails() {
      try {
        const { data } = await axios.get<IBookDetailResponse>(
          `/api/book/${bookId}`
        );
        if (!ignore) {
          setBookDetails(data.book);
          console.log(data.book);
        }
      } catch (e) {
        console.error(e);
      }
    }

    let ignore = false;
    getDetails();
    return () => {
      ignore = true;
    };
  }, [bookId]);

  return (
    <div className="book-details">
      <Navbar />
      <div className="book-display">
        {bookDetails && (
          <BookDetailsCard
            title={bookDetails.title}
            thumbnailSrc={
              bookDetails.imageLinks
                ? bookDetails.imageLinks.thumbnail
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
            }
            authors={bookDetails.authors ? bookDetails.authors : ["N/A"]}
            description={bookDetails.description}
            publisher={bookDetails.publisher}
            publicationDate={bookDetails.publishedDate}
            shelfStatus={currentShelf}
            changeShelf={changeShelfHandler}
          />
        )}
      </div>
    </div>
  );
}

export default BookDetails;
