import { ChangeEvent, FormEvent } from "react";
import LoginField from "./LoginField";

type LoginFormProps = {
  username: string;
  password: string;
  setUsername: (u: string) => void;
  setPassword: (p: string) => void;
  submitHandler: (e: FormEvent) => void;
  isLoading: boolean;
  hasError: string;
};

function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  submitHandler,
  isLoading,
  hasError,
}: LoginFormProps) {
  const changeUser = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const changePass = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <form method="POST" onSubmit={submitHandler}>
      <LoginField
        value={username}
        type={"text"}
        labelClass={"user"}
        labelName={"Username"}
        changeHandler={changeUser}
        hasError={hasError}
      />

      <LoginField
        value={password}
        type={"password"}
        labelClass={"password"}
        labelName={"Password"}
        changeHandler={changePass}
        hasError={hasError}
      />

      <button type="submit" disabled={isLoading}>
        Login
      </button>

      {isLoading && <p className="loader">Loading...</p>}
      {hasError && <div className="warning">{hasError}</div>}
    </form>
  );
}

export default LoginForm;
