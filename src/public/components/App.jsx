import React from 'react';
import logo from '../img/logo.png';
const styles = {
  width: 'auto',
}
class App extends React.Component {

  onButtonClick(event) {
    event.preventDefault()
    if (event.currentTarget.id === 'buttonSignIn') {
      document.getElementById('id01').style.display = 'block';
    }
    if (event.currentTarget.id === 'buttonSignUp') {
      document.getElementById('id02').style.display = 'block';
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick} id="buttonSignIn" style={styles}>Sign In</button>
        <button onClick={this.onButtonClick} id="buttonSignUp" style={styles}>Sign Up</button>
      </div>
    );
  }
}
export default App;
