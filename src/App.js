import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'

import Blogs from "./components/blogs"
import blogService from "./services/blogs"
import loginService from "./services/login"

import BlogForm from "./forms/blogform"
import LoginForm from "./forms/loginform"

import Notification from "./notification/notifications"

// import { setNotification } from "./reducer/notificationReducer"
import { initBlogs } from "./reducers/blogReducer"

import "./styles.css"


const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [blogSubmitVisible, setBlogSubmitVisible] = useState(false)  
  
  useEffect(() => {
    const myUser = JSON.parse(window.localStorage.getItem("user"))
    setUser(myUser)

    if (myUser !== null) {
      blogService.setToken(myUser.token)
    }
    
    dispatch(initBlogs())

  }, [dispatch])

  // const blogs = useSelector(state => {
  //   return state.blogs
  // })


  // const vote = (id) => {
  //   const toVote = blogs.find(a => a.id === id)
  //   dispatch(setNotification(`you voted '${toVote.content}'`, 5000))
  // }

  function autoSetNotification(notif, isError = false, timeout = 5000) {
    setNotification({ notification: notif, errorStatus: isError })
    setTimeout(() => setNotification(null), timeout)
  }


  async function handleLogin(userObj) {

    const username = userObj.username
    const password = userObj.password

    console.log("logging in with", username, password)

    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      blogService.setToken(response.token)
      autoSetNotification("login successful")
      console.log("login was suuuuc", response.token)
      window.localStorage.setItem("user", JSON.stringify(response))
    }
    catch (exception) {
      console.log("bad password")
      autoSetNotification("bad username/password", true, 5000)
    }
  }

  
  function handleLogout(e) {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem("user")
  }
  const [notification, setNotification] = useState(null)
  
  async function handleSubmit(blogObj) {
    try {
      const title  = blogObj.title
      const author = blogObj.author
      // const url    = blogObj.url
      
      // console.log({ author: author, title: title, url: url })
      
      // const res = await blogService.post({ author: author, title: title, url: url })
      // setBlogs(blogs.concat(res))
      setBlogSubmitVisible(false)
      autoSetNotification(`new blog "${title}" by author ${author} added`)
    }
    catch (error) {
      console.log(error)
      autoSetNotification(error.message, true)
    }
  }

  const LoginScreen = () => {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          handleSubmit={handleLogin}
        />
      </div>
    )
  }
  
  const BlogScreen = () => (
    <div>
      <h2>blogs</h2>
      {user.name} is logged in
      <button onClick={handleLogout}> log out</button>
      <br></br>
      <Notification 
        notification={notification} 
      />

      <br></br>

      <BlogForm 
        handleSubmit={handleSubmit} 
        blogSubmitVisible={blogSubmitVisible} 
        setBlogSubmitVisible={setBlogSubmitVisible} 
      />

      <br></br>
      <br></br>

      <div>
        <Blogs 
          user={user} 
          handleLike={handleLike} 
          handleDelete={handleDelete} 
        />
      </div>
    </div>
  )

  async function handleLike(blog) {
    const res = await blogService.like(blog)
    console.log(res)
  }

  async function handleDelete(blog) {
    await blogService.deleteBlog(blog)
    // setBlogs(blogs.filter(i => i.id !== blog.id))
  }

  const Render = () => {
    return (user === null)
      ? <LoginScreen />
      : <BlogScreen />
  }

  return (
    <Render />
  )
}



export default App