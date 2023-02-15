import {useState, useEffect} from "react"

import Comment from "./Comment"
import CommentForm from "./CommentForm"
import CommentEditForm from "./CommentEditForm"


export default function CommentSection({comments, setComments, currentUser}) {

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

  const commentComponentsUser = commentsArray.map((comment) => {
    return <Comment id={comment.id} comment={comment} currentUser={currentUser} setComments={setComments} />
  })
  const commentComponentsNoUser = commentsArray.map((comment) => {
    return <Comment id={comment.id} comment={comment} setComments={setComments} />
  })

  if (!currentUser) return (
    <div className="comments-container">
      <hr width="60%"></hr>
      <h2>Comments on this Bowl</h2>
      {commentComponentsNoUser}
    </div>
  )

  return (
    <div className="comments-container">
      <hr width="60%"></hr>
      <h2>Comments on this Bowl</h2>
      {(currentUserComments.length > 0) ? (
        <></>
        // <CommentEditForm itemId={comments[0].item_id} currentUserComments={currentUserComments} currentUser={currentUser} comments={comments} setComments={setComments} />
      ) : (
        <CommentForm itemId={comments[0].item_id} currentUser={currentUser} setComments={setComments} />
      )}
      {commentComponentsUser}
    </div>
  )
}