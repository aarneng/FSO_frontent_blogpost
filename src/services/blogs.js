import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = async blog => {
  axios.defaults.headers.common["Authorization"] = token
  const response = await axios
    .post(baseUrl, blog)
  return response.data
}

const like = async blog => {
  blog.likes = blog.likes + 1
  // console.log(blog)
  const response = await axios
    .put(baseUrl + "/" + blog.id, { title: blog.title, url: blog.url, likes: blog.likes, author: blog.author })
  return response.data
}

const deleteBlog = async blog => {
  axios.defaults.headers.common["Authorization"] = token
  console.log("THE BLOG IS:", blog)
  const response = await axios
    .delete(baseUrl + "/" + blog.id, { title: blog.title, url: blog.url, likes: blog.likes, author: blog.author })
  return response.data
}

const exported = {
  getAll,
  post,
  like,
  deleteBlog,
  setToken
}

export default exported
