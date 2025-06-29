import { useDispatch, useSelector } from 'react-redux'
import { setUsername, setPassword, login } from '../reducers/userReducer'
import { useState } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)
  const handleUsernameChange = ({ target }) => dispatch(setUsername(target.value))
  const handlePasswordChange = ({ target }) => dispatch(setPassword(target.value))
  const [loginVisible, setLoginVisible] = useState(true)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>login</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Log in to application</h2>
            username
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" data-testid="submit-button">
            login
          </button>
        </form>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default LoginForm
