import {useState} from "react"




export default function Login({setCurrentUser, history}) {
  const [showLogin, setShowLogin] = useState(true);

  const redirect = () => {
    history.push('/me');
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
          <SignUpForm setCurrentUser={setCurrentUser} redirect={redirect} />
          
          <p>
            Already have an account? &nbsp;
            <button onClick={redirect}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  )
}