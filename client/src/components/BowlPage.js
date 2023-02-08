import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import BowlCard from "./BowlCard"
import CommentSection from "./CommentSection"

export default function BowlPage({currentUser}) {
  const [comments, setComments] = useState([])

  const {id} = useParams()
  const [bowl, setBowl] = useState(null)
  useEffect(() => {
    fetch(`/items/${id}`)
    .then(r => r.json())
    .then(itemData => {
      setBowl(itemData)
      setComments(itemData.comments)
    })
  }, [])

  if (!bowl) return <h2>Loading...</h2>

  return (
    <>
    <div className="items-container">
      <BowlCard key={bowl.id} bowl={bowl} currentUser={currentUser} />
    </div>
    <CommentSection comments={comments} setComments={setComments} currentUser={currentUser} />
    </>
  )
}