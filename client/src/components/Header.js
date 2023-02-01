



export default function Header({currentUser, setCurrentUser}) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  console.log(currentUser)

  return (
    <div className="App-header">
      <h1>Backyard Bowls</h1>
      <nav>
        <a href="/items">
          Menu
        </a>
        {currentUser ? (
          <>
            <br></br>
            <a href="/me">
              My Account
            </a>
            <br></br>
            <a href="/logout" onClick={handleLogoutClick}>
              Log Out
            </a>
          </>
        ) : (
          <>
            <br></br>
            <a href="/login">
              Log In
            </a>
          </>
        )}
      </nav>
      
    </div>
  )
}