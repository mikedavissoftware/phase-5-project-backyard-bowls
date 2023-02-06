import React from "react"
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react"
import './App.css';

import Header from './components/Header'
import Menu from './components/Menu'
import Login from './components/Login'
import Home from './components/Home'
import MyAccount from "./components/MyAccount"

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
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

  const history = useHistory();

  const [items, setItems] = useState([])
  useEffect(() => {
    fetch("/items")
    .then(r => r.json())
    .then(itemsData => {
      console.log(itemsData)
      setItems(itemsData)
    })
  }, [])

  if (!items) return <h2>Loading...</h2>

  return (
    <div className="App">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      
      <Switch>
        <Route path="/menu">
          <Menu items={items} currentUser={currentUser} />
        </Route>
        <Route path="/me">
          <MyAccount currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/login">
          <Login setCurrentUser={setCurrentUser} history={history} items={items} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
}
