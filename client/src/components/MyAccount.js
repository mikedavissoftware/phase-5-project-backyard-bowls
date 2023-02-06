import {useState} from "react"



export default function MyAccount({currentUser, setCurrentUser}) {
  // console.log(currentUser)

  const [showAccountEdit, setShowAccountEdit] = useState(false)
  function switchAccountEdit() {
    setShowAccountEdit(!showAccountEdit)
  }

  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    username:'',
    password:'',
    passwordConfirmation:'',
    image:'',
    favBowl:'',
    diet:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  function submitEdits(e) {
    e.preventDefault();
    setErrors([]);

    const editAccount = {
      username: formData.username,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      image: formData.image,
      fav_bowl: formData.favBowl,
      diet: formData.diet
    };

    fetch("/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editAccount),
    })
    .then((r) => r.json())
    .then((editedAccount) => {
      console.log(editedAccount)
      setCurrentUser(editedAccount)
    })
    // setCurrentUser({
    //   username: "",
    //   password: "",
    // })
  }


  if (!currentUser) return <h2>Loading...</h2>

  return (
    <div>
      <h3>{currentUser.username}</h3>
      <img src={currentUser.image}></img>
      <p><strong>Favorite Bowl: </strong>{currentUser.fav_bowl}</p>
      <p><strong>Diet: </strong>{currentUser.diet}</p>

      {(!showAccountEdit) ? (
        <button onClick={switchAccountEdit}>Edit Account</button>
      ) : (
        <>
        <button onClick={switchAccountEdit}>Hide Edit Account</button>
        <hr width="60%"></hr>
        <h3>Edit Account Details</h3>
        <form onSubmit={submitEdits}>
          <label><strong>Edit Username: </strong></label>
          <input
            type="text"
            name="username"
            placeholder={`Change from ${currentUser.username}`}
            value={formData.username}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Edit Password: </strong></label>
          <input
            type="password"
            name="password"
            placeholder={`Enter New Password...`}
            value={formData.password}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Confirm Password: </strong></label>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder={`Confirm New Password...`}
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Update Profile Picture: </strong></label>
          <input
            type="text"
            name="image"
            placeholder={`${currentUser.image}`}
            value={formData.image}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Change Your Favorite Bowl: </strong></label>
          <input
            type="text"
            name="favBowl"
            placeholder={`${currentUser.fav_bowl}`}
            value={formData.favBowl}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Change Your Diet: </strong></label>
          <input
            type="text"
            name="diet"
            placeholder={`${currentUser.diet}`}
            value={formData.diet}
            onChange={handleChange}
          />

          <br></br>
          <button type="submit">Submit Changes</button>
          
        </form>
        </>
      )}
      
    </div>
  )
}