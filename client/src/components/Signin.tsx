import { FormEvent, useContext, useState } from "react"
import { SecurityTokenContext } from "../contexts/SecurityTokenContext"
import { useNavigate } from "react-router-dom";

function Signin() {
  /* Auth (Context/Router) */
  const {signin} = useContext(SecurityTokenContext);
  const navigate = useNavigate();

  /* Input (State) */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* AJAX validation */
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("API HERE");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="signin">
      <h1>Bookstore</h1>
      <form
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="user-field">
          <label>Username: </label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="password-field">
          <label>Password: </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type="submit" disabled={isLoading}>Login</button>
      </form>
    </div>
  )
}

export default Signin
