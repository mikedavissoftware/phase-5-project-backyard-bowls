



export default function Comment({comment, currentUser}) {

  const {content, rating, user} = comment

  function deleteComment() {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    })
  }

  return (
    <div className="comment">
      <div className="comment-picture">
        <img src={comment.user.image}></img>
      </div>
      <div className="comment-content">
        <h3>{user.username} rated this bowl {rating}/10</h3>
        <p>{content}</p>
        <p><em>{user.username}'s favorite bowl is <strong>{user.fav_bowl}</strong></em></p>
        {(user.id === currentUser.id) ? (
          <button onClick={deleteComment}>Delete This Comment</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}