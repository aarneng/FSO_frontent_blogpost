import React, { useState } from "react"
import { connect } from "react-redux"
import { addBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"


const SubmitBlogForm = ({ handleSubmit }) => {
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
  )
}


const BlogForm = (props) =>  {
  const user = props.user

  const [blogSubmitVisible, setBlogSubmitVisible] = useState(false)

  async function handleSubmit(blogObj) {
    try {
      blogObj.user = user
      props.addBlog(blogObj)
      setBlogSubmitVisible(false)
     props.setNotification(`new blog "${blogObj.title}" by author ${blogObj.author} added`)
    }
    catch (error) {
      console.log(error)
      props.setNotification(error.message, true)
    }
  }

  const vals = ["", "none"]

  return (
    <div>
      <div style={{ display: vals[blogSubmitVisible + 0] }}>
        <button id="blog-create-button" onClick={() => setBlogSubmitVisible(true)}>create new blog</button>
      </div>
      <div style={{ display: vals[1 - blogSubmitVisible] }}>
        <SubmitBlogForm
          handleSubmit={handleSubmit}
        />
        <button onClick={() => setBlogSubmitVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  addBlog,
  setNotification
} 


export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)
