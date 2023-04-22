import { useContext } from "react"
import { NavLink } from "react-router-dom"
import HeaderLogo from "../images/wordmark-green.png"

import { GlobalContext } from "../App"


export default function Footer() {

  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  return (
    // <div className="bg-banner bg-center bg-cover bg-white-50">
    <div className="App-header">
      <nav style={{marginBottom: "30px"}}>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>|
        <NavLink to="/menu" className="nav-link">
          Menu
        </NavLink>|
        {currentUser ? (
          <>
            <NavLink to="/me" className="nav-link">
              My Account
            </NavLink>|
            <NavLink to="/logout" className="nav-link" onClick={handleLogoutClick}>
              Log Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">
              Log In
            </NavLink>
          </>
        )}
      </nav>
      <img src={HeaderLogo} alt="Backyard Bowls Logo" className="drop-shadow-dark stroke-black p-3 mx-auto" style={{width: "95%", marginBottom: "20px", maxWidth: "600px"}}/>
    </div>
  )
}