import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      ).sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (id, blogs) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(setBlogs(blogs.filter((b) => b.id !== id)))
  }
}

export const commentBlog = (id, content ) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(content, id)
    dispatch(updateBlog(updatedBlog))

  }
}

export default blogSlice.reducer