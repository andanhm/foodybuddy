import React from 'react';
import axios from 'axios';

const styles = {
  backgroundColor: '#f1f1f1'
}

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error: "",
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onButtonClick(event) {
    event.preventDefault()
    document.getElementById('id01').style.display='block';
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onLogin(e) {
    e.preventDefault()
    this.setState({ error:'' });
    axios.post('http://localhost/signin', {
      username: this.state.username,
      password: this.state.password
    })
    .then( (response) => {
      if (!response.data.token) {
        this.setState({ error: response.data.error });
      }
      // localStorage.setItem('Authorization', response.data.token);
      window.location = `http://localhost/inspections?token=${response.data.token}`;
    })
    .catch( (error) => {
      this.setState({ error: error.message });
    });
  }

  render() {
    return (
      <div>
        <form className="modal-content animate">
          <div className="imgcontainer">
            <span onClick={this.onButtonClick} className="close" title="Close Modal">&times;</span>
          </div>
          <h3 className="container"> {this.state.error}</h3>
          <div className="container">
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input type="text" placeholder="Enter Username" name="username" onChange={this.handleUsernameChange}  value={this.state.username} required />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input type="password" placeholder="Enter Password" name="password" onChange={this.handlePasswordChange}  value={this.state.password} required />

            <button type="submit" onClick={this.onLogin}>Login</button>
            <label>
              <input type="checkbox"  name="remember" defaultChecked/> Remember me
          </label>
          </div>

          <div className="container" style={styles}>
            <button type="button" onClick={this.onButtonClick} className="cancelbtn">Cancel</button>
            <span className="psw">
              <a href="#">Forgot password?</a>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
