import React, { useState } from "react"


const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle]   = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL]       = useState("")
  return (
    <div>
      <h2>submit a new blog :)</h2>
      <form onSubmit={handleSubmit}>
        <div>
        title
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={url}
            name="Url"
            id="url"
            onChange={(e) => setURL(e.target.value)}
          />
        </div>
        <button
          type="submit">
        submit
        </button>
      </form>
    </div>
  )}

export default BlogForm
