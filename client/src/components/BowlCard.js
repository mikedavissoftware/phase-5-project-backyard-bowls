import {useEffect, useState} from "react"
import {Link} from "react-router-dom"


export default function BowlCard({bowl, currentUser}) {
  const [itemLikes, setItemLikes] = useState([])
  useEffect()

  const isLikedByCurrentUser = (currentUser) ? (
    bowl.likes.map(((like) => {return like.user_id})).includes(currentUser.id)
  ) : (
    false
  )
  const [showLikeButton, setShowLikeButton] = useState(isLikedByCurrentUser)

  // const [itemLikes, setItemLikes] = useState(likes.filter((like) => {
  //   return like.item_id === bowl.id
  // }))
  console.log(itemLikes)
  
  const vegList = bowl.veggies.slice(1, bowl.veggies.length-1)
  const vegArray = vegList.split(", ")
  const vegComponents = vegArray.map(veggie => {
    return <li>{veggie.slice(1, veggie.length-1)}</li>
  })

  function createLike() {
    fetch(`/likes`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id: currentUser.id, item_id: bowl.id})
    })
    .then(r => r.json())
    .then(newLike => {
      setLikes([...likes, newLike])
      setItemLikes([...itemLikes, newLike])
    })
    console.log(likes)
    console.log(itemLikes)
    setShowLikeButton(!showLikeButton)
  }

  function deleteLike() {
    console.log("delete")
    console.log(itemLikes)
    const userLike = itemLikes.find((itemLike) => {
      return itemLike.user_id === currentUser.id
    })
    fetch(`/likes/${userLike.id}`, {
      method: "DELETE"
    })
    setLikes(likes.filter((like) => {
      return like.id !== userLike.id
    }))
    setItemLikes(itemLikes.filter((like) => {
      return like.id !== userLike.id
    }))
    console.log(likes)
    console.log(itemLikes)
    setShowLikeButton(!showLikeButton)
  }

  return (
    <div className="item">
      <h2><Link to={`/items/${bowl.id}`}>{bowl.name}</Link></h2>
      <h3>$8 small / $13 large</h3>
      <h3>{bowl.likes.length} People Liked this Bowl</h3>
      <img src={bowl.image} style={{height: "150px"}}></img>
      <br></br>
      {
        showLikeButton ? 
        (
          <button onClick={() => {deleteLike()}}>🧡 Unlike this Bowl</button>
        ) : 
        (
          <button onClick={() => {createLike()}}>♡ I like this Bowl</button>
        )
      }
      <hr width="45%"></hr>
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