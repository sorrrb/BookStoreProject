import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/bookshelf", { replace: true })}>My Bookshelf</button>
      <button onClick={() => navigate("/search", { replace: true })}>&#x1F50E;&#xFE0E; Search</button>
    </nav>
  );
}

export default Navbar;
