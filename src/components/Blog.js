import React, { useState } from "react"
import { connect } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"

function Blog({ blog, ...props }) {

  const user = props.user

  async function handleLike(blog) {
    props.likeBlog(blog)
  }

  async function handleDelete(blog) {
    props.deleteBlog(blog)
  }
  
  const [seeMoreInfo, setSeeMoreInfo] = useState(false)

  const sameUser = user.id === blog.user.id

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: sameUser ? "#dbffc9" : ""
  }

  if (!seeMoreInfo) {
    return (
      <div style={blogStyle}>
        "{blog.title}" by {blog.author}
        <button onClick={() => setSeeMoreInfo(true)}>view</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      "{blog.title}" by {blog.author} <br></br>
      {blog.url}
      <br></br>
      {blog.likes} 
      <button onClick={() => {handleLike(blog)}}>
        like
      </button>
      <br></br>
      {blog.user.name}
      <br></br>
      <button onClick={() => setSeeMoreInfo(false)}>view less</button>
      {
        sameUser
          ? <button onClick={() => handleDelete(blog)}>
              delete blog
            </button> 
          : ""
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlog, deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
