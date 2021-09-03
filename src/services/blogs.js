import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const post = async blog => {
  axios.defaults.headers.common["Authorization"] = token
  console.log("posting", { blog, token } )
  const response = await axios
    .post(baseUrl, blog)
  console.log("THE SERVERERESPONDE DWITH", response)
  return response.data
}

const like = async blog => {
  blog.likes = blog.likes + 1
  const { user, id, ...blogObj } = blog
  const response = await axios.put(baseUrl + "/" + id, blogObj)
  return { ...response.data, user }
}

const deleteBlog = async blog => {
  axios.defaults.headers.common["Authorization"] = token
  const { user, id, ...blogObj } = blog
  const response = await axios.delete(baseUrl + "/" + id, blogObj)
  return { ...response.data, user }
}

const exported = {
  getAll,
  post,
  like,
  deleteBlog,
  setToken
}

export default exported
/**
 * 
 * --------------------
Method: PUT
Path:   /api/blogs/60f6a8f4fb1bcc1253fc4d13
Time:   2021-08-31T15:43:29.135Z
Body:   { title: 't', url: 't', likes: 14, author: 't' }
Full request:  localhost:3003/api/blogs/60f6a8f4fb1bcc1253fc4d13
--------------------
 * 
 */