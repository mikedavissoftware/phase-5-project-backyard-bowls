import React from "react"
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react"
import './App.css';

import Header from './components/Header'
import Menu from './components/Menu'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import AccountPage from "./components/AccountPage"
import BowlPage from "./components/BowlPage"

export const GlobalContext = createContext()

export default function App() {

  const history = useHistory()
  
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => {
          setCurrentUser(currentUser)
        });
      }
    });
  }, []);

  return (
    <GlobalContext.Provider value={{currentUser, setCurrentUser, history}} className="App">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      
      <Switch>
        <Route path="/items/:id">
          <BowlPage currentUser={currentUser} />
        </Route>
        <Route path="/menu">
          <Menu currentUser={currentUser} />
        </Route>
        <Route path="/me">
          <AccountPage currentUser={currentUser} setCurrentUser={setCurrentUser} history={history} />
        </Route>
        <Route path="/login">
          <LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser} history={history} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </GlobalContext.Provider>
  );
}
