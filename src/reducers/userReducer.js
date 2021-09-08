import loginService from "../services/login"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

function userReducer(state=null, action) {
  switch (action.type) {
    case "LOGIN": {
      return action.data
    }
    case "LOGOUT": {
      return null
    }
    case "SET_USER": {
      return action.data
    }
    default:
      return state
  }
}


export function login(userObj) {
  return async dispatch => {
    const username = userObj.username
    const password = userObj.password
  
    let response
    console.log("we got this far")
    try {
      response = await loginService.login({ username, password })
    } catch (error) {
      setNotification("bad username/password", true)
    }

    setNotification("Login successful")

    dispatch({
      type: "LOGIN",
      data: response
    })
    blogService.setToken(response.token)
    window.localStorage.setItem("user", JSON.stringify(response))
  }
}

export function logout() {
  return dispatch => {
    window.localStorage.removeItem("user")

    dispatch({
      type: "LOGOUT"
    })
    blogService.setToken(null)
    setNotification("Logout successful")
  }
}

export function setUser(userObj) {
  return dispatch => {
    // console.log(userObj, "called")
    dispatch({
      type: "SET_USER",
      data: userObj
    })
    if (userObj) blogService.setToken(userObj.token)
  }
}

export function initUser() {
  return dispatch => {
    // console.log(userObj, "called")
    const userObj = JSON.parse(window.localStorage.getItem("user"))
    console.log("THE USER FROM LOCALSTORSGE:", userObj);

    dispatch({
      type: "SET_USER",
      data: userObj
    })
    if (userObj) blogService.setToken(userObj.token)
  }
}




export default userReducer
