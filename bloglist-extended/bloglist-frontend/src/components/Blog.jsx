import { useState, useEffect } from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({ user, blog: initialBlog }) => {
  const dispatch = useDispatch()
  const [blogVisible, setBlogVisible] = useState(false)
  const blogs = useSelector(state => state.blogs)
  const blogId = useParams().id
  const [blog, setBlog] = useState(initialBlog)

  useEffect(() => {
    if (!initialBlog && blogId) {
      const foundBlog = blogs.find((b) => b.id === blogId)
      setBlog(foundBlog)
      setBlogVisible(true)
    }
  }, [initialBlog, blogId, blogs])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(removeBlog(blog.id, blogs))
    }
  }

  const removeButton = () => <button onClick={handleRemove}>remove</button>

  const handleLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(newBlog))
  }

  const blogInfo = () => (
    <>
      <h2>{blog.title}</h2>
      <p><a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a></p>
      <p data-testid="like-count">likes {blog.likes}{' '}
        <button data-testid="like-button" onClick={handleLike}>
        like
        </button></p>
      <p>Added by {blog.user.name}</p>
      {blog.user.id === user.id && removeButton()}
    </>
  )
  const padding = {
    padding: 5
  }
  if (!blog) return null
  return (
    <li className="blog">
      {!blogVisible && <div style={blogStyle}>
        <Link style={padding} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>}
      {blogVisible && (
        <div>
          {blogInfo()}
          <CommentForm blog={blog}/>
        </div>
      )}
    </li>
  )
}

export default Blog
