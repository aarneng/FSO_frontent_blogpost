import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

import BlogForm from "./forms/blogform"
import LoginForm from "./forms/loginform"
import "./styles.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogSubmitVisible, setBlogSubmitVisible] = useState(false)


  useEffect(() => {
    const myUser = JSON.parse(window.localStorage.getItem("user"))
    setUser(myUser)

    if (myUser !== null) {
      blogService.setToken(myUser.token)
    }

    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => a.likes < b.likes)
      setBlogs(sortedBlogs)
      console.log(sortedBlogs)
    })
  }, [])

  async function handleLogin(e) {
    e.preventDefault()
    console.log("logging in with", username, password)

    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      blogService.setToken(response.token)
      setUsername("")
      setPassword("")
      autoSetNotification("login successful")
      console.log("login was suuuuc", response)
      window.localStorage.setItem("user", JSON.stringify(response))
    }
    catch (exception) {
      console.log("bad password")
      autoSetNotification("bad username/password", true, 5000)
    }
  }

  function blogForm() {
    const vals = ["", "none"]
    // console.log(vals, blogSubmitVisible)
    return (
      <div>
        <div style={{ display: vals[blogSubmitVisible + 0] }}>
          <button onClick={() => setBlogSubmitVisible(true)}>create new blog</button>
        </div>
        <div style={{ display: vals[1 - blogSubmitVisible] }}>
          <BlogForm
            handleSubmit={handleSubmit}
          />
          <button onClick={() => setBlogSubmitVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  function loginForm() {
    return (
      <div>
        {notifications()}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  function handleLogout(e) {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem("user")
  }
  const [notification, setNotification] = useState(null)

  function autoSetNotification(notif, isError = false, timeout = 5000) {
    setNotification({ notification: notif, errorStatus: isError })
    setTimeout(() => setNotification(null), timeout)
  }

  function notifications() {
    // console.log("NOTIFS:", notification)
    if (!notification) return null
    const name = "notification" + (notification.errorStatus ? "-error" : "")
    // console.log(name);
    return (
      <div className={name}>
        {notification.notification}
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const title  = e.target[0].value
      const author = e.target[1].value
      const url    = e.target[2].value

      const res = await blogService.post({ author: author, title: title, url: url })
      setBlogs(blogs.concat(res))
      console.log(blogs)
      setBlogSubmitVisible(false)
      autoSetNotification(`new blog "${title}" by ${author} added`)
    }
    catch (error) {
      // console.log(error)
      autoSetNotification(error.message, true)
    }
  }

  const blogsList = () => (
    <>
      <h2>blogs</h2>
      {user.name} is logged in
      <button onClick={handleLogout}> log out</button>
      <br></br>
      {notifications()}
      <br></br>
      {blogForm()} <br></br><br></br>
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
          />
        )
      }
    </>
  )

  async function handleLike(blog) {
    const res = await blogService.like(blog)
    console.log(res)
  }

  async function handleDelete(blog) {
    const res = await blogService.deleteBlog(blog)
    console.log(res)
  }


  function render() {
    return (user === null)
      ? loginForm()
      : blogsList()
  }
  return (
    <div>
      {render()}
    </div>
  )
}



export default App