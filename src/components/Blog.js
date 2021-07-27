import React, { useState } from "react"

function Blog({ blog, handleLike, handleDelete, user }) {
  const [seeAll, setSeeAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const vals = ["", "none"]

  const sameUser = user.id === blog.user.id

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: sameUser ? "#dbffc9" : ""
  }
  if (!seeAll) {
    return (
      <div style={blogStyle}>
        <div style={{ display: vals[seeAll + 0] }}>
          "{blog.title}" by {blog.author}
          <button onClick={() => setSeeAll(true)}>view</button>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div style={{ display: vals[1 - seeAll] }}>
        "{blog.title}" by {blog.author} <br></br>
        {blog.url} <br></br>
        {likes} <button onClick={() => {
          handleLike(blog)
          setLikes(likes + 1)
        }}>like</button>
        <br></br>
        {blog.user.name} <br></br>
        <button onClick={() => setSeeAll(false)}>view less</button>
      </div>
      <button style={{ display: vals[1 - sameUser] }} onClick={() => handleDelete(blog)}>delete blog</button>
    </div>
  )
}

export default Blog
