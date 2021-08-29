import blogService from "../services/blogs"

const byVotesDecreasing = (a, b) => b.votes - a.votes

function blogReducer(state=[], action) {
  switch (action.type) {
    case "INIT": {
      const blogs = action.data.sort(byVotesDecreasing)
      return blogs
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

export default blogReducer
