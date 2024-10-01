import { ChangeEvent } from "react";

type LoginFieldProps = {
  value: string;
  type: string;
  labelClass: string;
  labelName: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  hasError: string;
};

function LoginField({
  value,
  type,
  labelClass,
  labelName,
  changeHandler,
  hasError,
}: LoginFieldProps) {
  return (
    <div className={`${labelClass}-field ${hasError ? "login-error" : ""}`}>
      <label>{labelName}:</label>
      <input type={type} value={value} onChange={changeHandler} />
    </div>
  );
}

export default LoginField;
