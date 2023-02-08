import React from "react"
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react"
import './App.css';

import Header from './components/Header'
import Menu from './components/Menu'
import Login from './components/Login'
import Home from './components/Home'
import MyAccount from "./components/MyAccount"
import BowlPage from "./components/BowlPage"

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
    <div className="App">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      
      <Switch>
        <Route path="/items/:id">
          <BowlPage currentUser={currentUser} />
        </Route>
        <Route path="/menu">
          <Menu currentUser={currentUser} />
        </Route>
        <Route path="/me">
          <MyAccount currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/login">
          <Login setCurrentUser={setCurrentUser} history={history} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
}
