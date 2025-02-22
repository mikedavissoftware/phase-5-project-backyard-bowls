import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import CommentSection from "./CommentSection"
import BowlDetail from "./BowlDetail"

export default function BowlPage() {

  const [comments, setComments] = useState([])

  const { id } = useParams()
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
    {/* <div className="items-container">
      <BowlCard key={bowl.id} bowl={bowl} currentUser={currentUser} />
    </div> */}
    <BowlDetail bowl={bowl} />
    <CommentSection comments={comments} setComments={setComments} />
    </>
  )
}