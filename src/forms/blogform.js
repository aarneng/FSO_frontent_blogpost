import React, { useState } from "react"


const BlogForm = ({ handleSubmit }) => {
  const [title,  setTitle]  = useState("")
  const [author, setAuthor] = useState("")
  const [url,    setURL]    = useState("")

  function submitBlog(e) {
    e.preventDefault()
    console.log("called me?")
    if (title  === "" || author === "" || url === "") {
      console.log("fail")
      return null
    }
    handleSubmit({
      title: title,
      author: author,
      url: url
    })
    setTitle("")
    setAuthor("")
    setURL("")
  }

  return (
    <div>
      <h2>submit a new blog :)</h2>
      <form onSubmit={submitBlog}>
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
          id="blog-submit-button"
          type="submit">
            submit
        </button>
      </form>
    </div>
  )}

export default BlogForm
