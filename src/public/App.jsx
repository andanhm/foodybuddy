import React from 'react';

class App extends React.Component {
  render() {
    return (
      <center>
        <h2>FOODYBUDDY</h2>
        <img src="./img/logo.png" alt="Avatar" class="avatar" />
        <br />

        <button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Sign In</button>

        <button onclick="document.getElementById('id02').style.display='block'" style="width:auto;">Sign Up</button>
      </center>
    );
  }
}
export default App;
