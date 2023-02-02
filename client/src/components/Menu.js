import {useEffect, useState} from "react"



export default function Menu() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("/items")
    .then(r => r.json())
    .then(itemsData => {
      setItems(itemsData)
    })
  }, [])

  const bowls = items.filter(item => {
    return item.category === "Bowl"
  })
  const bowlComponents = bowls.map(bowl => {
    const vegList = bowl.veggies.slice(1, bowl.veggies.length-1)
    const vegArray = vegList.split(", ")
    const vegComponents = vegArray.map(veggie => {
      return <li>{veggie}</li>
    })

    return (
      <div className="bowl-item">
        <h2>{bowl.name} - $8 small / $13 large</h2>
        <img src={bowl.image} style={{height: "150px"}}></img>
        <h3>Ingredients:</h3>
        <p><strong>Base: </strong>{bowl.base}</p>
        <p><strong>Protein: </strong>{bowl.protein}</p>
        <p><strong>Veggies: </strong></p>
        <ul>
          {vegComponents}
        </ul>
        <p><strong>Dressing: </strong>{bowl.dressing}</p>
        <hr width="70%"></hr>
      </div>
    )
  })

  const sides = items.filter(item => {
    return item.category === "Side"
  })

  const drinks = items.filter(item => {
    return item.category === "Drink"
  })

  console.log(sides)
  console.log(drinks)

  if (!items) return <h2>Loading...</h2>

  return (
    <div>
      <h1>🥗 BOWLS 🥗</h1>
      {bowlComponents}
      <hr></hr>

    </div>
  )
}