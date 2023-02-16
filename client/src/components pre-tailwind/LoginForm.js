import { useState } from "react";


export default function LoginForm({setCurrentUser, redirect}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setCurrentUser(currentUser));
        redirect()
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const showErrors = errors.map((error) => {
    return <h4 style={{color: "#dd0000"}}>{error}</h4>
  })

  return (
    <div>
      {(errors.length > 0) ? (
        showErrors
      ) : (
        <h3>Log In Below</h3>
      )}
      <form  onSubmit={handleSubmit}>
        <label><strong>Username: </strong></label>
        <input
          type="text" 
          id="username" 
          placeholder="Enter username..." 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        <br></br>
        <label><strong>Password: </strong></label>
        <input
          type="password"
          id="password"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br></br>
        <button type="submit">
          Log In
        </button>
      </form>
    </div>
  )
}