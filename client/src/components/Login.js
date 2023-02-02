import {useState} from "react"

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


export default function Login({setCurrentUser, history}) {
  const [showLogin, setShowLogin] = useState(true);

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
          <SignupForm setCurrentUser={setCurrentUser} redirect={redirect} />
          
          <p>Already have an account?</p>
          <button onClick={redirect}>
            Log In
          </button>
        </>
      )}
    </div>
  )
}