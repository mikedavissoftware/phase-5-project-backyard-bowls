import {useState, useEffect} from "react"

import CommentEditForm from "./CommentEditForm"

export default function Comment({comment, currentUser, setShowCommentForm, fetchCounter, setFetchCounter}) {

  const [shownComment, setShownComment] = useState(comment)
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    fetch(`/comments/${comment.id}`)
    .then(r => r.json())
    .then(commentData => {
      setShownComment(commentData)
    })
  }, [showEditForm])

  function deleteComment() {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    })
    setFetchCounter(fetchCounter + 1)
  }

  return (
    <div>
      <div className="comment">
        <div className="comment-picture">
          <img src={shownComment.user.image}></img>
        </div>
        <div className="comment-content">
          <h3>{shownComment.user.username} rated this bowl {shownComment.rating}/10</h3>
          <p>{shownComment.content}</p>
          <p><em>{shownComment.user.username}'s favorite bowl is <strong>{shownComment.user.fav_bowl}</strong></em></p>
          {(currentUser && shownComment.user.id === currentUser.id) ? (
            <span>
              {(!showEditForm) ? (
                <button onClick={() => setShowEditForm(true)}>Edit My Comment</button>
              ) : (
                <button onClick={() => setShowEditForm(false)}>Hide Edit Form</button>
              )}
              <button onClick={() => deleteComment()}>Delete My Comment</button>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      {(showEditForm) ? (
        <CommentEditForm shownComment={shownComment} setShowEditForm={setShowEditForm} />
      ) : (
        <></>
      )}
    </div>
  )
}