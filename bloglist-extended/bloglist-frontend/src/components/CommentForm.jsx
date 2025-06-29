import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentList = ({ blog }) => {
  const comments = blog.comments
  return(
    <div>
      <ul>
        {comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }
  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
        </p>
        <button type="submit">add comment</button>
      </form>
      <CommentList blog={blog}/>
    </div>

  )
}

export default CommentForm