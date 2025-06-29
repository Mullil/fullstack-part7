import Blog from './Blog'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogs = ({ user, blogs }) => {
  if (!user) return null
  return (
    <>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {blogs.map((blog) =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </>
  )
}


const BlogList = ({ userBlogs }) => {
  const user = useSelector(state => state.user.user)
  const blogs = useSelector(state => state.blogs)

  const users = useSelector(state => state.user.users)
  const userToShowId = useParams().id

  if (userBlogs) {
    const userToShow = users.find((user) => user.id === userToShowId)
    return (
      <UserBlogs user={userToShow} blogs={blogs.filter((blog) => blog.user.id===userToShowId)}></UserBlogs>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          user={user}
        />
      ))}
    </>
  )
}

export default BlogList