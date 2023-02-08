import {useState, useEffect} from "react"

import Comment from "./Comment"
import CommentForm from "./CommentForm"

export default function CommentSection({comments, setComments, currentUser}) {

  const commentComponents = comments.map((comment) => {
    return <Comment id={comment.id} comment={comment} />
  })

  return (
    <div className="comments-container">
      <hr width="60%"></hr>
      <h2>Comments on this Bowl</h2>
      <CommentForm itemId={comments[0].item_id} comments={comments} setComments={setComments} currentUser={currentUser} />
      {commentComponents}
    </div>
  )
}