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
    console.log("login", this.props)
    return (
      <div className="App">
        <div className="Space">

        </div>

            <div className="Login-Container">
              <h3>LOGIN</h3>
              <div className="Login-Sub">
                <form className="Login-Form" onSubmit={this.handleSubmit}>
                  <input onChange={this.handleInput} type="text" name="username" value={this.state.username} placeholder="Username"/>
                  <input onChange={this.handleInput} type="password" name="password" value={this.state.password} placeholder="Password"/>
                  <input type="submit" value="🗝  LOG IN" />
                </form>
              </div>
            </div>


      </div>
    )
  }

}

export default Login
