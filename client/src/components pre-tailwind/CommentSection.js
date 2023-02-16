import {useState, useEffect} from "react"

import Comment from "./Comment"
import CommentForm from "./CommentForm"

export default function CommentSection({itemId, comments, currentUser, fetchCounter, setFetchCounter}) {

  const [showCommentForm, setShowCommentForm] = useState(false)

  const currentUserComments = (currentUser) ? (
    comments.filter((comment) => {
      return comment.user.id === currentUser.id
    })
  ) : (
    []
  )
  
  const otherUserComments = (currentUser) ? (
    comments.filter((comment) => {
      return comment.user.id !== currentUser.id
    })
  ) : (
    comments
  )

  const commentsArray = (currentUserComments !== []) ? (
    [...currentUserComments, ...otherUserComments]
  ) : (
    otherUserComments
  )

  const commentComponents = commentsArray.map((comment) => {
    return <Comment key={comment.id} comment={comment} currentUser={currentUser} setShowCommentForm={setShowCommentForm} fetchCounter={fetchCounter} setFetchCounter={setFetchCounter} />
  })

  return (
    <div className="comments-container">
      <hr width="60%"></hr>
      <h2>Comments on this Bowl</h2>
      {(currentUserComments.length > 0) ? (
        <></>
      ) : (
        <CommentForm itemId={itemId} currentUser={currentUser} showCommentForm={showCommentForm} setShowCommentForm={setShowCommentForm} fetchCounter={fetchCounter} setFetchCounter={setFetchCounter} />
      )}
      {commentComponents}
    </div>
  )
}