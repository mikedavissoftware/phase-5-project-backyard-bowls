import {useState, useEffect} from "react"
import BowlCard from "./BowlCard"


export default function BowlCollection({bowls, currentUser}) {
  const [allLikes, setAllLikes] = useState([])
  useEffect(() => {
    fetch("/likes")
    .then(r => r.json())
    .then(likesData => {
      setAllLikes(likesData)
    })
  }, [])

  const bowlCards = bowls.map(bowl => {
    // console.log(bowl.id)
    return <BowlCard key={bowl.id} bowl={bowl} allLikes={allLikes} setAllLikes={setAllLikes} currentUser={currentUser} />
  })

  return (
    <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {bowlCards}
    </div>
  )
}