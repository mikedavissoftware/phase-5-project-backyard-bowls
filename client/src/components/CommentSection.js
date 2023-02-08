import {useState, useEffect} from "react"

import Comment from "./Comment"
import CommentForm from "./CommentForm"
import CommentEditForm from "./CommentEditForm"


export default function CommentSection({comments, setComments, currentUser}) {
  const currentUserComment = comments.find((comment) => {
    return comment.user.id === currentUser.id
  })
  const otherUserComments = comments.filter((comment) => {
    return comment.user.id !== currentUser.id
  })

  const commentComponents = comments.map((comment) => {
    return <Comment id={comment.id} comment={comment} currentUser={currentUser} />
  })
  // const commentComponents = comments.map((comment) => {
  //   return <Comment id={comment.id} comment={comment} />
  // })

  return (
    <div className="comments-container">
      <hr width="60%"></hr>
      <h2>Comments on this Bowl</h2>
      {(currentUserComment) ? (
        <CommentEditForm itemId={comments[0].item_id} currentUserComment={currentUserComment} currentUser={currentUser} />
      ) : (
        <CommentForm itemId={comments[0].item_id} comments={comments} setComments={setComments} currentUser={currentUser} />
      )}
      {commentComponents}
    </div>
  )
}