import { useContext } from "react"
import { NavLink } from "react-router-dom"
import HeaderLogo from "../assets/images/wordmark-green.png"

import NavBarRegular from "./NavBarRegular"
import NavBarCollapse from "./NavBarCollapse"

import { GlobalContext } from "../App"


export default function Footer() {

  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  return (
    // <div className="bg-banner bg-center bg-cover bg-white-50">
    <div>
      <NavBarRegular currentUser={currentUser} handleLogoutClick={handleLogoutClick} />
      <NavBarCollapse currentUser={currentUser} handleLogoutClick={handleLogoutClick} />
      <img src={HeaderLogo} alt="Backyard Bowls Logo" className="drop-shadow-dark stroke-black p-3 mx-auto" style={{width: "95%", marginBottom: "20px", maxWidth: "600px"}}/>
    </div>
  )
}