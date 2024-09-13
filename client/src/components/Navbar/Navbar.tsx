import { useContext } from "react";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AccessTokenContext);

  return (
    <nav className="navbar">
      <div className="bookshelf-nav">
        <Link
          to={"../bookshelf"}
          relative={"path"}
        >
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios-filled/40/tidy-shelf.png"
            alt="tidy-shelf"/>
          <h1>My Bookshelf</h1>
        </Link>
      </div>
      <div className="search-signout--container">
        <div className="search-nav">
          <Link
            to={"../search"}
            relative={"path"}
          >
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/ios-filled/25/search.png"
              alt="search"/>
            <h1>Search</h1>
          </Link>
        </div>
        <div className="signout-nav" onClick={() => logout()}>
          <Link
            to={"../"}
            relative={"path"}
          >
            <img
              width={25}
              height={25}
              src="https://img.icons8.com/windows/25/exit.png"
              alt="exit"/>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
