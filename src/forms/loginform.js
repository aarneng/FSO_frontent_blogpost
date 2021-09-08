import React, { useState } from "react"
import { connect } from "react-redux"
import { login } from "../reducers/userReducer"
import { Redirect } from "react-router-dom"

const LoginForm = (props) => {
  console.log("you are loking at the login screen :)")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function submitLogin(e) {
    e.preventDefault()
    console.log("so far", username, password)

    if (!username || !password) return null

    props.login({
      username: username,
      password: password
    })

    setUsername("")
    setPassword("")
    props.afterLogin()
  }

  if (props.user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2>Login to blogs app</h2>
      <form onSubmit={submitLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={ ({ target }) => {console.log(target); setUsername(target.value) }}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </div>
        <button
          id="login-button"
          type="submit"
        >
        login
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
