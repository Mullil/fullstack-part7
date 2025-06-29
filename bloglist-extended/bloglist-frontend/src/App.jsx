import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initBlogs } from './reducers/blogReducer'
import { setUser, initUsers } from './reducers/userReducer'
import LogoutForm from './components/LogoutForm'
import { Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user &&
            <div>
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
            </div>}
      {user && <p>{user.name} is logged in</p>}
      {user && <LogoutForm />}
      {user && <Routes>
        <Route path="/users" element={user ? <UserList /> : <LoginForm />} />
        <Route path="/users/:id" element={<BlogList userBlogs={true} />} />
        <Route path="/blogs/:id" element={<Blog user={user}/>}/>
        <Route path="/" element={
          <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef}/>
            </Togglable>
            <BlogList/>
          </div>} />
      </Routes>}
    </div>
  )
}

export default App
