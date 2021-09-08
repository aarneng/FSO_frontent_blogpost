import React, { useEffect, useState } from "react"
import { connect } from "react-redux"


import {
  // eslint-disable-next-line no-unused-vars
  Switch, Route, Link, useHistory, Redirect
} from "react-router-dom"

import LoginForm from "./forms/loginform"

import Notification from "./notification/notifications"
import BlogScreen from "./components/blogs"
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

const App = (props) => {
  
  useEffect(() => {
    /**
     * -----------------------------------------------------------------------
     * 
     * to whom it may concern:
     * this useEffect hook is initiated only after rendering the re-route to
     * "/login", so on app startup with a user already in localStorage my 
     * hacky solution is for the app to reroute from  "/" -> "/login" -> "/".
     * (see the <Redirect /> in forms/loginform)
     * 
     * If you find a way to change/fix this behaviour, please make a PR with 
     * your changes. If you know how to change/fix this but can't be bothered
     * to implement the changes yourself, please open an issue on github.
     * 
     * Yours truly,
     * the lead dev
     *
     * -----------------------------------------------------------------------
     */
    props.initUser()
    props.initBlogs()
  }, [])

  return (
    <div>
      <Navbar/>
      <div className="margin-under-navbar container">
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/">
            {props.user ? <BlogScreen /> : <Redirect to="/login" />}
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
