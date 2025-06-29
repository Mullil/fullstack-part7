import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const update = async (newObject) => {
  console.log(newObject)
  console.log(newObject.id)
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

const comment = async (content, blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(content)
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { content }, config)
  return response.data
}

export default { getAll, create, update, setToken, remove, comment }
