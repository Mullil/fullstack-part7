import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: null,
    username: '',
    password: ''
  },
  reducers: {
    setUsers(state, action) {
      return { ...state, users: action.payload }
    },
    setUser(state, action) {
      return { ...state, user: action.payload }
    },
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    }
  }
})

export const { removeUser, setUser, setUsername, setPassword, setUsers } = userSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(setUser(null))
    dispatch(setUsername(''))
    dispatch(setPassword(''))
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}


export default userSlice.reducer