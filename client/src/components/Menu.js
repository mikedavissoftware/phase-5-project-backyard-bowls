import {useEffect, useState} from "react"

import BowlCollection from "./BowlCollection"
import SidesCollection from "./SidesCollection"


export default function Menu({items, currentUser, likes, setLikes}) {
  
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
      <BowlCollection bowls={bowls} likes={likes} setLikes={setLikes} currentUser={currentUser} />
      <hr width="50%"></hr>
      <h1>🍠 SIDES & DRINKS 🍹</h1>
      <SidesCollection sidesDrinks={sidesDrinks} />
    </div>
  )
}