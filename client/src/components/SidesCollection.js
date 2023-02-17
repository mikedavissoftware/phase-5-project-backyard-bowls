import {Link} from "react-router-dom"




export default function SidesCollection({sidesDrinks}) {

  const sidesComponents = sidesDrinks.map(item => {
    return (
      <div className="card w-50 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p>{item.price}</p>
        </div>
        <figure><img src={item.image} alt={item.name} /></figure>
      </div>
    )
  })


  return (
    <div className="items-container">
      {sidesComponents}
    </div>
  )
}