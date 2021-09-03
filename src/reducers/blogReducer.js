import blogService from "../services/blogs"

const byLikesDecreasing = (a, b) => b.likes - a.likes

function blogReducer(state=[], action) {
  switch (action.type) {
    case "INIT": {
      const blogs = action.data.sort( byLikesDecreasing )
      return blogs
    }
    case "NEW_BLOG": {
      return [...state, action.data]
    }
    case "LIKE_BLOG": {
      const updatedBlog = action.data
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    }
    case "DELETE_BLOG": {
      const id = action.data
      return state.filter(blog => blog.id !== id)
    }
    default:
      return state
  }
}

export function initBlogs() {
  return async dispatch => {
    const data = (await blogService.getAll()).data
    dispatch({
      type: "INIT",
      data
    })
  }
}

export function addBlog(blogObject) {
  return async dispatch => {
    const response = await blogService.post(blogObject)
    dispatch({
      type: "NEW_BLOG",
      data: response
    })
  }
}

export function likeBlog(blog) {
  return async dispatch => {
    const response = await blogService.like(blog)
    dispatch({
      type: "LIKE_BLOG",
      data: response
    })
  }
}

export function deleteBlog(blog) {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: "DELETE_BLOG",
      data: blog.id
    })
  }
}

export default blogReducer
