import {useEffect, useState} from "react"



export default function Menu() {

  const [items, setItems] = useState([])

  useEffect(
    fetch("/items")
    .then(r => r.json())
    .then(itemsData => {
      setItems(itemsData)
    })
  )

  console.log(items)

  if (!items) return <h2>Loading...</h2>

  return (
    <div>
      <h2>ayyyyy</h2>
    </div>
  )
}