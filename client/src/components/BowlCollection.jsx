import { useState, useEffect } from "react"

import BowlCard from "./BowlCard"


export default function BowlCollection({ bowls }) {

  const [allLikes, setAllLikes] = useState([])
  useEffect(() => {
    fetch(`/api/likes`)
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