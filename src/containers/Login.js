import React from 'react'

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleInput = (event) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    //callback function here.
    this.props.loginUser(this.state)
  }

  render(){
    return (
      <div className="login-container">
        <div className="login-subcontainer">
        <h3>LOGIN</h3>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} type="text" name="username" value={this.state.username} placeholder="Username"/>
          <input onChange={this.handleInput} type="password" name="password" value={this.state.password} placeholder="Password"/>
          <input type="submit" value="LOGIN" />
        </form>
        </div>
      </div>
    )
  }

}

export default Login
