import { useState, useEffect , useContext } from "react"

import BowlCollection from "./BowlCollection"
import SidesCollection from "./SidesCollection"

import { GlobalContext } from "../App"


export default function Menu() {

  const [allLikes, setAllLikes] = useState([])
  useEffect(() => {
    fetch("/likes")
    .then(r => r.json())
    .then(likesData => {
      setAllLikes(likesData)
    })
  }, [])
  
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch("/items")
    .then(r => r.json())
    .then(itemsData => {
      // console.log(itemsData)
      setItems(itemsData)
    })
  }, [allLikes])

  const bowls = items.filter(item => {
    return item.category === "Bowl"
  })
  const sides = items.filter(item => {
    return item.category === "Side"
  })
  const drinks = items.filter(item => {
    return item.category === "Drink"
  })
  const sidesDrinks = [...sides, ...drinks]

  if (!items) return <h2>Loading...</h2>

  return (
    <div className="menu-container">
      <h1>🥗 BOWLS 🥗</h1>
      <BowlCollection bowls={bowls} allLikes={allLikes} setAllLikes={setAllLikes} />
      <hr width="50%"></hr>
      <h1>🍠 SIDES & DRINKS 🍹</h1>
      <SidesCollection sidesDrinks={sidesDrinks} />
    </div>
  )
}