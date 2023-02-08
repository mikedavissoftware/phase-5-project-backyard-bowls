import {useState} from "react"



export default function CommentForm({itemId, currentUser}) {
  const [showCommentForm, setShowCommentForm] = useState(false)
  function toggleCommentForm() {
    setShowCommentForm(!showCommentForm)
  }

  function numberOptions(max) {        
    const numbersArray = []
    for (let i=0; i<max; i++) {
        numbersArray.push(
            <option value={`${i}`}>{i}</option>
        )
    }
    return numbersArray
  }

  const [formData, setFormData] = useState({rating: 10, content: ""})

  function handleChange(event) {
    console.log(event.target.value);
    setFormData({...formData, [event.target.name]: event.target.value})
  }
  return (
    <div>
      {(!showCommentForm) ? (
        <button onClick={() => toggleCommentForm()}>Show Comment Form</button>
      ) : (
        <>
        <button onClick={() => toggleCommentForm()}>Hide Comment Form</button>
        <h4>Leave your comment below!</h4>
        <form>
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
          ></textarea>

          <br></br>
          <button type="submit">Submit Your Comment</button>
        </form>
        </>
      )}
    </div>
  )
}