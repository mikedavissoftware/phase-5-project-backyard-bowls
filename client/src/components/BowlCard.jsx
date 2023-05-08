import { useState, useContext } from "react"
import { Link } from "react-router-dom"

import { GlobalContext } from "../App"

import Placeholder from "../assets/bowl-placeholder-2.png"


export default function BowlCard({ bowl }) {

  const { currentUser, history, setErrors } = useContext(GlobalContext)

  console.log(bowl)

  const { name, category, image, base, protein, veggies, dressing, price } = bowl

  const [likes, setLikes] = useState(bowl.likes)

  const isLikedByCurrentUser = (currentUser) ? (
    bowl.likes.map(((like) => {return like.user_id})).includes(currentUser.id)
  ) : (
    false
  )
  const [showLikeButton, setShowLikeButton] = useState(isLikedByCurrentUser)

  const [itemLikes, setItemLikes] = useState(bowl.likes)

  const vegArray = JSON.parse(bowl.veggies)
  const vegComponents = vegArray.map(veggie => {
    return <li>{veggie}</li>
  })

  const redirect = () => {
    setErrors(["Please login to like & rate bowls."])
    history.push("/login")
  }
    
  const redirectBowlPage = () => {
    history.push(`/items/${bowl.id}`)
  }

  function createLike() {
    fetch(`/api/likes`, {
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
    setShowLikeButton(!showLikeButton)
  }

  function deleteLike() {
    const userLike = itemLikes.find((itemLike) => {
      return itemLike.user_id === currentUser.id
    })
    fetch(`/api/likes/${userLike.id}`, {
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
    // <div className="item" style={{width: "fit-content", padding: "15px"}}>
    //   <h2><Link to={`/items/${bowl.id}`}>{bowl.name}</Link></h2>
    //   <h3>$8 small / $13 large</h3>
    //   <h3>{itemLikes.length} People Liked this Bowl</h3>
    //   <img src={Placeholder} style={{height: "150px"}}></img>
    //   <br></br>
    //   {
    //     showLikeButton ? 
    //     (
    //       <button onClick={() => {deleteLike()}}>🧡 Unlike this Bowl</button>
    //     ) : 
    //     (
    //       <button onClick={() => {(currentUser) ? (createLike()) : (redirect())}}>♡ I like this Bowl</button>
    //     )
    //   }
    //   <hr width="45%"></hr>
    //   <h3>Ingredients:</h3>
    //   <p><strong>Base: </strong>{bowl.base}</p>
    //   <p><strong>Protein: </strong>{bowl.protein}</p>
    //   <p><strong>Veggies: </strong></p>
    //   <ul>
    //     {vegComponents}
    //   </ul>
    //   <p><strong>Dressing: </strong>{bowl.dressing}</p>
    // </div>
    // <div className="card w-96 bg-base-100 shadow-xl image-full m-5 mx-auto">
    //   <figure><img src={Placeholder} alt="Shoes" /></figure>
    //   <div className="card-body">
    //     <h2 className="card-title">{name}</h2>
    //     <p>If a dog chews shoes whose shoes does he choose?</p>
    //     <div className="card-actions justify-end">
    //       <button className="btn btn-primary">Buy Now</button>
    //     </div>
    //   </div>
    // </div>

    <div className="item">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src={bowl.image} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{bowl.name}</h2>
          <h4 className=""></h4>
          <p>Our <strong>{bowl.name}</strong> has our classic <strong>{bowl.base}</strong> base with <strong>{bowl.protein}</strong> as its protein, and rounding out the ingredients with <strong>{vegComponents}</strong>. Last, but not least, this delicious bowl is finished with a dressing of <strong>{bowl.dressing}</strong>. Bon appétit!</p>
          <div className="card-actions justify-end">
            {
              showLikeButton ? 
              (
                <button className="btn btn-primary" onClick={() => {deleteLike()}}>🧡 Liked</button>
              ) : 
              (
                <button className="btn btn-primary border-2 border-primary" onClick={() => {createLike()}}>♡ Click to Like</button>
              )
            }
            <button className="btn btn-primary" onClick={redirectBowlPage}>More Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}