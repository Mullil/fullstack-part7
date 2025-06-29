import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    }
  }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
