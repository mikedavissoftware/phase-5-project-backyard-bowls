import {useState} from "react"

import Comment from "./Comment"

export default function CommentEditForm({itemId, currentUserComment, currentUser}) {
  console.log(currentUser)

  const [showCommentEditForm, setShowCommentEditForm] = useState(false)
  function toggleCommentEditForm() {
    setShowCommentEditForm(!showCommentEditForm)
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
    content: ""
  }
  const [formData, setFormData] = useState(newForm)

  function handleChange(event) {
    console.log(event.target.value);
    setFormData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }

  function submitEditComment(e) {
    e.preventDefault()

    console.log("submit button pushed")

    fetch(`/comments/${currentUserComment.id}`, {
      method: "PATCH",
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
    setShowCommentEditForm(false)
  }

  return (
    <div>
      {(!showCommentEditForm) ? (
        <button onClick={() => toggleCommentEditForm()}>Edit My Comment</button>
      ) : (
        <>
        <button onClick={() => toggleCommentEditForm()}>Hide Edit Form</button>
        <h4>Edit your comment below!</h4>
        <form onSubmit={submitEditComment}>
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