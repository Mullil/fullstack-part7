const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { id: 1, content: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  console.log(body)
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id)
  console.log(blog)
  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'token invalid' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { name: 1, username: 1 })
  console.log(updatedBlog)
  response.json(updatedBlog)
})


blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  const updatedBlog = await Blog.findById(blog._id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { id: 1, content: 1 })
  response.json(updatedBlog)
})

module.exports = blogsRouter