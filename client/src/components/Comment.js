



export default function Comment({comment}) {

  const {content, rating, user} = comment

  return (
    <div className="comment">
      <div className="comment-picture">
        <img src={comment.user.image}></img>
      </div>
      <div className="comment-content">
        <h3>{user.username} rated this bowl {rating}/10</h3>
        <p>{content}</p>
        <p><em>{user.username}'s favorite bowl is <strong>{user.fav_bowl}</strong></em></p>
      </div>
    </div>
  )
}