import { FormEvent, useState, useContext } from "react";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "./LoginForm";

interface ILoginResponse {
  message: string;
  token?: string;
  expiry?: number;
}

function Login() {
  const { login } = useContext(AccessTokenContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const handleLoginAttempt = async (e: FormEvent) => {
    e.preventDefault();
    setHasError("");
    setIsLoading(true);

    if (!username || !password) {
      setIsLoading(false);
      setHasError("Please fill out both fields!");
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
        throw new Error("Missing access token in login response");
      }
      
      login(data.token);
      navigate("/search", { replace: true });
    } catch (e) {
      console.error(e);

      if (axios.isAxiosError(e) && e.response?.status === 401) {
        setHasError("Invalid username or password.")
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="login">

      <div className="login-hero">
        <h1>Bookstore</h1>
        <h2>Please login to access the bookstore</h2>
      </div>

      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        submitHandler={handleLoginAttempt}
        isLoading={isLoading}
        hasError={hasError}
         />

    </div>
  )
}

export default Login
