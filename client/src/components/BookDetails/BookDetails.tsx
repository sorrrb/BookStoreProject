import { ChangeEvent, useEffect, useContext, useState } from "react";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import BookDetailsCard from "./BookDetailsCard";
import axios from "axios";

interface IBookDetailResponse {
  book: string;
}

interface IBookshelf {
  books: {
    currentlyReading: string[];
    read: string[];
    wantToRead: string[];
  };
}

function BookDetails() {
  const { getToken } = useContext(AccessTokenContext);
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
    async function loadShelf() {
      try {
        const { data } = await axios.get<IBookshelf>("/api/bookshelf", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!ignore) {
          const bookshelfObj = data.books;
          bookshelfObj.wantToRead.forEach((book: any) => {
            if (book.id === bookId) setCurrentShelf("Want to Read");
          });
          bookshelfObj.currentlyReading.forEach((book: any) => {
            if (book.id === bookId) setCurrentShelf("Currently Reading");
          });
          bookshelfObj.read.forEach((book: any) => {
            if (book.id === bookId) setCurrentShelf("Read");
          });
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function getDetails() {
      try {
        const { data } = await axios.get<IBookDetailResponse>(
          `/api/book/${bookId}`
        );
        if (!ignore) {
          setBookDetails(data.book);
        }
      } catch (e) {
        console.error(e);
      }
    }

    let ignore = false;
    loadShelf();
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
            bookID={bookId}
            thumbnailSrc={
              bookDetails.imageLinks
                ? bookDetails.imageLinks.thumbnail
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
            }
            authors={bookDetails.authors ? bookDetails.authors : ["N/A"]}
            description={bookDetails.description}
            publisher={bookDetails.publisher}
            publicationDate={bookDetails.publishedDate}
            pages={bookDetails.pageCount}
            dimensions={bookDetails.dimensions}
            infoSrc={bookDetails.infoLink}
            previewSrc={bookDetails.previewLink}
            shelfStatus={currentShelf}
            changeShelf={changeShelfHandler}
          />
        )}
      </div>
    </div>
  );
}

export default BookDetails;
