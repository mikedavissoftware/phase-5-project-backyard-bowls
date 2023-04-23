import { useState, useEffect, useContext } from "react"

import BowlCard from "./BowlCard"

import { GlobalContext } from "../App"


export default function BowlCollection({ bowls }) {

  const { api } = useContext(GlobalContext)

  const [allLikes, setAllLikes] = useState([])
  useEffect(() => {
    fetch(`${api}/likes`)
    .then(r => r.json())
    .then(likesData => {
      setAllLikes(likesData)
    })
  }, [])

  const bowlCards = bowls.map(bowl => {
    // console.log(bowl.id)
    return <BowlCard key={bowl.id} bowl={bowl} allLikes={allLikes} setAllLikes={setAllLikes} />
  })

  return (
    <div className="items-container">
      {bowlCards}
    </div>
  )
}