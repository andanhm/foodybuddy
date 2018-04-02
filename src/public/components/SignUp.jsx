import React from 'react';
import axios from 'axios';

const styles = {
  backgroundColor: '#f1f1f1'
}

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      email: "",
      type: "admin",
      error: "",
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onButtonClick(event) {
    event.preventDefault()
    document.getElementById('id02').style.display = 'block';
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  onLogin(e) {
    e.preventDefault()
    this.setState({ error: '' });
    axios.post('http://localhost/signup', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      type: this.state.type,
    })
      .then((response) => {
        if (!response.data.token) {
          this.setState({ error: response.data.error });
        }
        // localStorage.setItem('Authorization', response.data.token);
        window.location = `http://localhost/inspections?token=${response.data.token}`;
      })
      .catch((error) => {
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
            <input type="text" placeholder="Enter Username" name="username" onChange={this.handleUsernameChange} value={this.state.username} required />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input type="password" placeholder="Enter Password" name="password" onChange={this.handlePasswordChange} value={this.state.password} required />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input type="email" placeholder="Enter Email address" name="email" onChange={this.handleEmailChange} value={this.state.email} required />

            <label htmlFor="utype">
              <b>Type</b>
            </label>
            <select name="type" onChange={this.handleTypeChange}  value={this.state.type}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <button type="submit" onClick={this.onLogin}>Sign Up</button>
          </div>
          <div className="container" style={styles}>
            <button type="button" onClick={this.onButtonClick} className="cancelbtn">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
