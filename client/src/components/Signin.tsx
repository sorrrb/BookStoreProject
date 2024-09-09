import { FormEvent, useContext, useState } from "react"
import { SecurityTokenContext } from "../contexts/SecurityTokenContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ILoginResponse {
  message: string;
  token?: string;
  expiry?: number;
}

function Signin() {
  /* Auth (Context/Router) */
  const { signin } = useContext(SecurityTokenContext);
  const navigate = useNavigate();

  /* Input (State) */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* AJAX validation */
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setHasErrorMessage("");
    setIsLoading(true);

    if (!username || !password) {
      setIsLoading(false);
      setHasErrorMessage("Please fill out both the username and password fields!");
      return;
    }

    try {
      const { data } = await axios.post<ILoginResponse>(
        "/api/signin",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!data?.token) {
        throw new Error("Missing access token in login response.");
      }

      signin(data.token);
      navigate("/bookshelf", { replace: true });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) setHasErrorMessage("Invalid username or password");
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
      {isLoading && <p>Loading... </p>}
      {hasErrorMessage && (
        <div className="signin-warning">
          {hasErrorMessage}
        </div>
      )}
    </div>
  )
}

export default Signin
