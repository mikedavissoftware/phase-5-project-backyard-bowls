import {NavLink} from "react-router-dom"
import HeaderLogo from "../images/headerlogo.png"


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
    <div className="bg-banner bg-center bg-contain" className="App-header">
      <img src={HeaderLogo} alt="Backyard Bowls Logo" className="drop-shadow-dark stroke-black" />
      <h1 className="text-bybb text-xl font-serif font-bold">Backyard Bowls</h1>
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
    </div>
  )
}