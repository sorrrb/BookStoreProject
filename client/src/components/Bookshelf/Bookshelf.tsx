import { useEffect, useState, useContext } from "react";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import BookshelfCard from "./BookshelfCard";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IBookshelf {
  books: {
    currentlyReading: string[];
    read: string[];
    wantToRead: string[];
  };
}

function Bookshelf() {
  const { getToken } = useContext(AccessTokenContext);
  const navigate = useNavigate();

  const [bookshelf, setBookshelf] = useState({});
  const [shelfWant, setShelfWant] = useState<string[]>([]);
  const [shelfCurrent, setShelfCurrent] = useState<string[]>([]);
  const [shelfRead, setShelfRead] = useState<string[]>([]);

  useEffect(() => {
    async function loadBookshelf() {
      try {
        const { data } = await axios.get<IBookshelf>("/api/bookshelf", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!ignore) {
          setBookshelf(data.books);
          setShelfCurrent(data.books.currentlyReading);
          setShelfRead(data.books.read);
          setShelfWant(data.books.wantToRead);
        }
      } catch (e) {
        console.error(e);
        if (axios.isAxiosError(e) && e.response?.status === 401) {
          navigate("/", { replace: true });
        }
      }
    }

    let ignore = false;
    loadBookshelf();
    return () => {
      ignore = true;
    };
  }, [bookshelf]);

  const updateShelf = (obj: object) => setBookshelf(obj);

  return (
    <div className="bookshelf">
      <Navbar />
      <div className="book-display">
        <div className="bookshelf--container">
          <div className="bookshelf-wrapper">
            <h1>Want to Read</h1>
            {bookshelf &&
              (shelfWant.length >= 1 ? (
                shelfWant.map((book: any, index: number) => {
                  return (
                    <BookshelfCard
                      key={index}
                      title={book.title}
                      thumbnailSrc={
                        book.imageLinks
                          ? book.imageLinks.thumbnail
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                      }
                      shelfStatus={"Want to Read"}
                      bookID={book.id}
                      updateShelf={updateShelf}
                    />
                  );
                })
              ) : (
                <p>No books in the shelf!</p>
              ))}
          </div>

          <div className="bookshelf-wrapper">
            <h1>Currently Reading</h1>
            {bookshelf &&
              (shelfCurrent.length >= 1 ? (
                shelfCurrent.map((book: any, index: number) => {
                  return (
                    <BookshelfCard
                      key={index}
                      title={book.title}
                      thumbnailSrc={
                        book.imageLinks
                          ? book.imageLinks.thumbnail
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                      }
                      shelfStatus={"Currently Reading"}
                      bookID={book.id}
                      updateShelf={updateShelf}
                    />
                  );
                })
              ) : (
                <p>No books in the shelf!</p>
              ))}
          </div>

          <div className="bookshelf-wrapper">
            <h1>Read</h1>
            {bookshelf &&
              (shelfRead.length >= 1 ? (
                shelfRead.map((book: any, index: number) => {
                  return (
                    <BookshelfCard
                      key={index}
                      title={book.title}
                      thumbnailSrc={
                        book.imageLinks
                          ? book.imageLinks.thumbnail
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                      }
                      shelfStatus={"Read"}
                      bookID={book.id}
                      updateShelf={updateShelf}
                    />
                  );
                })
              ) : (
                <p>No books in the shelf!</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookshelf;
