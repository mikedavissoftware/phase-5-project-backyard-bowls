import {useState, useEffect} from "react"

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


export default function Login({setCurrentUser, history}) {
  const [showLogin, setShowLogin] = useState(true);
  const [items, setItems] = useState([])

  const redirect = () => {
    history.push('/menu');
  }

  useEffect(() => {
    fetch("/items")
    .then(r => r.json())
    .then(itemsData => {
      setItems(itemsData)
    })
  }, [])

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
          <SignupForm setCurrentUser={setCurrentUser} redirect={redirect} items={items} />
          <p>Already have an account?</p>
          <button onClick={redirect}>
            Log In
          </button>
        </>
      )}
    </div>
  )
}