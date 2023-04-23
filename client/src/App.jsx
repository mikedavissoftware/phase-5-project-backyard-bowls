import React from "react"
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState, createContext } from "react"
import './App.css';

import Header from './components/Header'
import Menu from './components/Menu'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import AccountPage from "./components/AccountPage"
import BowlPage from "./components/BowlPage"
import Footer from "./components/Footer"

export const GlobalContext = createContext()

export default function App() {

  const history = useHistory()

  const api = import.meta.env.PROD ? "https://daggett-control-website.onrender.com" : "http://localhost:3000"
  
  const [errors, setErrors] = useState([])
  
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    // auto-login
    fetch(`${api}/me`).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => {
          setCurrentUser(currentUser)
        });
      }
    });
  }, []);

  return (
    <div className="App">
    <GlobalContext.Provider value={{ currentUser, setCurrentUser, history, api, errors, setErrors }}>
      <Header />
      
      <Switch>
        <Route path="/items/:id">
          <BowlPage />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/me">
          <AccountPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </GlobalContext.Provider>
    </div>
  );
}
