import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import BowlCard from "./BowlCard"
import CommentSection from "./CommentSection"

export default function BowlPage({items, likes, setLikes, currentUser}) {

  const {id} = useParams()
  const [bowl, setBowl] = useState(null)
  // const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/items/${id}`)
    .then(r => r.json())
    .then(itemData => {
      setBowl(itemData)
      console.log(bowl)
    })
  }, [items])

  if (!bowl) return <h2>Loading...</h2>

  // setComments(bowl.comments)

  return (
    <>
    <div className="items-container">
      <BowlCard key={bowl.id} bowl={bowl} likes={likes} setLikes={setLikes} currentUser={currentUser} />
    </div>
    <CommentSection comments={bowl.comments} currentUser={currentUser} />
    </>
  )
}