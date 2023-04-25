import { useState, useEffect } from "react"

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


export default function LoginPage() {

  const [showLogin, setShowLogin] = useState(true)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`/api/items`)
    .then(r => r.json())
    .then(itemsData => {
      setItems(itemsData)
      console.log("fetched")
    })
  }, [showLogin])

  return (
    <div>

      {showLogin ? (
        <>
          <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm items={items} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
          <p>
            Already have an account?
            <button onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  )
}