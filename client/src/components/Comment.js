import {useState, useEffect} from "react"

import CommentEditForm from "./CommentEditForm"

export default function Comment({comment, currentUser, setComments}) {

  const [shownComment, setShownComment] = useState(comment)
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    fetch(`/comments/${comment.id}`)
    .then(r => r.json())
    .then(commentData => {
      setShownComment(commentData)
    })
  }, [showEditForm])

  const {content, rating, user} = shownComment

  function deleteComment() {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    })
    fetch("/comments")
    .then(r => r.json())
    .then(commentsData => setComments(commentsData))
  }

  if (!comment) return <h3>Loading...</h3>

  return (
    <div>
      <div className="comment">
        <div className="comment-picture">
          <img src={user.image}></img>
        </div>
        <div className="comment-content">
          <h3>{user.username} rated this bowl {rating}/10</h3>
          <p>{content}</p>
          <p><em>{user.username}'s favorite bowl is <strong>{user.fav_bowl}</strong></em></p>
          {(currentUser && user.id === currentUser.id) ? (
            <span>
              {(!showEditForm) ? (
                <button onClick={() => setShowEditForm(true)}>Edit My Comment</button>
              ) : (
                <button onClick={() => setShowEditForm(false)}>Hide Edit Form</button>
              )}
              <button onClick={() => deleteComment}>Delete My Comment</button>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      {(showEditForm) ? (
        <CommentEditForm itemId={comment.item_id} shownComment={shownComment} setShowEditForm={setShowEditForm} />
      ) : (
        <></>
      )}
    </div>
  )
}