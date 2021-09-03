import React from "react"
import { connect } from "react-redux"

import Blog from "./Blog"
import BlogForm from "../forms/blogform"
import Notification from "../notification/notifications"

import { logout } from "../reducers/userReducer"

const Blogs = ({ blogs }) => {
  return blogs.map(blog =>
    <div key={blog.id}>
      <Blog
        blog={blog}
      />
    </div>
  )
}

const BlogScreen = (props) => {
  return (
    <div>
      <h2>blogs</h2>
      {props.user.name} is logged in
      <button onClick={() => props.logout()}>log out</button>
      <br></br>
      <Notification />

      <br></br>

      <BlogForm />

      <br></br>
      <br></br>

      <Blogs blogs={props.blogs}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogScreen)