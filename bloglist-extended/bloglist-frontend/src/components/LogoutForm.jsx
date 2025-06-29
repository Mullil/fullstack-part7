import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())

  }
  return (
    <form onSubmit={handleLogout}>
      <button type="submit" data-testid="logout-button">
            logout
      </button>
    </form>
  )
}

export default LogoutForm