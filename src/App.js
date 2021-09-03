import React, { useEffect } from "react"
import { connect } from "react-redux"


import {
  // eslint-disable-next-line no-unused-vars
  Switch, Route, Link, useHistory, Redirect
} from "react-router-dom"

import LoginForm from "./forms/loginform"

import Notification from "./notification/notifications"
import BlogScreen from "./components/Blogs"
import { initBlogs } from "./reducers/blogReducer"

import { initUser } from "./reducers/userReducer"

import Navbar from "./navbar/navbar"

import "./styles.css"


const LoginScreen = () => {
  const history = useHistory()

  function afterLogin() {
    console.log("let's go back")
    history.push("/")
  }

  return (
    <div>
      <Notification />
      <LoginForm afterLogin={afterLogin}/>
    </div>
  )
}

const ConditionalBlogScreen = ({ user }) => {
  console.log(user)
  if (user) {
    console.log("wow, user is defined!")
    return <BlogScreen/>
  }
  else {
    console.log("allright, user is falsy")
    return <Redirect to="/login" />
  }
}

const App = (props) => {
  // console.log("Seems like i get called")
  // props.initUser()  // useeffect doesn't work unless init user is dispatched before o_O

  useEffect(() => {
    console.log("do i get called?")
    props.initUser()
    props.initBlogs()
  }, [])

  return (
    <div>
      <Navbar/>
      <div className="margin-under-navbar">
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/">
            <ConditionalBlogScreen user={props.user}/>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initUser, initBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
