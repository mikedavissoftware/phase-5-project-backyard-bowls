import {useState} from "react"
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom"


export default function BowlCard({bowl, currentUser}) {

  const history = useHistory()
  const redirectLogin = () => {
    history.push("/login")
  }
  const redirectBowlPage = () => {
    history.push(`/items/${bowl.id}`)
  }

  const [likes, setLikes] = useState(bowl.likes)

  const isLikedByCurrentUser = (currentUser) ? (
    bowl.likes.map(((like) => {return like.user_id})).includes(currentUser.id)
  ) : (
    false
  )
  const [showLikeButton, setShowLikeButton] = useState(isLikedByCurrentUser)

  const [itemLikes, setItemLikes] = useState(bowl.likes)
  
  const vegArray = JSON.parse(bowl.veggies)  
  let vegI = 0
  const vegComponents = vegArray.map(veggie => {
    vegI++
    return (
      (vegI < (vegArray.length)) ? (
        <span>{veggie}, </span>
      ) : (
        <span>and {veggie}.</span>
      )
    )
  })

  console.log(vegComponents)

  function createLike() {
    (!currentUser) ? (
      redirectLogin()
    ) : (
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
        setShowLikeButton(!showLikeButton)
      })
    )
  }

  function deleteLike() {
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
    setShowLikeButton(!showLikeButton)
  }

  return (
    <div className="item">
      <p><strong>Dressing: </strong>{bowl.dressing}</p>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={bowl.image} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{bowl.name}</h2>
          <h4 className=""></h4>
          <p>Our <strong>{bowl.name}</strong> has our classic <strong>{bowl.base}</strong> base with <strong>{bowl.protein}</strong> as its protein, and rounding out the ingredients with <strong>{vegComponents}</strong>. Last, but not least, this delicious bowl is finished with a dressing of <strong>{bowl.dressing}</strong>. Bon appétit!</p>
          <div className="card-actions justify-end grid grid-cols-2">
            {
              showLikeButton ? 
              (
                <button className="btn btn-primary" onClick={() => {deleteLike()}}>🧡 Liked</button>
              ) : 
              (
                <button className="btn btn-asdf border-2 border-primary" onClick={() => {createLike()}}>♡ Click to Like</button>
              )
            }
            <button className="btn btn-primary" onClick={redirectBowlPage}>More Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}