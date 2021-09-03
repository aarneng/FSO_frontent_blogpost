const notificationReducer = (state=null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data
    case "SET_ERROR":
      return action.data
    case "RESET_NOTIFICATION":
      return null
    default:
      return state
  }
}

let timeoutId

export function setNotification(content, isError=false, timeout=10000) {
  console.log("setting notification", content, "for", timeout)
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        content,
        isError
      }
    })
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: "RESET_NOTIFICATION"
      })
    }, timeout)
  }
}

export default notificationReducer
