import {useState, useEffect} from "react"

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


export default function LoginPage({currentUser, setCurrentUser, history}) {

  const [showLogin, setShowLogin] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("/items")
    .then(r => r.json())
    .then(itemsData => {
      setItems(itemsData)
      console.log("fetched")
    })
  }, [showLogin])

  const redirect = () => {
    history.push('/menu');
  }

  return (
    <div>

      {showLogin ? (
        <>
          <LoginForm setCurrentUser={setCurrentUser} redirect={redirect} />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm items={items} currentUser={currentUser} setCurrentUser={setCurrentUser} redirect={redirect} />
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