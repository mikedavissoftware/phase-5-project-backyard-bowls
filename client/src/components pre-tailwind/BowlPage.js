import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import CommentSection from "./CommentSection"
import BowlDetail from "./BowlDetail"

export default function BowlPage({currentUser}) {
  const [comments, setComments] = useState([])
  const [fetchCounter, setFetchCounter] = useState(0)

  const {id} = useParams()
  const [bowl, setBowl] = useState(null)
  
  useEffect(() => {
    fetch(`/items/${id}`)
    .then(r => r.json())
    .then(itemData => {
      setBowl(itemData)
      setComments(itemData.comments)
      console.log(`comments fetched ${fetchCounter} time(s)`)
    })
  }, [fetchCounter])

  if (!bowl) return <h2>Loading...</h2>

  return (
    <>
    {/* <div className="items-container">
      <BowlCard key={bowl.id} bowl={bowl} currentUser={currentUser} />
    </div> */}
    <BowlDetail key={bowl.id} bowl={bowl} currentUser={currentUser} />
    <CommentSection itemId={bowl.id} comments={comments} currentUser={currentUser} fetchCounter={fetchCounter} setFetchCounter={setFetchCounter} />
    </>
  )
}