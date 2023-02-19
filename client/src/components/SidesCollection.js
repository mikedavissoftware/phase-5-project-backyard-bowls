import {Link} from "react-router-dom"




export default function SidesCollection({sidesDrinks}) {

  const sidesComponents = sidesDrinks.map(item => {
    return (
      <div className="card bg-base-100 shadow-xl image-full m-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <figure><img src={item.image} alt={item.name} /></figure>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p>{item.price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    )
  })


  return (
    <div className="p-10 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {sidesComponents}
    </div>
  )
}