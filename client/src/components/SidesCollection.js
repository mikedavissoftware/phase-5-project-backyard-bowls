import {Link} from "react-router-dom"




export default function SidesCollection({sidesDrinks, likes, setLikes, currentUser}) {

  const sidesComponents = sidesDrinks.map(item => {
    return (
      <div className="item">
        <h2><Link to={`/items/${item.id}`}>{item.name}</Link></h2>
        <h3>${item.price}</h3>
        <img src={item.image} style={{height: "150px"}}></img>
      </div>
    )
  })


  return (
    <div className="items-container">
      {sidesComponents}
    </div>
  )
}