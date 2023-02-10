import {useState, useEffect} from "react"


export default function SignupForm({setCurrentUser, redirect, items}) {
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  // const [passwordConfirmation, setPasswordConfirmation] = useState("")
  // const [image, setImage] = useState("")
  // const [favBowl, setFavBowl] = useState("")
  // const [diet, setDiet] = useState("")

  const [errors, setErrors] = useState([]);

  const newForm = {
    username:'',
    password:'',
    passwordConfirmation:'',
    image:'',
    favBowl:'',
    diet:''
  }
  const [formData, setFormData] = useState(newForm)

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

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });

    redirect()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label><strong>Username:</strong></label>
        <input 
          type="text" 
          name="username" 
          placeholder="Enter username..." 
          value={formData.username} 
          onChange={handleChange} 
        />

        <br></br>
        <label><strong>Password:</strong></label>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter password..." 
          value={formData.password} 
          onChange={handleChange} 
        />

        <br></br>
        <label><strong>Confirm Password:</strong></label>
        <input 
          type="password" 
          name="passwordConfirmation" 
          placeholder="Confirm password..." 
          value={formData.passwordConfirmation} 
          onChange={handleChange} 
        />

        <br></br>
        <label><strong>Image:</strong></label>
        <input 
          type="text" 
          name="image" 
          placeholder="Enter profile image url..." 
          value={formData.image} 
          onChange={handleChange} 
        />

        <br></br>
        <select name="favBowl" onChange={handleChange}>
          <option value={"unspecified"} disabled selected>Select Your Favorite Bowl...</option>
          {bowlOptions}
        </select>

        <br></br>
        <select name="diet" onChange={handleChange}>
          <option value={"unspecified"} disabled selected>Select Your Diet...</option>
          {dietOptions}
        </select>

        <br></br>
        <button className="ui button" type="submit">
          Create Account
        </button>
      </form>
    </div>
  )
}