import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog({ title: title, author: author, url: url }))
      dispatch(setNotification(`a new blog ${title} by ${author} added`, 5))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.response.data.error, 5))
    }
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <p>
          title:{' '}
          <input
            data-testid="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          ></input>
        </p>
        <p>
          author:{' '}
          <input
            data-testid="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          ></input>
        </p>
        <p>
          url:{' '}
          <input
            data-testid="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          ></input>
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
