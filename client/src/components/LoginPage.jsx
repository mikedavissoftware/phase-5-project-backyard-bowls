import { useState, useEffect , useContext, createContext } from "react"

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { GlobalContext } from "../App"


export default function LoginPage() {

  const { history, api } = useContext(GlobalContext)

  const [showLogin, setShowLogin] = useState(true)

  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${api}/items`)
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
          <LoginForm />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm items={items} />
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