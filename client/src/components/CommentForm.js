import {useState} from "react"

import Comment from "./Comment"

export default function CommentForm({itemId, comments, setComments, currentUser}) {
  console.log(currentUser)

  const [showCommentForm, setShowCommentForm] = useState(false)
  function toggleCommentForm() {
    setShowCommentForm(!showCommentForm)
  }

  function numberOptions(max) {        
    const numbersArray = []
    for (let i=0; i<max; i++) {
        numbersArray.push(
            <option value={i}>{i}</option>
        )
    }
    return numbersArray
  }

  const newForm = {
    rating: 10,
    content: "",
    user_id: currentUser.id,
    item_id: itemId
  }
  const [formData, setFormData] = useState(newForm)

  function handleChange(event) {
    console.log(event.target.value);
    setFormData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }

  function submitComment(e) {
    e.preventDefault()

    console.log("submit button pushed")

    fetch(`/comments`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    // .then(r => r.json())
    // .then(newComment => {
    //   setComments(newComment, ...comments)
    // })

    setFormData(newForm)
    setShowCommentForm(false)
  }

  return (
    <div>
      {(!showCommentForm) ? (
        <button onClick={() => toggleCommentForm()}>Show Comment Form</button>
      ) : (
        <>
        <button onClick={() => toggleCommentForm()}>Hide Comment Form</button>
        <p>Leave your comment below!</p>
        <form onSubmit={submitComment}>
          <label><strong>Rating: </strong></label>
          <br></br>
          <select name="rating" onChange={(e) => {handleChange(e)}}>
            <option value="" disabled selected>How Delicious</option>
            {numberOptions(11)}
          </select>
          <br></br>

          <label><strong>Content: </strong></label>
          <br></br>
          <textarea
            name="content"
            id="comment-box"
            rows="5"
            cols="50"
            value={formData.content}
            placeholder="Write your comment here..."
            onChange={(e) => {handleChange(e)}}
          ></textarea>

          <br></br>
          <button type="submit">Submit Your Comment</button>
        </form>
        </>
      )}
    </div>
  )
}