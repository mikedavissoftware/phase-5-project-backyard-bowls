import {useState} from "react"
import {Link} from "react-router-dom"



export default function BowlCard({bowl, likes, setLikes, currentUser}) {

  console.log(likes)

  const likedByCurrentUser = bowl.likes.map((like => {
    return like.user_id
  })).includes(currentUser.id)

  const [showLikeButton, setShowLikeButton] = useState(likedByCurrentUser)
  
  const vegList = bowl.veggies.slice(1, bowl.veggies.length-1)
  const vegArray = vegList.split(", ")
  const vegComponents = vegArray.map(veggie => {
    return <li>{veggie.slice(1, veggie.length-1)}</li>
  })

  function createLike(itemId) {
    fetch(`/likes`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id: currentUser.id, item_id: itemId})
    })
    .then(r => r.json())
    .then(newLike => setLikes(...likes, newLike))
    console.log("create like")
    console.log(likes)

    setShowLikeButton(!showLikeButton)
  }

  function deleteLike(itemId) {
    const itemLikes = likes.filter((like) => {
      return like.item_id === itemId
    })
    console.log("item likes")
    console.log(itemLikes)
    const userLike = itemLikes.filter((itemLike) => {
      return itemLike.user_id === currentUser.id
    })
    console.log("user like")
    console.log(userLike)
    fetch(`/likes/${userLike[0].id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setLikes(likes.filter((like) => {
      return like.id !== userLike[0].id
    }))
    console.log(likes)

    setShowLikeButton(!showLikeButton)
  }


  return (
    <div className="item">
      <h2><Link to={`/items/${bowl.id}`}>{bowl.name}</Link></h2>
      <h3>$8 small / $13 large</h3>
      <h3>{bowl.likes.length} People Liked this Bowl</h3>
      <img src={bowl.image} style={{height: "150px"}}></img>
      {
        showLikeButton ? 
        (
          <a onClick={() => {deleteLike(bowl.id)}}>🧡 You Like this Bowl</a>
        ) : 
        (
          <a onClick={() => {createLike(bowl.id)}}>♡ Click to Like this Bowl</a>
        )
      }
      <h3>Ingredients:</h3>
      <p><strong>Base: </strong>{bowl.base}</p>
      <p><strong>Protein: </strong>{bowl.protein}</p>
      <p><strong>Veggies: </strong></p>
      <ul>
        {vegComponents}
      </ul>
      <p><strong>Dressing: </strong>{bowl.dressing}</p>
    </div>
  )
}