import {useState} from "react"



export default function MyAccount({currentUser}) {
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editPasswordConfirmation, setEditPasswordConfirmation] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editFavBowl, setEditFavBowl] = useState("")
  const [editDiet, setEditDiet] = useState("")

  if (!currentUser) return <h2>Loading...</h2>

  return (
    <div>
      <h3>{currentUser.username}</h3>
      <img src={currentUser.image}></img>
      <p><strong>Favorite Bowl: </strong>{currentUser.fav_bowl}</p>
      <p><strong>Diet: </strong>{currentUser.diet}</p>
    </div>
  )
}