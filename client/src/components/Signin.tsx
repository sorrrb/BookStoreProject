function Signin() {
  return (
    <div className="signin">
      <h1>Bookstore</h1>
      <form>
        <div className="user-field">
          <label>Username: </label>
          <input type="text" />
        </div>
        <div className="password-field">
          <label>Password: </label>
          <input type="password" />
        </div>
        <button type="submit">LOG-IN</button>
      </form>
    </div>
  )
}

export default Signin
