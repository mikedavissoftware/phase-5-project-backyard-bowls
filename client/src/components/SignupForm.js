import {useState, useEffect} from "react"


export default function SignupForm({setCurrentUser, redirect, items}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [image, setImage] = useState("")
  const [favBowl, setFavBowl] = useState("")
  const [diet, setDiet] = useState("")

  const [errors, setErrors] = useState([]);

  const bowls = items.filter(item => {
    return item.category === "Bowl"
  })
  const bowlNames = bowls.map(bowl => {
    return bowl.name
  })
  const bowlOptions = bowlNames.map(name => {
    return <option value={name}>{name}</option>
  })

  const dietArray = JSON.parse(items.find((item) => {
    return item.category === "Diets"
  }).name)
  const dietOptions = dietArray.map(diet => {
    return <option value={diet}>{diet}</option>
  })

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        image,
        fav_bowl: favBowl,
        diet
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });

    // console.log(currentUser)
    redirect()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label><strong>Username:</strong></label>
      <input 
        type="text" 
        id="username" 
        placeholder="Enter username..." 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />

      <label><strong>Password:</strong></label>
      <input 
        type="password" 
        id="password" 
        placeholder="Enter password..." 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />

      <label><strong>Confirm Password:</strong></label>
      <input 
        type="password" 
        id="password-confirmation" 
        placeholder="Confirm password..." 
        value={passwordConfirmation} 
        onChange={(e) => setPasswordConfirmation(e.target.value)} 
      />

      <label><strong>Image:</strong></label>
      <input 
        type="text" 
        id="image" 
        placeholder="Enter profile image url..." 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
      />

      <select id="fav-bowl" name="fav-bowl" onChange={(e) => setFavBowl(e.target.value)}>
        <option value={"unspecified"} disabled selected>Select Your Favorite Bowl...</option>
        {bowlOptions}
      </select>

      <select id="genre" name="genre" onChange={(e) => setDiet(e.target.value)}>
        <option value={["unspecified"]} disabled selected>Select Your Diet...</option>
        {dietOptions}
      </select>

      <button className="ui button" type="submit">
        Create Account
      </button>
      </form>
    </div>
  )
}