import {NavLink} from "react-router-dom"
import HeaderLogo from "../images/wordmark-green.png"


export default function Header({currentUser, setCurrentUser}) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  // console.log(currentUser)

  return (
    // <div className="bg-banner bg-center bg-cover bg-white-50">
    <div className="App-header">
      <div className="App-sub-header">
        <nav>
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
        <img src={HeaderLogo} alt="Backyard Bowls Logo" className="header-logo" style={{width: "70%", marginBottom: "20px"}}/>
      </div>
    </div>
  )
}