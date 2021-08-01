import React, { useState } from "react"
import PropTypes from "prop-types"


const LoginForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function submitLogin(e) {
    e.preventDefault()

    if (!username || !password) return null

    handleSubmit({
      username: username,
      password: password
    })

    setUsername("")
    setPassword("")
  }

  return (
    <>
      <h2>Login to blogs app</h2>
      <form onSubmit={submitLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={ ({ target }) => setUsername(target.value) }
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
    </>
  )}


LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
