import {NavLink} from "react-router-dom"
import HeaderLogo from "../images/wordmark-green.png"
import Icon from "../images/icon.png"


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

      <img src={HeaderLogo} alt="Backyard Bowls Logo" className="drop-shadow-dark stroke-black p-3 mx-auto" style={{width: "95%", marginBottom: "20px"}}/>
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
      <div className="navbar bg-base-100 rounded-md">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/" className="my-0.5">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/menu" className="my-0.5">
                  Menu
                </NavLink>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Backyard Bowls</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className="mx-0.5">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className="mx-0.5">
                Menu
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {currentUser ? (
            <>
              <NavLink to="/me" className="btn">
                My Account
              </NavLink>|
              <NavLink to="/logout" className="btn" onClick={handleLogoutClick}>
                Log Out
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn">
                Log In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  )
}